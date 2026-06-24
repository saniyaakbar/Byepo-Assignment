import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'danger' | 'warning' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'info', children, className = '' }) => {
  const variantClasses = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
