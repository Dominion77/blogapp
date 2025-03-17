import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const savedPosts = localStorage.getItem('blogPosts');
        const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];
        
        const foundPost = parsedPosts.find(post => post.id === id);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load post. Please try again later.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = () => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        // Get current posts
        const savedPosts = localStorage.getItem('blogPosts');
        const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];
        
        // Filter out the post to be deleted
        const updatedPosts = parsedPosts.filter(post => post.id !== id);
        
        // Update localStorage
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
        
        // Navigate back to home
        navigate('/');
        
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
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      <div className="post-detail">
        <h2>{post.title}</h2>
        <div className="meta">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="post-body">{post.content}</div>
        
        <div className="btn-group">
          <Link to="/" className="btn">Back to Home</Link>
          <Link to={`/edit/${post.id}`} className="btn btn-secondary">Edit Post</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete Post</button>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;