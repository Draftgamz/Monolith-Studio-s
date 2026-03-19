import { createContext, useContext, useState, useCallback } from 'react';
import { mockPlaylists, mockUser, mockSongs, getSongById } from '../data/mockData';

const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  const [playlists, setPlaylists] = useState(mockPlaylists);
  const [likedSongs, setLikedSongs] = useState(mockUser.likedSongs);
  const [recentlyPlayed, setRecentlyPlayed] = useState(mockUser.recentlyPlayed);
  const [following, setFollowing] = useState(mockUser.following);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ songs: [], albums: [], artists: [], playlists: [] });
  const [isSearching, setIsSearching] = useState(false);

  const toggleLikeSong = useCallback((songId) => {
    setLikedSongs(prev => {
      if (prev.includes(songId)) {
        return prev.filter(id => id !== songId);
      }
      return [...prev, songId];
    });
  }, []);

  const isSongLiked = useCallback((songId) => {
    return likedSongs.includes(songId);
  }, [likedSongs]);

  const addRecentlyPlayed = useCallback((songId) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(id => id !== songId);
      return [songId, ...filtered].slice(0, 20);
    });
  }, []);

  const createPlaylist = useCallback((title, description = '') => {
    const newPlaylist = {
      id: `p${Date.now()}`,
      title,
      description,
      cover: null,
      isAuto: false,
      songs: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  }, []);

  const deletePlaylist = useCallback((playlistId) => {
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
  }, []);

  const addToPlaylist = useCallback((playlistId, songId) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId && !playlist.songs.includes(songId)) {
        return { ...playlist, songs: [...playlist.songs, songId] };
      }
      return playlist;
    }));
  }, []);

  const removeFromPlaylist = useCallback((playlistId, songId) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return { ...playlist, songs: playlist.songs.filter(id => id !== songId) };
      }
      return playlist;
    }));
  }, []);

  const reorderPlaylistSongs = useCallback((playlistId, fromIndex, toIndex) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        const newSongs = [...playlist.songs];
        const [removed] = newSongs.splice(fromIndex, 1);
        newSongs.splice(toIndex, 0, removed);
        return { ...playlist, songs: newSongs };
      }
      return playlist;
    }));
  }, []);

  const updatePlaylist = useCallback((playlistId, updates) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return { ...playlist, ...updates };
      }
      return playlist;
    }));
  }, []);

  const search = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults({ songs: [], albums: [], artists: [], playlists: [] });
      return;
    }

    setIsSearching(true);
    setSearchQuery(query);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const lowerQuery = query.toLowerCase();
    
    const filteredSongs = mockSongs.filter(song => 
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery) ||
      song.album.toLowerCase().includes(lowerQuery)
    );

    const filteredAlbums = [
      { id: 'a1', title: 'Digital Dreams', artist: 'Synth Weaver' },
      { id: 'a2', title: 'Celestial Echoes', artist: 'Lune Echoes' },
      { id: 'a3', title: 'Stratus Vol. 1', artist: 'Cloud Nine' },
      { id: 'a4', title: 'Deep Water', artist: 'Depth Charge' },
      { id: 'a5', title: 'The Machine Age', artist: 'White Noise Collective' },
      { id: 'a6', title: 'Solo', artist: 'Nils Frahm' }
    ].filter(album => 
      album.title.toLowerCase().includes(lowerQuery) ||
      album.artist.toLowerCase().includes(lowerQuery)
    );

    const filteredArtists = [
      { id: 'ar1', name: 'Synth Weaver' },
      { id: 'ar2', name: 'Lune Echoes' },
      { id: 'ar3', name: 'Cloud Nine' },
      { id: 'ar4', name: 'Depth Charge' },
      { id: 'ar5', name: 'Nils Frahm' },
      { id: 'ar6', name: 'Luna Solari' }
    ].filter(artist => 
      artist.name.toLowerCase().includes(lowerQuery)
    );

    const filteredPlaylists = playlists.filter(playlist =>
      playlist.title.toLowerCase().includes(lowerQuery)
    );

    setSearchResults({
      songs: filteredSongs,
      albums: filteredAlbums,
      artists: filteredArtists,
      playlists: filteredPlaylists
    });

    setIsSearching(false);
  }, [playlists]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults({ songs: [], albums: [], artists: [], playlists: [] });
  }, []);

  const getPlaylistSongs = useCallback((playlistId) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return [];
    return playlist.songs.map(id => getSongById(id)).filter(Boolean);
  }, [playlists]);

  const getLikedSongsList = useCallback(() => {
    return likedSongs.map(id => getSongById(id)).filter(Boolean);
  }, [likedSongs]);

  const getRecentlyPlayedSongs = useCallback(() => {
    return recentlyPlayed.map(id => getSongById(id)).filter(Boolean);
  }, [recentlyPlayed]);

  const value = {
    playlists,
    likedSongs,
    recentlyPlayed,
    following,
    searchQuery,
    searchResults,
    isSearching,
    isSongLiked,
    toggleLikeSong,
    addRecentlyPlayed,
    createPlaylist,
    deletePlaylist,
    addToPlaylist,
    removeFromPlaylist,
    reorderPlaylistSongs,
    updatePlaylist,
    search,
    clearSearch,
    getPlaylistSongs,
    getLikedSongsList,
    getRecentlyPlayedSongs
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}
