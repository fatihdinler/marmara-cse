import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const isAuth = Boolean(localStorage.getItem('token'));

  return (
    <nav className="flex items-center justify-between bg-white shadow px-6 py-4">
      {/* Left side: Logo / Home link */}
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:underline">
          EXCUSETOR
        </Link>
      </div>

      {/* Right side: Conditional links (Home / Hall of Fame / Logout / Login / Register) */}
      <div className="flex items-center space-x-4">
        {isAuth ? (
          <>
            {/* If logged in: */}
            {location.pathname === '/' && (
              <Link
                to="/hall-of-fame"
                className="text-gray-700 hover:text-gray-900 transition"
              >
                Hall of Fame
              </Link>
            )}
            {location.pathname === '/hall-of-fame' && (
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 transition"
              >
                Home
              </Link>
            )}

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* If not logged in: */}
            <Link
              to="/login"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
