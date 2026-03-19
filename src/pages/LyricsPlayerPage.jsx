import { useState, useEffect } from 'react';

function LyricsPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(70);
  const [currentLineIndex, setCurrentLineIndex] = useState(4);

  const lyrics = [
    "Tracing lines in silicon dust",
    "The architecture of the mind",
    "Signals lost in static dreams",
    "We are the echoes left behind",
    "Vibrating through the hollow void",
    "Where the midnight sun begins to rise",
    "Digital heartbeats in the cold",
    "Seeing through synthetic eyes",
    "Building monuments of light",
    "In a world of cold design",
    "Fading signals in the air",
    "Searching for a sign"
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentLineIndex(prev => (prev + 1) % lyrics.length);
      setProgress(prev => {
        const newProgress = prev + 0.05;
        return newProgress > 100 ? 0 : newProgress;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, lyrics.length]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="lyrics-player-page">
      <div className="lyrics-background">
        <div className="bg-gradient"></div>
        <div className="bg-blur"></div>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd4L-TpFVdJf68WkiX-bAlw9QmZmLzq-Q6nkIiOOQDnyMp7i92H3w67p_fOFdfjkywze68dwNQLjppRThvU-bjWUK9Z36T-5ohTtavoBnLPzY7gNUBzuikScxXNlCnW--Tscy1fcJepCkpK4vA1Cbgr7R_rH4lrpCnO0DrqW1juAylPG5fvgzzM5JPXMbEBjkT_OuV50a9q-h5MoTOpsgVcaCERtF885qK-n55G1AWKWnXWFsO094pjFBGj382uRKwfOTxolgufZ21"
          alt="Background"
          className="bg-image"
        />
      </div>

      <nav className="lyrics-top-nav">
        <div className="nav-left">
          <button className="nav-back-btn" onClick={() => window.history.back()}>
            <span className="material-symbols-outlined">expand_more</span>
          </button>
          <div className="playing-from">
            <span className="playing-from-label">PLAYING FROM PLAYLIST</span>
            <span className="playing-from-title">Sonic Monolith</span>
          </div>
        </div>
        <div className="nav-right">
          <button className="icon-btn-nav">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="icon-btn-nav">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </nav>

      <main className="lyrics-main">
        <div className="lyrics-content">
          <div className="album-art-container">
            <div className="album-glow"></div>
            <div className="album-art">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd4L-TpFVdJf68WkiX-bAlw9QmZmLzq-Q6nkIiOOQDnyMp7i92H3w67p_fOFdfjkywze68dwNQLjppRThvU-bjWUK9Z36T-5ohTtavoBnLPzY7gNUBzuikScxXNlCnW--Tscy1fcJepCkpK4vA1Cbgr7R_rH4lrpCnO0DrqW1juAylPG5fvgzzM5JPXMbEBjkT_OuV50a9q-h5MoTOpsgVcaCERtF885qK-n55G1AWKWnXWFsO094pjFBGj382uRKwfOTxolgufZ21"
                alt="Neon Cathedral"
              />
            </div>
          </div>

          <div className="track-info-section">
            <h1 className="track-title">Neon Cathedral</h1>
            <p className="track-artist">The Monolith Quartet</p>
            <div className="track-actions">
              <button className="action-btn">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="action-btn">
                <span className="material-symbols-outlined">add_circle</span>
              </button>
              <button className="action-btn">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>

          <div className="lyrics-section">
            <div className="lyrics-scroll-container">
              {lyrics.map((line, index) => (
                <p
                  key={index}
                  className={`lyric-line ${
                    index === currentLineIndex
                      ? 'current'
                      : index === currentLineIndex - 1
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => setCurrentLineIndex(index)}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="focus-switcher">
          <button className="focus-btn active">
            <span className="material-symbols-outlined filled">album</span>
          </button>
          <button className="focus-btn">
            <span className="material-symbols-outlined">mic_external_on</span>
          </button>
          <button className="focus-btn">
            <span className="material-symbols-outlined">high_quality</span>
          </button>
          <div className="focus-divider"></div>
          <button className="focus-btn">
            <span className="material-symbols-outlined">fullscreen_exit</span>
          </button>
        </div>
      </main>

      <footer className="lyrics-player-bar">
        <div
          className="lyrics-progress-bar"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            setProgress(percent);
          }}
        >
          <div className="lyrics-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="player-content">
          <div className="player-time">
            <span className="time-current">
              {`0${Math.floor((progress / 100) * 255 / 60)}`.slice(-2)}:
              {`0${Math.floor((progress / 100) * 255) % 60}`.slice(-2)}
            </span>
            <span className="time-separator">/</span>
            <span className="time-total">04:15</span>
          </div>

          <div className="player-controls">
            <button className="control-btn-player">
              <span className="material-symbols-outlined">shuffle</span>
            </button>
            <button className="control-btn-player">
              <span className="material-symbols-outlined">skip_previous</span>
            </button>
            <button className="play-btn-lyrics" onClick={togglePlay}>
              <span className="material-symbols-outlined filled">
                {isPlaying ? 'pause' : 'play_circle'}
              </span>
            </button>
            <button className="control-btn-player">
              <span className="material-symbols-outlined">skip_next</span>
            </button>
            <button className="control-btn-player">
              <span className="material-symbols-outlined">repeat</span>
            </button>
          </div>

          <div className="player-secondary">
            <button className="secondary-btn active">
              <span className="material-symbols-outlined">lyrics</span>
            </button>
            <button className="secondary-btn">
              <span className="material-symbols-outlined">queue_music</span>
            </button>
            <div className="volume-section">
              <span className="material-symbols-outlined">volume_up</span>
              <div
                className="volume-slider"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = ((e.clientX - rect.left) / rect.width) * 100;
                  setVolume(percent);
                }}
              >
                <div className="volume-slider-fill" style={{ width: `${volume}%` }} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LyricsPlayerPage;
