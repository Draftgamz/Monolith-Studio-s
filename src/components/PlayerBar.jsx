import { Link } from 'react-router-dom';
import { usePlayer } from '../contexts/PlayerContext';
import { useLibrary } from '../contexts/LibraryContext';
import { formatDuration } from '../data/mockData';

function PlayerBar() {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    isLiked,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    setVolume,
    toggleLike,
    toggleShuffle,
    toggleRepeat,
    toggleMute
  } = usePlayer();

  const { isSongLiked, toggleLikeSong } = useLibrary();

  const handleLike = () => {
    if (currentSong) {
      toggleLike();
      toggleLikeSong(currentSong.id);
    }
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * duration;
    seek(percent);
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setVolume(Math.max(0, Math.min(1, percent)));
  };

  const getRepeatIcon = () => {
    if (repeatMode === 'one') return 'repeat_one';
    if (repeatMode === 'all') return 'repeat';
    return 'repeat';
  };

  if (!currentSong) {
    return (
      <footer className="player-bar player-bar-empty">
        <div className="player-empty-state">
          <span className="material-symbols-outlined">music_note</span>
          <p>Select a song to start playing</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="player-bar">
      <div className="player-left">
        <div className="now-playing-art">
          <img src={currentSong.cover} alt={currentSong.title} />
          <div className={`now-playing-animation ${isPlaying ? 'playing' : ''}`}></div>
        </div>
        <div className="now-playing-info">
          <h5>{currentSong.title}</h5>
          <p>{currentSong.artist}</p>
        </div>
        <button
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span className={`material-symbols-outlined ${isLiked ? 'filled' : ''}`}>
            favorite
          </span>
        </button>
      </div>

      <div className="player-center">
        <div className="playback-controls">
          <button 
            className={`control-btn ${isShuffled ? 'active' : ''}`}
            onClick={toggleShuffle}
            title="Shuffle"
          >
            <span className="material-symbols-outlined">shuffle</span>
          </button>
          <button className="control-btn" onClick={playPrevious} title="Previous">
            <span className="material-symbols-outlined">skip_previous</span>
          </button>
          <button className="play-btn-large" onClick={togglePlay}>
            <span className="material-symbols-outlined filled">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button className="control-btn" onClick={playNext} title="Next">
            <span className="material-symbols-outlined">skip_next</span>
          </button>
          <button 
            className={`control-btn ${repeatMode !== 'off' ? 'active' : ''}`}
            onClick={toggleRepeat}
            title={repeatMode === 'one' ? 'Repeat One' : 'Repeat All'}
          >
            <span className="material-symbols-outlined">{getRepeatIcon()}</span>
          </button>
        </div>
        <div className="progress-container">
          <span className="time-current">{formatDuration(progress)}</span>
          <div
            className="progress-bar"
            onClick={handleProgressClick}
          >
            <div className="progress-fill" style={{ width: `${(progress / duration) * 100}%` }} />
          </div>
          <span className="time-total">{formatDuration(duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <Link to="/lyrics" className="icon-btn-small">
          <span className="material-symbols-outlined">lyrics</span>
        </Link>
        <button className="icon-btn-small" title="Queue">
          <span className="material-symbols-outlined">queue_music</span>
        </button>
        <div className="volume-control">
          <button className="icon-btn-small" onClick={toggleMute}>
            <span className="material-symbols-outlined">
              {isMuted || volume === 0 ? 'volume_off' : 'volume_up'}
            </span>
          </button>
          <div
            className="volume-bar"
            onClick={handleVolumeClick}
          >
            <div className="volume-fill" style={{ width: `${(isMuted ? 0 : volume) * 100}%` }} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PlayerBar;
