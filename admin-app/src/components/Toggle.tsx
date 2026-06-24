import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  loading?: boolean;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, loading = false, disabled = false }) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => !loading && onChange(!enabled)}
        disabled={disabled || loading}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
          enabled
            ? 'bg-green-500 focus:ring-green-500'
            : 'bg-gray-300 dark:bg-gray-600 focus:ring-gray-400'
        } ${loading || disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
            enabled ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {enabled ? 'Enabled' : 'Disabled'}
      </span>
    </div>
  );
};
