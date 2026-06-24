import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import { FeatureFlag } from '../types/index';
import { CreateFlagModal } from '../components/CreateFlagModal';
import { FlagList } from '../components/FlagList';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const Dashboard = () => {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFlags = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await apiClient.listFlags();
      const flagsArray = Array.isArray(response.data) ? response.data : [];
      setFlags(flagsArray);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load flags';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  const enabledCount = flags.filter((f) => f.enabled).length;

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Feature Flags
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
              Manage feature flags for your organization
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsModalOpen(true)}
            className="sm:w-auto"
          >
            Create Flag
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Flags</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{flags.length}</p>
            </div>
            <div className="text-4xl text-indigo-600 dark:text-indigo-400">⊡</div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Enabled</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{enabledCount}</p>
            </div>
            <div className="text-4xl text-green-600 dark:text-green-400">✓</div>
          </div>
        </Card>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {/* Flags List */}
      <FlagList
        flags={flags}
        isLoading={isLoading}
        onRefresh={fetchFlags}
      />

      {/* Modal */}
      <CreateFlagModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchFlags}
      />
    </Layout>
  );
};
