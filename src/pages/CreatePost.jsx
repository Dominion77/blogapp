import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content) {
      setError('Please fill in all fields');
      return;
    }
    
    setSaving(true);
    
    try {
      // Create new post object
      const newPost = {
        id: Date.now().toString(), // Simple ID generation
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Get current posts
      const savedPosts = localStorage.getItem('blogPosts');
      const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];
      
      // Add new post
      const updatedPosts = [newPost, ...parsedPosts];
      
      // Save to localStorage
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      
      // Navigate to home page
      navigate('/');
    } catch (err) {
      setError('Failed to create post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container fade-in">
      <h2>Create New Post</h2>
      
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
            {saving ? 'Creating...' : 'Create Post'}
          </button>
          <Link to="/" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;