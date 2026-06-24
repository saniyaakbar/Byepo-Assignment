import { useState, useEffect } from 'react';
import superAdminApiClient from '../services/apiClient';
import { Organization } from '../types/index';
import { CreateOrgModal } from '../components/CreateOrgModal';
import { OrgList } from '../components/OrgList';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const Dashboard = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrganizations = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await superAdminApiClient.listOrganizations();
      setOrganizations(response.data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load organizations';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Organizations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
              Manage and create new organizations
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsModalOpen(true)}
            className="sm:w-auto"
          >
            Create Organization
          </Button>
        </div>
      </div>

      {/* Stats Card */}
      <Card className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Organizations</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{organizations.length}</p>
          </div>
          <div className="text-4xl text-purple-600 dark:text-purple-400">⊞</div>
        </div>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {/* Organizations List */}
      <OrgList
        organizations={organizations}
        isLoading={isLoading}
      />

      {/* Modal */}
      <CreateOrgModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchOrganizations}
      />
    </Layout>
  );
};
