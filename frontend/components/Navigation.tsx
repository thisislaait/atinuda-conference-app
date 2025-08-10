import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Ticket, Users, Calendar, User, Network, Camera, BookOpen } from 'lucide-react';

const navigationItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/tickets', icon: Ticket, label: 'Tickets' },
  { path: '/speakers', icon: Users, label: 'Speakers' },
  { path: '/schedule', icon: Calendar, label: 'Schedule' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/networking', icon: Network, label: 'Network' },
  { path: '/photos', icon: Camera, label: 'Photos' },
  { path: '/guide', icon: BookOpen, label: 'Guide' }
];

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <IconComponent size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
