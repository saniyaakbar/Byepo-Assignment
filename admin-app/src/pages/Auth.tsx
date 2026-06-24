import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { SignupForm } from '../components/SignupForm';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Redirect if already logged in
  if (user) {
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
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl mb-4 shadow-md">
              <span className="text-white text-2xl font-bold">→</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Feature Flags
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              Admin dashboard
            </p>
          </div>

          {/* Forms */}
          {isLogin ? (
            <>
              <LoginForm />
              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  No account?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold transition-colors"
                  >
                    Create one
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <SignupForm />
              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Have an account?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold transition-colors"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
