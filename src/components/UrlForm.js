import React, { useState } from 'react';
import './UrlForm.css';

const UrlForm = ({ onShorten, loading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (urlString) => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Add protocol if missing
    let urlToShorten = url.trim();
    if (!urlToShorten.startsWith('http://') && !urlToShorten.startsWith('https://')) {
      urlToShorten = 'https://' + urlToShorten;
    }

    if (!validateUrl(urlToShorten)) {
      setError('Please enter a valid URL');
      return;
    }

    onShorten(urlToShorten);
    setUrl('');
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="url-form-container">
      <div className="form-card">
        <h2>Shorten Your URL</h2>
        <p className="form-description">
          Enter a long URL below and we'll create a short, shareable link for you.
        </p>
        
        <form onSubmit={handleSubmit} className="url-form">
          <div className="input-group">
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 13A5 5 0 0 0 20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11A5 5 0 0 0 4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 17L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                value={url}
                onChange={handleInputChange}
                placeholder="Enter your long URL here..."
                className="url-input"
                disabled={loading}
              />
            </div>
            <button 
              type="submit" 
              className="shorten-btn"
              disabled={loading || !url.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Shortening...
                </>
              ) : (
                'Shorten URL'
              )}
            </button>
          </div>
          
          {error && (
            <div className="error-message">
              <svg className="error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
              </svg>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UrlForm;
