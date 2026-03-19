import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../contexts/LibraryContext';
import { usePlayer } from '../contexts/PlayerContext';
import { useToast } from '../contexts/ToastContext';

function LibraryPage() {
  const navigate = useNavigate();
  const { playlists, createPlaylist, deletePlaylist } = useLibrary();
  const { playSong } = usePlayer();
  const toast = useToast();
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');

  const filters = ['All', 'Playlists', 'Albums', 'Artists', 'Liked'];

  const filteredPlaylists = playlists.filter(playlist => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Playlists') return !playlist.isAuto;
    if (activeFilter === 'Liked') return playlist.id === 'p1';
    return true;
  });

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (newPlaylistTitle.trim()) {
      const playlist = createPlaylist(newPlaylistTitle.trim());
      toast.success(`Playlist "${playlist.title}" created`);
      setNewPlaylistTitle('');
      setShowCreateModal(false);
      navigate(`/playlist/${playlist.id}`);
    }
  };

  const handlePlayPlaylist = (playlist) => {
    // Implementation for playing playlist
    toast.info(`Playing ${playlist.title}`);
  };

  const handleDeletePlaylist = (e, playlist) => {
    e.stopPropagation();
    if (!playlist.isAuto && window.confirm(`Delete "${playlist.title}"?`)) {
      deletePlaylist(playlist.id);
      toast.success('Playlist deleted');
    }
  };

  return (
    <div className="page library-page">
      <section className="library-header">
        <div className="library-title">
          <h3>Your Library</h3>
          <p>{playlists.length} items in your collection</p>
        </div>
        <div className="library-actions">
          <button 
            className="btn btn-primary btn-create-playlist"
            onClick={() => setShowCreateModal(true)}
          >
            <span className="material-symbols-outlined">add</span>
            New Playlist
          </button>
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <span className="material-symbols-outlined">list</span>
            </button>
          </div>
        </div>
      </section>

      <div className="filter-chips">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`chip ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <section className={`library-grid ${viewMode}`}>
        {filteredPlaylists.map((item) => (
          <div
            key={item.id}
            className={`library-card ${item.id === 'p1' ? 'large' : ''}`}
            onClick={() => navigate(`/playlist/${item.id}`)}
          >
            {item.id === 'p1' ? (
              <div className="card-bg">
                <div className="card-tag">AUTO-GENERATED</div>
                <h4>{item.title}</h4>
                <p>
                  <span className="material-symbols-outlined filled">favorite</span>
                  {item.songs.length} liked songs
                </p>
              </div>
            ) : (
              <>
                <div className="card-image">
                  <img src={item.cover || 'https://via.placeholder.com/300?text=Playlist'} alt={item.title} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.songs.length} songs</p>
              </>
            )}
            {item.id === 'p1' && (
              <button 
                className="play-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPlaylist(item);
                }}
              >
                <span className="material-symbols-outlined filled">play_arrow</span>
              </button>
            )}
            {!item.isAuto && item.id !== 'p1' && (
              <button 
                className="delete-btn"
                onClick={(e) => handleDeletePlaylist(e, item)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            )}
          </div>
        ))}
      </section>

      {filteredPlaylists.length === 0 && (
        <div className="empty-library">
          <span className="material-symbols-outlined">folder_open</span>
          <h3>Your library is empty</h3>
          <p>Create a playlist to get started</p>
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            <span className="material-symbols-outlined">add</span>
            Create Playlist
          </button>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Playlist</h3>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreatePlaylist}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="playlist-title">Title</label>
                  <input
                    id="playlist-title"
                    type="text"
                    placeholder="My Awesome Playlist"
                    value={newPlaylistTitle}
                    onChange={(e) => setNewPlaylistTitle(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={!newPlaylistTitle.trim()}>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LibraryPage;
