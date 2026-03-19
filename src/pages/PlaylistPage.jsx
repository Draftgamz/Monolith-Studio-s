import { useParams, useNavigate } from 'react-router-dom';
import { usePlayer } from '../contexts/PlayerContext';
import { useLibrary } from '../contexts/LibraryContext';
import { useToast } from '../contexts/ToastContext';
import { getPlaylistById, mockSongs, formatDuration } from '../data/mockData';

function PlaylistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const { playlists, getPlaylistSongs, deletePlaylist, addToPlaylist, removeFromPlaylist, isSongLiked, toggleLikeSong } = useLibrary();
  const toast = useToast();

  const playlist = id ? getPlaylistById(id) || playlists.find(p => p.id === id) : playlists[1];
  const songs = playlist ? getPlaylistSongs(playlist.id) : [];

  const handlePlaySong = (song, index) => {
    playSong(song, songs);
  };

  const handlePlayPause = () => {
    if (currentSong && songs.some(s => s.id === currentSong?.id)) {
      togglePlay();
    } else if (songs.length > 0) {
      playSong(songs[0], songs);
    }
  };

  const handleDeletePlaylist = () => {
    if (playlist && !playlist.isAuto) {
      if (window.confirm(`Are you sure you want to delete "${playlist.title}"?`)) {
        deletePlaylist(playlist.id);
        toast.success('Playlist deleted');
        navigate('/library');
      }
    }
  };

  const handleLikeSong = (songId, e) => {
    e.stopPropagation();
    toggleLikeSong(songId);
  };

  if (!playlist) {
    return (
      <div className="page playlist-page">
        <div className="no-results">
          <span className="material-symbols-outlined">playlist_play</span>
          <h3>Playlist not found</h3>
          <p>This playlist doesn't exist or has been removed</p>
          <button className="btn btn-primary" onClick={() => navigate('/library')}>
            Go to Library
          </button>
        </div>
      </div>
    );
  }

  const isPlayingFromPlaylist = currentSong && songs.some(s => s.id === currentSong?.id);

  return (
    <div className="page playlist-page">
      <section className="playlist-hero">
        <div className="playlist-content">
          <div className="playlist-art">
            <img src={playlist.cover || 'https://via.placeholder.com/300?text=Playlist'} alt={playlist.title} />
          </div>
          <div className="playlist-info">
            <span className="playlist-tag">{playlist.isAuto ? 'AUTO-GENERATED' : 'PUBLIC PLAYLIST'}</span>
            <h2>{playlist.title}</h2>
            <p>{playlist.description}</p>
            <div className="playlist-meta">
              <span>{songs.length} songs</span>
              <span>•</span>
              <span>{playlist.isAuto ? 'Auto-generated' : 'User created'}</span>
            </div>
            <div className="playlist-actions">
              <button className="btn btn-primary" onClick={handlePlayPause}>
                <span className="material-symbols-outlined filled">
                  {isPlayingFromPlaylist && isPlaying ? 'pause' : 'play_arrow'}
                </span>
                {isPlayingFromPlaylist && isPlaying ? 'Pause' : 'Play'}
              </button>
              {!playlist.isAuto && (
                <>
                  <button className="btn btn-secondary">Follow</button>
                  <button className="icon-btn-more" onClick={handleDeletePlaylist}>
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="tracks-list">
        <div className="tracks-header">
          <span>#</span>
          <span>Title</span>
          <span>Artist</span>
          <span>Album</span>
          <span className="time-icon">
            <span className="material-symbols-outlined">schedule</span>
          </span>
          <span></span>
        </div>
        {songs.map((track, index) => {
          const isActive = currentSong?.id === track.id;
          return (
            <div
              key={track.id}
              className={`track-row ${isActive ? 'active' : ''}`}
              onClick={() => handlePlaySong(track, index)}
              onDoubleClick={handlePlayPause}
            >
              <span className="track-number">
                {isActive && isPlayingFromPlaylist && isPlaying ? (
                  <div className="equalizer-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  index + 1
                )}
              </span>
              <div className="track-info">
                <img src={track.cover} alt={track.title} />
                <div className="track-info-text">
                  <span>{track.title}</span>
                </div>
              </div>
              <span className="track-artist">{track.artist}</span>
              <span className="track-album">{track.album}</span>
              <span className="track-duration">{formatDuration(track.duration)}</span>
              <div className="track-actions">
                <button 
                  className={`like-track-btn ${isSongLiked(track.id) ? 'liked' : ''}`}
                  onClick={(e) => handleLikeSong(track.id, e)}
                >
                  <span className={`material-symbols-outlined ${isSongLiked(track.id) ? 'filled' : ''}`}>
                    favorite
                  </span>
                </button>
                <button className="icon-btn-more">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          );
        })}
        {songs.length === 0 && (
          <div className="empty-playlist">
            <span className="material-symbols-outlined">music_off</span>
            <h3>No songs yet</h3>
            <p>Add songs to this playlist to get started</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default PlaylistPage;
