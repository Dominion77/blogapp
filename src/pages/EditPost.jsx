import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const savedPosts = localStorage.getItem('blogPosts');
        const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];
        
        const foundPost = parsedPosts.find(post => post.id === id);
        
        if (foundPost) {
          setTitle(foundPost.title);
          setContent(foundPost.content);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content) {
      setError('Please fill in all fields');
      return;
    }
    
    setSaving(true);
    
    try {
      // Get current posts
      const savedPosts = localStorage.getItem('blogPosts');
      const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];
      
      // Find post index
      const postIndex = parsedPosts.findIndex(post => post.id === id);
      
      if (postIndex !== -1) {
        // Update post
        const updatedPost = {
          ...parsedPosts[postIndex],
          title,
          content,
          updatedAt: new Date().toISOString()
        };
        
        // Update posts array
        parsedPosts[postIndex] = updatedPost;
        
        // Save back to localStorage
        localStorage.setItem('blogPosts', JSON.stringify(parsedPosts));
        
        // Navigate to post view
        navigate(`/post/${id}`);
      } else {
        setError('Post not found');
      }
    } catch (err) {
      setError('Failed to update post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <p>Loading post...</p>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      <h2>Edit Post</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>
        
        <div className="form-control">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="btn-group">
          <button 
            type="submit" 
            className="btn btn-success" 
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Update Post'}
          </button>
          <Link to={`/post/${id}`} className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default EditPost;