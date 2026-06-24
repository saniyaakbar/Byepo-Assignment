import { useState, useEffect } from 'react';
import userApiClient from '../services/apiClient';
import { CheckFlagResponse } from '../types/index';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

export const CheckFeatureFlag = () => {
  const [organizationId, setOrganizationId] = useState('');
  const [featureKey, setFeatureKey] = useState('');
  const [result, setResult] = useState<CheckFlagResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!organizationId.trim() || !featureKey.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const response = await userApiClient.checkFeatureFlag(organizationId, featureKey);
      setResult(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check feature flag';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors overflow-hidden">
        {/* Dark Mode Toggle */}
        <button
          onClick={handleDarkModeToggle}
          className="absolute top-6 right-6 p-2.5 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700 transition-all"
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* Main Card */}
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl mb-4 shadow-md">
                <span className="text-white text-2xl font-bold">→</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Feature Flags
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                Check feature availability
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="text"
                label="Organization ID"
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
                placeholder="Paste org ID"
                required
              />

              <Input
                type="text"
                label="Feature Key"
                value={featureKey}
                onChange={(e) => setFeatureKey(e.target.value)}
                placeholder="e.g., new_dashboard"
                required
              />

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isLoading}
              >
                Check Status
              </Button>
            </form>

            {/* Result Display */}
            {result && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Card className={`${
                  result.enabled
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className="text-center">
                    <p className={`text-4xl font-bold mb-3 ${
                      result.enabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {result.enabled ? '✓' : '✗'}
                    </p>
                    <Badge variant={result.enabled ? 'success' : 'danger'}>
                      {result.enabled ? 'ENABLED' : 'DISABLED'}
                    </Badge>
                    {result.message && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">{result.message}</p>
                    )}
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
