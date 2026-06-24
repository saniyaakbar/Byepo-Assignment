import { Organization } from '../types/index';
import { Card } from './Card';
import { Badge } from './Badge';

interface OrgListProps {
  organizations: Organization[];
  isLoading: boolean;
}

export const OrgList = ({ organizations, isLoading }: OrgListProps) => {
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-purple-600 dark:border-gray-600 dark:border-t-purple-500 mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading organizations...</p>
        </div>
      </div>
    );
  }

  if (organizations.length === 0) {
    return (
      <Card className="w-full py-12">
        <div className="text-center">
          <div className="inline-block w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
            <span className="text-2xl">→</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
            No organizations
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Create your first organization to get started
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map((org) => (
        <Card key={org._id}>
          <div className="flex justify-between items-start gap-3 mb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex-1">
              {org.name}
            </h3>
            <Badge variant="info">Active</Badge>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Created {new Date(org.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">ID</p>
            <p className="font-mono text-xs text-gray-700 dark:text-gray-300 break-all">{org._id}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
