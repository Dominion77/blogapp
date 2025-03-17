import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        
        const savedPosts = localStorage.getItem('blogPosts');
        const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];
        
        // Sort posts by date (newest first)
        const sortedPosts = parsedPosts.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        setPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = (id) => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        // Filter out the post to be deleted
        const updatedPosts = posts.filter(post => post.id !== id);
        
        // Update localStorage
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
        
        // Update state
        setPosts(updatedPosts);
        
        // Show success notification (in a real app you might use a toast)
        alert('Post deleted successfully');
      } catch (err) {
        setError('Failed to delete post. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container fade-in">
      <div className="header">
        <h1>My Blog</h1>
        <Link to="/create" className="btn">Create New Post</Link>
      </div>

      {posts.length === 0 ? (
        <div className="no-posts">
          <h2>No posts yet</h2>
          <p>Create your first blog post to get started!</p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">
                  {post.content.length > 150 
                    ? `${post.content.substring(0, 150)}...` 
                    : post.content}
                </p>
                <div className="post-meta">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="post-actions">
                  <Link to={`/post/${post.id}`} className="btn">
                    Read More
                  </Link>
                  <button 
                    onClick={() => handleDelete(post.id)} 
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;