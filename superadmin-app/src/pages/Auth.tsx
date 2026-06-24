import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { useState, useEffect } from 'react';

export const Auth = () => {
  const { token } = useAuth();
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

  // Redirect if already logged in
  if (token) {
    navigate('/dashboard');
    return null;
  }

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

  if (!mounted) return null;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors">
        {/* Dark Mode Toggle */}
        <button
          onClick={handleDarkModeToggle}
          className="absolute top-6 right-6 p-2.5 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700 transition-all"
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl w-full max-w-md p-8 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-4 shadow-md">
              <span className="text-white text-2xl font-bold">→</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Super Admin
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              Organization management
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg text-xs text-purple-900 dark:text-purple-200">
            <p className="font-semibold mb-2">Demo Credentials</p>
            <p className="font-mono text-xs">admin@system.com</p>
            <p className="font-mono text-xs">SuperAdmin@123</p>
          </div>
        </div>
      </div>
    </div>
  );
};
