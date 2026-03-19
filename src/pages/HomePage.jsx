import { usePlayer } from '../contexts/PlayerContext';
import { useLibrary } from '../contexts/LibraryContext';
import { mockSongs, mockAlbums, mockArtists } from '../data/mockData';

function HomePage() {
  const { playSong } = usePlayer();
  const { getRecentlyPlayedSongs, getLikedSongsList } = useLibrary();

  const recentlyPlayed = getRecentlyPlayedSongs().slice(0, 6);
  const likedSongs = getLikedSongsList().slice(0, 4);
  const trendingSongs = mockSongs.slice(0, 4);
  const newReleases = mockAlbums.slice(0, 4);
  const topArtists = mockArtists.slice(0, 4);

  const handlePlaySong = (song) => {
    playSong(song, mockSongs);
  };

  const handlePlayAlbum = (album) => {
    const albumSongs = album.songs.map(id => mockSongs.find(s => s.id === id)).filter(Boolean);
    if (albumSongs.length > 0) {
      playSong(albumSongs[0], albumSongs);
    }
  };

  return (
    <div className="page home-page">
      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLM81dcpJcctVVfmwe-6KV34INpNnlcUGtQg_WGjz7vh5u-YJY4WoIsx_J89GuQMdKE_92kljLoGwvO3n45HCWISDzvGCLqRMV0b76r0B0Zahi1lMz-gt2G9kJUHgm7rRqVDii6Jvw8jo-GwR_jXzsrqCAT97u7FuTbeUfWvWzv91Ec0gcrnSfIs8ckAiuMypaCoZOpeyZNlwPVeWcUJV-kyhKwW8Nhuhw0442FOHDillHomvnepZp-GylOwH4El7QI1uA9TMSEDGi"
          alt="Featured artist"
          className="hero-image"
        />
        <div className="hero-content">
          <div className="hero-tag">
            <span className="tag-line"></span>
            <span>FEATURED SPOTLIGHT</span>
          </div>
          <h2 className="hero-title">Elegy of<br />the Void</h2>
          <p className="hero-description">
            Experience the visceral evolution of Neo-Classical Ambient. A deep dive into the resonance of silence.
          </p>
          <div className="hero-actions">
            <button 
              className="btn btn-primary"
              onClick={() => handlePlaySong(mockSongs.find(s => s.id === '6'))}
            >
              <span className="material-symbols-outlined filled">play_arrow</span>
              Listen Now
            </button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {recentlyPlayed.length > 0 && (
        <section className="content-section">
          <div className="section-header">
            <div className="section-title">
              <h3>Jump Back In</h3>
              <p>Your recent musical journey continues here</p>
            </div>
          </div>
          <div className="cards-grid">
            {recentlyPlayed.map((item) => (
              <div 
                key={item.id} 
                className="card"
                onClick={() => handlePlaySong(item)}
              >
                <div className="card-image">
                  <img src={item.cover} alt={item.title} />
                  <div className="card-play-overlay">
                    <span className="material-symbols-outlined filled">play_arrow</span>
                  </div>
                </div>
                <div className="card-info">
                  <h4>{item.title}</h4>
                  <p>{item.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="content-section">
        <div className="section-header">
          <div className="section-title">
            <h3>Trending Now</h3>
            <p>What everyone's listening to right now</p>
          </div>
        </div>
        <div className="cards-grid">
          {trendingSongs.map((item) => (
            <div 
              key={item.id} 
              className="card"
              onClick={() => handlePlaySong(item)}
            >
              <div className="card-image">
                <img src={item.cover} alt={item.title} />
                <div className="card-play-overlay">
                  <span className="material-symbols-outlined filled">play_arrow</span>
                </div>
              </div>
              <div className="card-info">
                <h4>{item.title}</h4>
                <p>{item.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <div className="section-title">
            <h3>New Releases</h3>
            <p>Fresh albums just dropped</p>
          </div>
        </div>
        <div className="cards-grid albums-grid">
          {newReleases.map((album) => (
            <div 
              key={album.id} 
              className="card album-card"
              onClick={() => handlePlayAlbum(album)}
            >
              <div className="card-image">
                <img src={album.cover} alt={album.title} />
                <div className="card-play-overlay">
                  <span className="material-symbols-outlined filled">play_arrow</span>
                </div>
              </div>
              <div className="card-info">
                <h4>{album.title}</h4>
                <p>{album.artist} • {album.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <div className="section-title">
            <h3>Top Artists</h3>
            <p>Most played artists this month</p>
          </div>
        </div>
        <div className="artists-grid">
          {topArtists.map((artist) => (
            <div key={artist.id} className="artist-item">
              <div className="artist-image">
                <img src={artist.image} alt={artist.name} />
                <div className="artist-play-overlay">
                  <span className="material-symbols-outlined filled">play_arrow</span>
                </div>
              </div>
              <h4>{artist.name}</h4>
              <p>{artist.genre}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
