import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Home,
  Users,
  MessageSquare,
  Calendar,
  PieChart,
  Settings
} from 'lucide-react';

function Sbar({ isOpen, toggleSidebar }) {
  const navItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/',
    },
    {
      icon: Users,
      label: 'Contacts',
      path: '/contacts',
      children: [
        { label: 'All Contacts', path: '/contacts/all' },
        { label: 'Add Contact', path: '/contacts/add' }
      ]
    },
    {
      icon: MessageSquare,
      label: 'Messages',
      path: '/messages'
    },
    {
      icon: Calendar,
      label: 'Calendar',
      path: '/calendar'
    },
    {
      icon: PieChart,
      label: 'Analytics',
      path: '/analytics'
    },
  ];

  const [expanded, setExpanded] = React.useState({});

  const toggleExpand = (label) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col`}>
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {isOpen && <span className="text-xl font-semibold text-slate-800">CRM Pro</span>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft
            className={`h-5 w-5 text-slate-600 transform transition-transform duration-300 ${
              !isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <div className="flex flex-col">
                <div
                  className="flex items-center px-4 py-3 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  onClick={() => item.children ? toggleExpand(item.label) : null}
                >
                  <item.icon className="h-5 w-5 text-slate-600" />
                  {isOpen && <span className="ml-3 flex-1">{item.label}</span>}
                  {item.children && isOpen && (
                    expanded[item.label] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
                {item.children && expanded[item.label] && isOpen && (
                  <ul className="pl-10 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link to={child.path} className="text-sm text-slate-600 hover:text-slate-800 block py-1">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings Section */}
      <div className="border-t border-gray-200 p-4">
        <Link
          to="/settings"
          className="flex items-center text-slate-800 hover:bg-slate-100 transition-colors p-2 rounded-lg"
        >
          <Settings className="h-5 w-5 text-slate-600" />
          {isOpen && <span className="ml-3">Settings</span>}
        </Link>
      </div>

      {/* User Profile Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
            JD
          </div>
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-800">John Doe</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sbar;
