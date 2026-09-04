import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Calendar, User, Briefcase, DollarSign, Receipt } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const BottomNav = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user || user.role === 'society_admin' || user.role === 'federation_admin') {
    return null;
  }

  const customerLinks = [
    { to: '/customer/home', icon: Home, label: t('nav.home') },
    { to: '/customer/bookings', icon: Calendar, label: t('nav.bookings') },
    { to: '/customer/payment', icon: Receipt, label: 'Receipt' },
    { to: '/customer/profile', icon: User, label: t('nav.profile') },
  ];

  const workerLinks = [
    { to: '/worker/home', icon: Home, label: t('nav.home') },
    { to: '/worker/jobs', icon: Briefcase, label: t('worker.jobs') },
    { to: '/worker/earnings', icon: DollarSign, label: t('worker.earnings') },
    { to: '/worker/profile', icon: User, label: t('nav.profile') },
  ];

  const links = user.role === 'customer' ? customerLinks : workerLinks;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            <link.icon className="h-6 w-6" />
            <span className="text-[10px] font-medium">{link.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
