import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Feature Flag Admin</h1>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
