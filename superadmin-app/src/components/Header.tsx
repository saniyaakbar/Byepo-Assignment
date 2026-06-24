import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-purple-600 text-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Super Admin Portal</h1>
        <button
          onClick={handleLogout}
          className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
