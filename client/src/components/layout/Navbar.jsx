import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, User, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { LanguageContext } from '../../context/LanguageContext';
import Button from '../common/Button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, changeLanguage } = React.useContext(LanguageContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">WorkMate</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              onClick={() => changeLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Globe className="h-5 w-5 mr-1" />
              {language === 'en' ? 'हिन्दी' : 'English'}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 font-medium">Hello, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} icon={LogOut}>
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">{t('nav.login')}</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">{t('nav.register')}</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => changeLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center w-full text-left text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              <Globe className="h-5 w-5 mr-2" />
              {language === 'en' ? 'Switch to हिन्दी' : 'Switch to English'}
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-base font-medium"
              >
                <LogOut className="h-5 w-5 mr-2" />
                {t('nav.logout')}
              </button>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
