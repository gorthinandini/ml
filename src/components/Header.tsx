import React from 'react';
import { Moon, Sun, CheckSquare } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-4 transition-colors duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CheckSquare className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">TaskFlow</h1>
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
          aria-label={theme === 'light' ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-gray-700" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-400" />
          )}
        </button>
      </div>
    </header>
  );
}