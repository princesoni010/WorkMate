import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Users, CalendarDays, Wallet, AlertTriangle, TrendingUp } from 'lucide-react';

const Sidebar = () => {
  const { t } = useTranslation();

  const links = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: t('admin.dashboard') },
    { to: '/admin/verify-workers', icon: Users, label: t('admin.verify') },
    { to: '/admin/bookings', icon: CalendarDays, label: t('admin.bookings') },
    { to: '/admin/welfare', icon: Wallet, label: t('admin.welfare') },
    { to: '/admin/grievances', icon: AlertTriangle, label: t('admin.grievances') },
    { to: '/admin/forecast', icon: TrendingUp, label: t('admin.forecast') },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="text-xl font-bold text-primary">AdminPanel</span>
      </div>
      <div className="py-4 flex flex-col gap-1 px-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-primary-light bg-opacity-20 text-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <link.icon className="h-5 w-5 mr-3" />
            {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
