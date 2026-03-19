import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLibrary } from '../contexts/LibraryContext';

function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { search, clearSearch } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Navigate to search page if not already there
    if (location.pathname !== '/search' && value.trim()) {
      navigate('/search');
    }
    
    // Trigger search
    if (value.trim()) {
      search(value);
    } else {
      clearSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    clearSearch();
  };

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <div className="nav-arrows">
          <button className="arrow-btn" onClick={() => window.history.back()}>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="arrow-btn" onClick={() => window.history.forward()}>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <div className="search-bar">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Search artists, tracks, or mood..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button className="search-clear" onClick={handleClearSearch}>
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
      </div>
      <div className="top-bar-right">
        <button className="icon-btn">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="icon-btn">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="user-avatar">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQYsIJg2d1lo1phhElzDz-ZMkIJcEG_f7bZaoFD6nxsrNHauN90MtEzssQfhTa62oQxbVIKfIzO6x70e6BZfe8fAPpVtfdOVHuJqmjHahTHkjLsnXP2UTYcTeE0s7b-ZHELK0gtJOIs_-pW2kNX4Ulx7XcYZrJwShyEcFJ4GWwD2vdZYOC0w7t_rJMcGu8B7OxQv3cfpOa_5py5Q2smvzEd4gshO58qsFpmCNfaiwMsZzo-R50z1zTITmjsMW3oDIsJt-9LEC_WQhf"
            alt="User"
          />
        </div>
      </div>
    </header>
  );
}

export default TopBar;
