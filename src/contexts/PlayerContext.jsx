import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { mockSongs, mockPlaylists, mockUser, getSongById, formatDuration } from '../data/mockData';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'all', 'one'
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(-1);
  const [isLiked, setIsLiked] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  
  const audioRef = useRef(null);
  const progressInterval = useRef(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    
    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };
    
    const handleError = (e) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Handle song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error('Playback error:', e);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSong?.id]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error('Play error:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const playSong = useCallback((song, newQueue = null) => {
    if (newQueue) {
      setQueue(newQueue);
      const index = newQueue.findIndex(s => s.id === song.id);
      setQueueIndex(index);
    } else if (!queue.length) {
      setQueue([song]);
      setQueueIndex(0);
    }
    
    setCurrentSong(song);
    setIsLiked(song.liked || false);
    setIsPlaying(true);
    setProgress(0);
  }, [queue]);

  const togglePlay = useCallback(() => {
    if (!currentSong && queue.length > 0) {
      playSong(queue[0]);
    } else {
      setIsPlaying(prev => !prev);
    }
  }, [currentSong, queue, playSong]);

  const playNext = useCallback(() => {
    if (queue.length === 0) return;
    
    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = queueIndex + 1;
      if (nextIndex >= queue.length) {
        if (repeatMode === 'all') {
          nextIndex = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }
    }
    
    setQueueIndex(nextIndex);
    setCurrentSong(queue[nextIndex]);
    setIsLiked(queue[nextIndex].liked || false);
    setIsPlaying(true);
    setProgress(0);
  }, [queue, queueIndex, isShuffled, repeatMode]);

  const playPrevious = useCallback(() => {
    if (queue.length === 0) return;
    
    // If more than 3 seconds in, restart current song
    if (progress > 3) {
      setProgress(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
      return;
    }
    
    let prevIndex = queueIndex - 1;
    if (prevIndex < 0) {
      prevIndex = repeatMode === 'all' ? queue.length - 1 : 0;
    }
    
    setQueueIndex(prevIndex);
    setCurrentSong(queue[prevIndex]);
    setIsLiked(queue[prevIndex].liked || false);
    setIsPlaying(true);
    setProgress(0);
  }, [queue, queueIndex, progress, repeatMode]);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  }, []);

  const seekRelative = useCallback((seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  }, []);

  const toggleLike = useCallback(() => {
    setIsLiked(prev => !prev);
    // In a real app, this would update the backend
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(prev => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  const addToQueue = useCallback((song) => {
    setQueue(prev => [...prev, song]);
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
    setQueueIndex(-1);
  }, []);

  const removeFromQueue = useCallback((index) => {
    setQueue(prev => {
      const newQueue = prev.filter((_, i) => i !== index);
      if (index < queueIndex) {
        setQueueIndex(prev => prev - 1);
      }
      return newQueue;
    });
  }, [queueIndex]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const value = {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    queue,
    queueIndex,
    isLiked,
    playbackRate,
    playSong,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    seekRelative,
    toggleLike,
    toggleShuffle,
    toggleRepeat,
    setVolume,
    toggleMute,
    addToQueue,
    clearQueue,
    removeFromQueue,
    setPlaybackRate
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
