import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import BlogDetail from './pages/BlogDetail';
import PrivateRoute from './pages/PrivateRoute';
import MailVerification from './pages/MailVerification';

function App() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div 
              onClick={() => navigate('/')} 
              className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
            >
              BlogVista
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
              <li><NavLink to="/" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "hover:text-gray-900 transition-colors"}>Home</NavLink></li>
              <li><NavLink to="/blogs" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "hover:text-gray-900 transition-colors"}>Blogs</NavLink></li>
              <li><NavLink to="/about" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "hover:text-gray-900 transition-colors"}>About</NavLink></li>
            </ul>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Hi, {user.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="px-5 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <NavLink 
                    to="/login" 
                    className="px-5 py-2 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/register" 
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </NavLink>
                </>
              )}

              <button 
                onClick={() => navigate("/admin-login")}
                className="ml-4 bg-gray-800 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors"
              >
                Admin
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-3xl text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <ul className="flex flex-col py-4 px-6 space-y-4 text-gray-700 font-medium">
              <li><NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
              <li><NavLink to="/blogs" onClick={() => setIsMenuOpen(false)}>Blogs</NavLink></li>
              <li><NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink></li>
              
              {user ? (
                <>
                  <li className="pt-4 border-t">Hi, {user.name}</li>
                  <li>
                    <button onClick={handleLogout} className="text-red-600">Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li><NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink></li>
                  <li><NavLink to="/register" onClick={() => setIsMenuOpen(false)}>Register</NavLink></li>
                </>
              )}

              <li>
                <button 
                  onClick={() => { navigate("/admin-login"); setIsMenuOpen(false); }}
                  className="bg-gray-800 text-white px-6 py-3 rounded-xl w-full text-left"
                >
                  Admin Panel
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/blogs" element={<PrivateRoute><Blogs /></PrivateRoute>} />
        <Route path="/blog/:id" element={<PrivateRoute><BlogDetail /></PrivateRoute>} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/mail-verification" element={<MailVerification />} />
      </Routes>
    </>
  );
}

export default App;