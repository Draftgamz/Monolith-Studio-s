# Sonic Monolith - React Music Streaming Platform

A modern, Spotify-style music streaming website built with **React + Vite**. Features a sleek dark theme with violet accent colors, matching the provided design images exactly.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **CSS3** - Custom styling with CSS variables

## Project Structure

```
sonic-monolith/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.jsx       # Main app layout wrapper
│   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   ├── TopBar.jsx       # Top search bar with navigation
│   │   └── PlayerBar.jsx    # Bottom persistent player bar
│   ├── contexts/            # React Context providers
│   │   ├── AppProvider.jsx  # Main context provider
│   │   ├── LibraryContext.jsx
│   │   ├── PlayerContext.jsx
│   │   └── ToastContext.jsx
│   ├── data/                # Mock data and constants
│   │   └── mockData.js
│   ├── pages/               # Page components (route-level)
│   │   ├── HomePage.jsx          # Home/Discovery
│   │   ├── SearchPage.jsx        # Search/Explore
│   │   ├── LibraryPage.jsx       # Your Library
│   │   ├── PlaylistPage.jsx      # Playlist view
│   │   ├── ProfilePage.jsx       # User profile
│   │   ├── SettingsPage.jsx      # Settings
│   │   └── LyricsPlayerPage.jsx  # Full-screen lyrics
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── .gitignore             # Git ignore rules
├── .env.example           # Environment variables template
├── CONTRIBUTING.md        # Contribution guidelines
└── README.md              # This file
```

## Pages Included

1. **Home** (`/`) - Featured spotlight, recently played cards
2. **Search** (`/search`) - Recent searches, genre cards
3. **Library** (`/library`) - Collection grid with filters
4. **Playlist** (`/playlist`) - Track list view
5. **Profile** (`/profile`) - User profile with stats
6. **Settings** (`/settings`) - Account and audio settings
7. **Lyrics Player** (`/lyrics`) - Full-screen lyrics view

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Features

### Design System
- **Colors**: Deep midnight palette with violet accents (`#8B5CF6`)
- **Typography**: Plus Jakarta Sans
- **Icons**: Material Symbols Outlined
- **Effects**: Glassmorphism, smooth transitions, hover animations

### Components
- Responsive sidebar navigation
- Sticky top bar with search
- Persistent player bar with playback controls
- Full-screen lyrics player with synced highlighting

### Interactions
- Play/pause toggle
- Like/favorite tracks
- Progress bar seeking
- Volume control
- Settings toggles
- Filter chips
- View mode switching

## Features to Implement

### Backend & API
- [ ] **User Authentication** - Sign up, login, OAuth (Spotify/Google)
- [ ] **RESTful/GraphQL API** - Backend service for data management
- [ ] **Database Integration** - PostgreSQL/MongoDB for user data, playlists, preferences
- [ ] **Music Streaming Service** - Audio file hosting and streaming infrastructure

### Core Music Features
- [ ] **Real Music Library** - Upload/import personal music collection
- [ ] **Playlist Management** - Create, edit, share, collaborate on playlists
- [ ] **Queue System** - Add tracks to queue, reorder, clear
- [ ] **Shuffle & Repeat** - Smart shuffle algorithms, repeat modes (all/one)
- [ ] **Crossfade** - Seamless transitions between tracks
- [ ] **Equalizer** - Custom EQ presets and manual adjustments

### Social Features
- [ ] **User Profiles** - Public profiles with follower/following system
- [ ] **Social Sharing** - Share playlists, tracks on social media
- [ ] **Collaborative Playlists** - Multiple users editing same playlist
- [ ] **Activity Feed** - See what friends are listening to
- [ ] **Direct Messaging** - Send tracks/playlists to friends

### Discovery & Recommendations
- [ ] **Recommendation Engine** - ML-based music suggestions
- [ ] **Daily Mixes** - Personalized daily playlists
- [ ] **Release Radar** - New releases from followed artists
- [ ] **Browse Categories** - Genre, mood, activity-based browsing
- [ ] **Charts & Trends** - Top tracks, viral charts by region

### Premium Features
- [ ] **Offline Mode** - Download tracks for offline listening
- [ ] **High-Quality Audio** - FLAC/lossless streaming support
- [ ] **No Ads** - Ad-free listening experience
- [ ] **Unlimited Skips** - Remove skip limitations

### UI/UX Improvements
- [ ] **Mobile Responsive** - Full mobile/tablet support
- [ ] **Desktop App** - Electron wrapper for desktop
- [ ] **Mini Player** - Compact player mode
- [ ] **Now Playing View** - Enhanced full-screen album art
- [ ] **Search Enhancements** - Autocomplete, filters, advanced search
- [ ] **Dark/Light Theme** - Theme toggle option
- [ ] **Animations** - Framer Motion for smoother transitions

### Analytics & Insights
- [ ] **Listening Stats** - Top artists, tracks, genres over time
- [ ] **Wrapped/Year in Review** - Annual listening summary
- [ ] **Play Counts** - Track how many times each song played

### Integrations
- [ ] **Spotify Import** - Import playlists from Spotify
- [ ] **Last.fm Scrobbling** - Sync listening history
- [ ] **Discord Rich Presence** - Show currently playing in Discord
- [ ] **Smart Home** - Alexa/Google Home integration

### Developer Tools
- [ ] **API Documentation** - Public API for third-party developers
- [ ] **Webhooks** - Event notifications for integrations
- [ ] **SDK** - Client libraries for common languages

## Keyboard Shortcuts (Lyrics Player)

- `Space` - Play/Pause
- `F` - Toggle fullscreen
- `Arrow Left/Right` - Seek
- `Arrow Up/Down` - Volume

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari

Requires modern browser with support for:
- CSS Grid and Flexbox
- CSS Custom Properties
- Backdrop filter

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## License

Demo project for educational purposes.
