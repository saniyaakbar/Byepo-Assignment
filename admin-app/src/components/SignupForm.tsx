import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Input } from './Input';

interface SignupFormProps {
  onSignupSuccess?: () => void;
}

export const SignupForm = ({ onSignupSuccess }: SignupFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(''); // Clear previous errors

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsSubmitting(true);
      await signup(email, password, organizationId);
      setEmail('');
      setPassword('');
      setOrganizationId('');
      if (onSignupSuccess) {
        onSignupSuccess();
      } else {
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setLocalError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        type="email"
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="admin@example.com"
        required
      />

      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
      />

      <Input
        type="text"
        label="Organization ID"
        value={organizationId}
        onChange={(e) => setOrganizationId(e.target.value)}
        placeholder="Paste MongoDB ObjectId"
        required
      />

      {localError && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm animate-in fade-in">
          {localError}
        </div>
      )}

      <Button
        type="submit"
        variant="success"
        size="md"
        fullWidth
        loading={isSubmitting || isLoading}
      >
        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
      </Button>
    </form>
  );
};
