import React, { useState, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Input, Card } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { LanguageContext } from '../../context/LanguageContext';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const { isHindi, changeLanguage } = useContext(LanguageContext) || {};
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'customer';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: initialRole
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await register(formData);
      if (user.role === 'worker') {
        navigate('/worker/register');
      } else if (user.role === 'society_admin' || user.role === 'federation_admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/customer/home');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Failed to create account. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 mb-2">
            <span className="text-3xl font-extrabold text-[#FF9933]">Work</span>
            <span className="text-3xl font-extrabold text-[#138808]">Mate</span>
          </div>
          <p className="text-sm font-medium text-gray-500">
            Create your account
          </p>
        </div>

        <Card className="p-6 md:p-8 shadow-md border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-sm rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Join as:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'customer', label: 'Customer' },
                  { id: 'worker', label: 'Worker' },
                  { id: 'society_admin', label: 'Admin' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: item.id })}
                    className={`py-2 px-1 text-xs font-semibold rounded-lg border transition ${
                      formData.role === item.id 
                        ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-sm' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Full Name"
              name="name"
              placeholder="e.g. Ramesh Kumar"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
            
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 text-base font-semibold mt-4"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login here
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

export default RegisterPage;
