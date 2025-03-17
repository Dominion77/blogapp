import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import ViewPost from './pages/ViewPost';
import EditPost from './pages/EditPost';
import CreatePost from './pages/CreatePost';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="*" element={<div className="container"><h2>404 - Page Not Found</h2><a href="/" className="btn">Go Home</a></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;