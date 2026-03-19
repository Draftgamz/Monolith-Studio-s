import { PlayerProvider } from './PlayerContext';
import { LibraryProvider } from './LibraryContext';
import { ToastProvider } from './ToastContext';

export function AppProvider({ children }) {
  return (
    <ToastProvider>
      <LibraryProvider>
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </LibraryProvider>
    </ToastProvider>
  );
}
