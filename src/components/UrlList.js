import React, { useState } from 'react';
import './UrlList.css';

const UrlList = ({ urls, onDelete, onIncrementClicks }) => {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateUrl = (url, maxLength = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  if (urls.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13A5 5 0 0 0 20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 11A5 5 0 0 0 4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 17L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>No URLs shortened yet</h3>
        <p>Shorten your first URL above to see it here!</p>
      </div>
    );
  }

  return (
    <div className="url-list-container">
      <h2 className="list-title">Your Shortened URLs</h2>
      <div className="url-list">
        {urls.map((url, index) => (
          <div key={url.id} className="url-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="url-card-header">
              <div className="url-info">
                <div className="short-url-section">
                  <h3 className="short-url">{url.shortUrl}</h3>
                  <span className="url-badge">Short</span>
                </div>
                <div className="original-url">
                  <span className="url-label">Original:</span>
                  <a 
                    href={url.longUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="long-url-link"
                    onClick={() => onIncrementClicks(url.id)}
                  >
                    {truncateUrl(url.longUrl)}
                  </a>
                </div>
              </div>
              <div className="url-actions">
                <button
                  className={`copy-btn ${copiedId === url.id ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(url.shortUrl, url.id)}
                  title="Copy to clipboard"
                >
                  {copiedId === url.id ? (
                    <>
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="copy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Copy
                    </>
                  )}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(url.id)}
                  title="Delete URL"
                >
                  <svg className="delete-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="url-card-footer">
              <div className="url-stats">
                <div className="stat">
                  <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>{url.clicks} clicks</span>
                </div>
                <div className="stat">
                  <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>{formatDate(url.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlList;
