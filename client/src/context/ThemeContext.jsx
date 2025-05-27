import React, { createContext, useContext, useState, useEffect } from 'react';

/*
  ThemeContext.jsx - Theme (light/dark) state for EDSM
  ---------------------------------------------------
  - Provides theme and setTheme to the app.
  - Integrates with localStorage and document for theme persistence.
  - For backend/frontend devs: Add system theme sync or backend theme sync here if needed.
*/

// ThemeContext.jsx - Provides theme (light/dark) context for the app
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // State for current theme (light/dark)
  const [theme, setTheme] = useState(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    // Update localStorage and document attribute when theme changes
    localStorage.setItem('theme', theme);
    
    // Update document class for CSS variables
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Set theme based on system preference
  const setSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, setSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}