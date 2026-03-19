import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../contexts/LibraryContext';
import { usePlayer } from '../contexts/PlayerContext';
import { mockGenres } from '../data/mockData';

function SearchPage() {
  const navigate = useNavigate();
  const { search, clearSearch, searchResults, isSearching, searchQuery } = useLibrary();
  const { playSong } = usePlayer();
  const [localQuery, setLocalQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery.trim()) {
        search(localQuery);
      } else {
        clearSearch();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, search, clearSearch]);

  const handlePlaySong = (song) => {
    playSong(song, searchResults.songs);
  };

  const hasResults = searchResults.songs.length > 0 || 
                     searchResults.albums.length > 0 || 
                     searchResults.artists.length > 0 ||
                     searchResults.playlists.length > 0;

  return (
    <div className="page search-page">
      {!searchQuery && (
        <>
          <section className="search-section">
            <div className="section-header">
              <div className="section-title">
                <h3>Recent Searches</h3>
                <p>Continue where you left off</p>
              </div>
            </div>
            <div className="recent-searches-placeholder">
              <div className="empty-state">
                <span className="material-symbols-outlined">history</span>
                <p>Your recent searches will appear here</p>
              </div>
            </div>
          </section>

          <section className="genres-section">
            <div className="section-header">
              <div className="section-title">
                <h3>Browse Genres</h3>
                <p>Explore by mood and sound profile</p>
              </div>
            </div>
            <div className="genres-grid">
              {mockGenres.map((genre) => (
                <div
                  key={genre.id}
                  className="genre-card"
                  style={{ background: genre.color }}
                  onClick={() => setLocalQuery(genre.name)}
                >
                  <h4>{genre.name}</h4>
                  <img src={genre.image} alt={genre.name} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {searchQuery && (
        <div className="search-results">
          {isSearching ? (
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <p>Searching...</p>
            </div>
          ) : hasResults ? (
            <>
              {searchResults.songs.length > 0 && (
                <section className="results-section">
                  <div className="section-header">
                    <h3>Songs</h3>
                  </div>
                  <div className="songs-list">
                    {searchResults.songs.map((song) => (
                      <div
                        key={song.id}
                        className="song-item"
                        onClick={() => handlePlaySong(song)}
                      >
                        <div className="song-item-image">
                          <img src={song.cover} alt={song.title} />
                        </div>
                        <div className="song-item-info">
                          <h4>{song.title}</h4>
                          <p>{song.artist}</p>
                        </div>
                        <span className="song-item-duration">
                          {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {searchResults.albums.length > 0 && (
                <section className="results-section">
                  <div className="section-header">
                    <h3>Albums</h3>
                  </div>
                  <div className="cards-grid">
                    {searchResults.albums.map((album) => (
                      <div key={album.id} className="card">
                        <div className="card-image">
                          <img src={`https://via.placeholder.com/300?text=${encodeURIComponent(album.title)}`} alt={album.title} />
                        </div>
                        <div className="card-info">
                          <h4>{album.title}</h4>
                          <p>{album.artist}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {searchResults.artists.length > 0 && (
                <section className="results-section">
                  <div className="section-header">
                    <h3>Artists</h3>
                  </div>
                  <div className="artists-grid">
                    {searchResults.artists.map((artist) => (
                      <div key={artist.id} className="artist-item">
                        <div className="artist-image">
                          <img src={`https://via.placeholder.com/200?text=${encodeURIComponent(artist.name)}`} alt={artist.name} />
                        </div>
                        <h4>{artist.name}</h4>
                        <p>Artist</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {searchResults.playlists.length > 0 && (
                <section className="results-section">
                  <div className="section-header">
                    <h3>Playlists</h3>
                  </div>
                  <div className="cards-grid">
                    {searchResults.playlists.map((playlist) => (
                      <div key={playlist.id} className="card">
                        <div className="card-image">
                          <img src={playlist.cover || 'https://via.placeholder.com/300?text=Playlist'} alt={playlist.title} />
                        </div>
                        <div className="card-info">
                          <h4>{playlist.title}</h4>
                          <p>{playlist.songs.length} songs</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="no-results">
              <span className="material-symbols-outlined">search_off</span>
              <h3>No results found</h3>
              <p>Try searching for something else</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
