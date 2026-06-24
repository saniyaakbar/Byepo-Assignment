import { FeatureFlag } from '../types/index';
import apiClient from '../services/apiClient';
import { useState } from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Toggle } from './Toggle';

interface FlagListProps {
  flags: FeatureFlag[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const FlagList = ({ flags, isLoading, onRefresh }: FlagListProps) => {
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleToggle = async (flagId: string, currentState: boolean) => {
    setError('');
    try {
      setToggleLoading(flagId);
      await apiClient.toggleFlag(flagId, { enabled: !currentState });
      onRefresh();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle flag';
      setError(errorMessage);
    } finally {
      setToggleLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600 dark:border-gray-600 dark:border-t-indigo-500 mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading flags...</p>
        </div>
      </div>
    );
  }

  if (flags.length === 0) {
    return (
      <Card className="w-full py-12">
        <div className="text-center">
          <div className="inline-block w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
            <span className="text-2xl">→</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
            No feature flags
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Create your first flag to get started
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-4">
      {error && (
        <div className="w-full p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flags.map((flag) => (
          <Card key={flag._id} className="flex flex-col justify-between">
            {/* Header */}
            <div className="mb-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white font-mono flex-1 break-all">
                  {flag.key}
                </h3>
                <Badge variant={flag.enabled ? 'success' : 'danger'}>
                  {flag.enabled ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Created {new Date(flag.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
              {/* Toggle */}
              <Toggle
                enabled={flag.enabled}
                onChange={() => handleToggle(flag._id, flag.enabled)}
                loading={toggleLoading === flag._id}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
