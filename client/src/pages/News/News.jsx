/*
  News.jsx - News page for EDSM
  ----------------------------
  - Shows market news, featured stories, and allows sharing/bookmarking.
  - For backend/frontend devs: Add API integration, news filters, or sharing logic here as needed.
*/
import React, { useState, useEffect } from 'react';
import { FaSearch, FaClock, FaCalendarAlt, FaBookmark, FaShare } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa';
import './News.css';

// Enhanced news data with more details
const newsList = [
  {
    id: 1,
    title: 'Stock Market Hits Record Highs',
    summary: 'The Ethiopian stock market reached new heights today as major indices surged following positive economic indicators and strong corporate earnings reports.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    category: 'Market',
    date: '2024-03-15',
    readTime: '5 min read',
    featured: true,
    author: 'John Doe',
    authorImage: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    title: 'New IPO Announced',
    summary: 'A new technology company is going public on EDSM. Find out how you can participate in this exciting opportunity and what it means for the market.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    category: 'IPO',
    date: '2024-03-14',
    readTime: '4 min read',
    featured: true,
    author: 'Jane Smith',
    authorImage: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3,
    title: 'Technology Stocks Lead the Rally',
    summary: 'Tech companies are driving the market rally, with ETHIT and ETHCOM up double digits. Analysts predict continued growth in the sector.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    category: 'Technology',
    date: '2024-03-13',
    readTime: '3 min read',
    featured: false,
    author: 'Mike Johnson',
    authorImage: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 4,
    title: 'Energy Sector Faces Volatility',
    summary: 'Energy stocks experienced significant swings as oil prices fluctuated in global markets. Experts weigh in on what this means for investors.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    category: 'Energy',
    date: '2024-03-12',
    readTime: '4 min read',
    featured: false,
    author: 'Sarah Wilson',
    authorImage: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: 5,
    title: 'Ethiopian Bank Reports Record Profits',
    summary: 'Commercial Bank of Ethiopia announced record profits for the fiscal year, exceeding market expectations and signaling strong economic growth.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    category: 'Finance',
    date: '2024-03-11',
    readTime: '3 min read',
    featured: false,
    author: 'David Brown',
    authorImage: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 6,
    title: 'Agriculture Stocks Stable Amid Uncertainty',
    summary: 'Agriculture sector remains stable despite market uncertainty, with experts predicting continued growth in key commodities.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    category: 'Agriculture',
    date: '2024-03-10',
    readTime: '4 min read',
    featured: false,
    author: 'Emma Davis',
    authorImage: 'https://i.pravatar.cc/150?img=6'
  }
];

const categories = [
  { id: 'all', name: 'All News' },
  { id: 'market', name: 'Market' },
  { id: 'technology', name: 'Technology' },
  { id: 'finance', name: 'Finance' },
  { id: 'energy', name: 'Energy' },
  { id: 'agriculture', name: 'Agriculture' },
  { id: 'ipo', name: 'IPO' }
];

export default function News() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkTooltip, setBookmarkTooltip] = useState({ id: null, msg: '' });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredNews = newsList.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category.toLowerCase() === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleShare = (id) => {
    const url = window.location.href;
    navigator.clipboard.writeText(url + `#news-${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleBookmark = (id) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.includes(id);
      const newBookmarks = isBookmarked ? prev.filter(bid => bid !== id) : [...prev, id];
      setBookmarkTooltip({ id, msg: isBookmarked ? 'Removed from bookmarks!' : 'Added to bookmarks!' });
      setTimeout(() => setBookmarkTooltip({ id: null, msg: '' }), 1200);
      return newBookmarks;
    });
  };

  if (isLoading) {
    return (
      <div className="news-page" style={{ padding: '2rem' }}>
        <div className="loading-skeleton">
          <div className="skeleton-header" style={{ height: '40px', width: '200px', background: '#eee', borderRadius: '8px', marginBottom: '1rem' }}></div>
          <div className="skeleton-filters" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ height: '32px', width: '100px', background: '#eee', borderRadius: '16px' }}></div>
            ))}
          </div>
          <div className="skeleton-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ height: '400px', background: '#eee', borderRadius: '12px' }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page">
      <div className="news-header">
        <div className="news-header-content">
          <h1>Market News</h1>
          <div className="news-subtitle">Stay informed with the latest market updates and insights</div>
        </div>
        <div className="news-search">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="news-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-pill${activeCategory === cat.id ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {featuredNews.length > 0 && (
        <div className="featured-news">
          {featuredNews.map(item => (
            <div key={item.id} className="featured-news-card">
              <div className="featured-news-image">
                <img src={item.image} alt={item.title} />
                <div className="featured-news-category">{item.category}</div>
              </div>
              <div className="featured-news-content">
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <div className="featured-news-meta">
                  <div className="author-info">
                    <img src={item.authorImage} alt={item.author} className="author-image" />
                    <span>{item.author}</span>
                  </div>
                  <div className="news-meta">
                    <span><FaCalendarAlt /> {formatDate(item.date)}</span>
                    <span><FaClock /> {item.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="news-grid">
        {regularNews.map(item => (
          <div key={item.id} className="news-card" id={`news-${item.id}`}>
            <div className="news-card-image">
              <img src={item.image} alt={item.title} />
              <div className="news-card-category">{item.category}</div>
              <button className="news-card-bookmark" onClick={() => handleBookmark(item.id)}>
                {bookmarks.includes(item.id) ? <FaBookmark /> : <FaRegBookmark />}
                {bookmarkTooltip.id === item.id && (
                  <span className="bookmark-tooltip">{bookmarkTooltip.msg}</span>
                )}
              </button>
            </div>
            <div className="news-card-content">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="news-card-meta">
                <div className="author-info">
                  <img src={item.authorImage} alt={item.author} className="author-image" />
                  <span>{item.author}</span>
                </div>
                <div className="news-meta">
                  <span><FaCalendarAlt /> {formatDate(item.date)}</span>
                  <span><FaClock /> {item.readTime}</span>
                </div>
              </div>
              <button className="news-card-share" onClick={() => handleShare(item.id)}>
                <FaShare /> Share
                {copiedId === item.id && (
                  <span className="share-tooltip">Link copied!</span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="no-results">
          <h3>No news found</h3>
          <p>Try adjusting your search or category filters</p>
        </div>
      )}
    </div>
  );
} 