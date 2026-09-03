import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Input, Card } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { LanguageContext } from '../../context/LanguageContext';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isHindi, changeLanguage } = useContext(LanguageContext) || {};
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      if (user.role === 'society_admin' || user.role === 'federation_admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'worker') {
        navigate('/worker/home');
      } else {
        navigate('/customer/home');
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || 'Invalid email or password. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (role) => {
    let demoEmail = '';
    const demoPassword = 'Demo@123';

    if (role === 'customer') demoEmail = 'customer.demo@workmate.test';
    else if (role === 'worker') demoEmail = 'worker.demo@workmate.test';
    else if (role === 'admin') demoEmail = 'admin.demo@workmate.test';

    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');

    // Instant login for demo convenience
    setLoading(true);
    try {
      const user = await login(demoEmail, demoPassword);
      if (user.role === 'society_admin' || user.role === 'federation_admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'worker') {
        navigate('/worker/home');
      } else {
        navigate('/customer/home');
      }
    } catch (err) {
      console.error('Demo login error:', err);
      setError(err.response?.data?.message || 'Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 mb-2">
            <span className="text-3xl font-extrabold text-[#FF9933]">Work</span>
            <span className="text-3xl font-extrabold text-[#138808]">Mate</span>
          </div>
          <p className="text-sm font-medium text-gray-500">
            Cooperative Gig Services Platform • SIH #26089
          </p>
        </div>

        <Card className="p-6 md:p-8 shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {t('common.login') || 'Sign in to your account'}
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-sm rounded">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                className="input-field"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field pr-16"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-gray-700 uppercase"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 text-base font-semibold mt-2"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>

          {/* One-click Demo Logins */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">1-Click Demo Login</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">Demo Ready</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => demoLogin('customer')}
                className="px-2 py-2.5 text-xs font-semibold rounded-lg border border-orange-200 bg-orange-50 text-orange-800 hover:bg-orange-100 transition text-center"
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => demoLogin('worker')}
                className="px-2 py-2.5 text-xs font-semibold rounded-lg border border-green-200 bg-green-50 text-green-800 hover:bg-green-100 transition text-center"
              >
                Worker
              </button>
              <button
                type="button"
                onClick={() => demoLogin('admin')}
                className="px-2 py-2.5 text-xs font-semibold rounded-lg border border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100 transition text-center"
              >
                Admin
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register here
            </Link>
          </div>
        </Card>
        
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => changeLanguage && changeLanguage(isHindi ? 'en' : 'hi')}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm inline-flex items-center space-x-1"
          >
            <span>🌐</span>
            <span>{isHindi ? 'English' : 'हिंदी (Hindi)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
