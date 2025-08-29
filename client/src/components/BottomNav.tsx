import React from 'react';
import { Home, Grid3X3, PlusCircle, MessageCircle, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export function BottomNav() {
  const [location] = useLocation();
  const items = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/categories', label: 'Categories', icon: Grid3X3 },
    { href: '/create', label: 'Sell', icon: PlusCircle },
    { href: '/chat', label: 'Chat', icon: MessageCircle },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 block sm:hidden" role="navigation">
      <div className="h-16 bg-white border-t shadow-lg flex items-center justify-around px-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {items.map(({ href, label, icon: Icon }) => {
          const active = location === href || (href !== '/' && location.startsWith(href));
          return (
            <Link key={href} to={href} className={`flex flex-col items-center text-xs ${active ? 'text-blue-600' : 'text-gray-600'}`}>
              <Icon className={`w-6 h-6 ${active ? 'fill-blue-600' : ''}`} />
              <span className="mt-0.5">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
