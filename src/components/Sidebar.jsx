import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon"></div>
          <div className="logo-text">
            <h1>Sonic Monolith</h1>
            <p>PREMIUM AUDIO</p>
          </div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">home</span>
          <span>Home</span>
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">search</span>
          <span>Search</span>
        </NavLink>
        <NavLink to="/library" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">library_music</span>
          <span>Library</span>
        </NavLink>
        
        <div className="nav-section">
          <p className="nav-section-title">LIBRARY</p>
          <NavLink to="/playlist" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="material-symbols-outlined">queue_music</span>
            <span>Playlists</span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="material-symbols-outlined">person</span>
            <span>Profile</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </NavLink>
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <button className="btn-premium">Go Premium</button>
      </div>
    </aside>
  );
}

export default Sidebar;
