import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Hardcoded Admin Credentials
    if (email === "admin@gmail.com" && password === "admin123") {
      const adminUser = {
        name: "Admin",
        email: email,
        role: "admin"
      };
      
      localStorage.setItem('user', JSON.stringify(adminUser));
      alert("✅ Admin Login Successful!");
      navigate('/admin');
    } else {
      alert("❌ Wrong Email or Password!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">
          
          {/* Logo / Header */}
          <div className="text-center mb-10">
            <div className="mx-auto w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-4xl">🔑</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Login</h1>
            <p className="text-gray-400 mt-2">Welcome back, Admin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-4 rounded-2xl text-white font-semibold text-lg transition-all mt-4"
            >
              {loading ? "Logging in..." : "Login as Admin"}
            </button>
          </form>

          {/* Switch to User Login */}
          <div className="text-center mt-8">
            <p 
              onClick={() => navigate('/login')}
              className="text-gray-400 hover:text-white cursor-pointer transition-colors text-sm"
            >
              ← Back to User Login
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Default Credentials: <span className="text-gray-400">admin@gmail.com / admin123</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;