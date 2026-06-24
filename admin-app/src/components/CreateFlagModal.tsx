import { useState } from 'react';
import apiClient from '../services/apiClient';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';

interface CreateFlagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateFlagModal = ({ isOpen, onClose, onSuccess }: CreateFlagModalProps) => {
  const [key, setKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);
      await apiClient.createFlag({ key, enabled: false });
      setKey('');
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create flag';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Feature Flag">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type="text"
          label="Flag Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="e.g., new_dashboard"
          error={error ? error : undefined}
          required
        />

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Use lowercase letters, numbers, and underscores (e.g., beta_feature, v2_ui)
        </p>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isSubmitting}
          >
            Create
          </Button>
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
