'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full hover:bg-muted transition-colors flex items-center justify-center w-10 h-10"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <i className="fas fa-moon text-foreground text-lg"></i>
      ) : (
        <i className="fas fa-sun text-foreground text-lg"></i>
      )}
    </button>
  );
}
