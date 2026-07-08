import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/api/register', formData);
      if (res.data.success) {
        alert('Registration Successful! Please check your email for verification.');
        navigate('/login', {
          state: { email: formData.email },
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.msg ||
        err.response?.data?.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">Create Account</h1>
            <p className="text-gray-300 mt-2">Join BlogVista today</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-2xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter 11 digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-4 rounded-2xl text-lg transition-all mt-6"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-8 text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-400 font-semibold hover:text-blue-300 hover:underline transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;