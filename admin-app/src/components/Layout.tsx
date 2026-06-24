import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title = 'Feature Flags' }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize dark mode on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
    setMounted(true);
  }, []);

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!mounted) return null;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="h-screen w-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-md border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h1>
              {user && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user.email}</p>}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleDarkModeToggle}
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 py-8 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
