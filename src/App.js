import React, { useState, useEffect } from 'react';
import './App.css';
import UrlForm from './components/UrlForm';
import UrlList from './components/UrlList';
import Header from './components/Header';
import { Log } from './logger';

function SomeComponent() {
  Log('frontend', 'info', 'url-shortener', 'User clicked shorten button');
}
function App() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load URLs from localStorage on component mount
  useEffect(() => {
    const savedUrls = localStorage.getItem('shortenedUrls');
    if (savedUrls) {
      setUrls(JSON.parse(savedUrls));
    }
  }, []);

  // Save URLs to localStorage whenever urls state changes
  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
  }, [urls]);

  const shortenUrl = async (longUrl) => {
    setLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a short code (in a real app, this would come from an API)
      const shortCode = Math.random().toString(36).substring(2, 8);
      const shortUrl = `https://short.ly/${shortCode}`;
      
      const newUrl = {
        id: Date.now(),
        longUrl,
        shortUrl,
        shortCode,
        createdAt: new Date().toISOString(),
        clicks: 0
      };
      
      setUrls(prev => [newUrl, ...prev]);
    } catch (error) {
      console.error('Error shortening URL:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUrl = (id) => {
    setUrls(prev => prev.filter(url => url.id !== id));
  };

  const incrementClicks = (id) => {
    setUrls(prev => prev.map(url => 
      url.id === id ? { ...url, clicks: url.clicks + 1 } : url
    ));
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <UrlForm onShorten={shortenUrl} loading={loading} />
        <UrlList 
          urls={urls} 
          onDelete={deleteUrl} 
          onIncrementClicks={incrementClicks}
        />
      </main>
    </div>
  );
}

export default App;
