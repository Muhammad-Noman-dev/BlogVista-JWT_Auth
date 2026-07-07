import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await api.post('/api/login', formData);
      
      if (res.data.success) {
        const userData = {
          name: res.data.user?.name || res.data.name || "User",
          email: formData.email,
          role: "user"
        };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', res.data.accessToken);
        
        alert(res.data.msg || "Login Successful! ✅");
        navigate('/blogs');
      }
    } catch (error) {
      alert(error.response?.data?.msg || 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Image (Optional - matching Home vibe) */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/path-to-your-home-image.jpg" 
          alt="" 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-300 mt-3">Sign in to continue to BlogVista</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-300 mt-4"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-8 text-gray-400">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-blue-400 font-semibold hover:text-blue-300 hover:underline transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;