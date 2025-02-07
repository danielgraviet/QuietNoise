'use client';

import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    try {
        const savedTheme = localStorage.getItem('theme-storage');
        if (savedTheme) {
            const parsedTheme = JSON.parse(savedTheme); // find out what this does
            setTheme(parsedTheme.state.theme);
        }
    } catch (error) {
        console.error('Error loading theme:', error);
    }
}, []);

const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    try {
        localStorage.setItem('theme-storage', JSON.stringify({ 
            state: { theme: newTheme },
            version: 0,
        }));
    } catch (error) {
        console.error('Error saving theme:', error);
    }
};

return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
);
};