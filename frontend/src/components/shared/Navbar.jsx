import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white/60 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-600 tracking-wide hover:text-blue-700 transition"
        >
          Assetosphere
        </Link>

        <nav className="flex items-center space-x-5 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition duration-200">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-600 transition duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
