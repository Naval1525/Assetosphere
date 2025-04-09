// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const Navbar = () => {
//   const { isAuthenticated, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <header className="bg-gradient-to-r from-blue-800 to-indigo-900 shadow-lg sticky top-0 z-50">
//       <div className="container mx-auto px-6 py-5 flex justify-between items-center">
//         <Link to="/" className="flex items-center space-x-2">
//           <span className="text-3xl">🏠</span>
//           <span className="text-2xl font-serif font-bold text-white tracking-wider">
//             Assetosphere
//           </span>
//         </Link>

//         <nav className="hidden md:flex items-center space-x-6 text-white font-medium">
//           <Link
//             to="/"
//             className="hover:text-blue-200 transition-colors duration-200 border-b-2 border-transparent hover:border-blue-200 pb-1"
//           >
//             Home
//           </Link>

//           {isAuthenticated ? (
//             <>
//               <Link
//                 to="/dashboard"
//                 className="hover:text-blue-200 transition-colors duration-200 border-b-2 border-transparent hover:border-blue-200 pb-1"
//               >
//                 Dashboard
//               </Link>
//               <Link
//                 to="/uploadbill"
//                 className="hover:text-blue-200 transition-colors duration-200 border-b-2 border-transparent hover:border-blue-200 pb-1"
//               >
//                 Upload Bill
//               </Link>
//               <Link
//                 to="/billlist"
//                 className="hover:text-blue-200 transition-colors duration-200 border-b-2 border-transparent hover:border-blue-200 pb-1"
//               >
//                 Bills List
//               </Link>
//               <Link
//                 to="/insurance"
//                 className="hover:text-blue-200 transition-colors duration-200 border-b-2 border-transparent hover:border-blue-200 pb-1"
//               >
//                 Insurance
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition-colors duration-200 shadow-md"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-200 shadow-md"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-5 py-2 rounded-full border-2 border-white text-white hover:bg-white hover:text-blue-800 transition-colors duration-200 shadow-md"
//               >
//                 Signup
//               </Link>
//             </>
//           )}
//         </nav>

//         {/* Mobile menu button - You would implement a mobile dropdown menu here */}
//         <button className="md:hidden text-white text-2xl">☰</button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
import { useState, useContext, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
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
            className="text-2xl sm:text-3xl font-semibold tracking-tight  cursor-pointer flex items-center space-x-1"
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
            </>
          )}
        </nav>

        {/* Mobile menu toggle (optional if you're planning to add mobile support) */}
        {/* You can expand this part with a hamburger menu if needed */}
      </div>
    </header>
  );
};

export default Navbar;
