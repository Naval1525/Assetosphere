import { useState, useContext, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, isCompany, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navbarClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    scrolled
      ? "bg-white/90 backdrop-blur-md shadow-lg text-gray-800"
      : "bg-gradient-to-r from-blue-800 to-indigo-900 text-white"
  }`;

  const activeLink =
    "border-b-2 border-blue-200 text-blue-200 pb-1 transition-colors duration-200";
  const normalLink =
    "border-b-2 border-transparent hover:border-blue-200 hover:text-blue-200 pb-1 transition-colors duration-200";

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.span
            className="text-3xl"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🏠
          </motion.span>
          <motion.span
            className="text-2xl sm:text-3xl font-semibold tracking-tight cursor-pointer flex items-center space-x-1"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="font-extrabold">Asset</span>
            <span className="font-light">osphere</span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            Home
          </NavLink>

          {isAuthenticated ? (
            isCompany ? (
              <>
                <NavLink
                  to="/company/dashboard"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-200 ml-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/uploadbill"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Upload Bill
                </NavLink>
                <NavLink
                  to="/billlist"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Bills List
                </NavLink>
                <NavLink
                  to="/insurance"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Insurance
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-200 ml-4"
                >
                  Logout
                </button>
              </>
            )
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                Signup
              </NavLink>
              <NavLink
                to="/company/login"
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                Company Login
              </NavLink>
            </>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-800"
              }
            >
              Home
            </NavLink>

            {isAuthenticated ? (
              isCompany ? (
                <>
                  <NavLink
                    to="/company/dashboard"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600" : "text-gray-800"
                    }
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600" : "text-gray-800"
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/uploadbill"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600" : "text-gray-800"
                    }
                  >
                    Upload Bill
                  </NavLink>
                  <NavLink
                    to="/billlist"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600" : "text-gray-800"
                    }
                  >
                    Bills List
                  </NavLink>
                  <NavLink
                    to="/insurance"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600" : "text-gray-800"
                    }
                  >
                    Insurance
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-200"
                  >
                    Logout
                  </button>
                </>
              )
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "text-gray-800"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "text-gray-800"
                  }
                >
                  Signup
                </NavLink>
                <NavLink
                  to="/company/login"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "text-gray-800"
                  }
                >
                  Company Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
