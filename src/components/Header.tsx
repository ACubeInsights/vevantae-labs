'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const mainNav = [
    { name: 'New Launches', href: '/new-launches' },
    { name: 'Categories', href: '/categories' },
    { name: 'Products', href: '/products' },
    { name: 'Lifestyle', href: '/lifestyle' },
    { name: 'Benefits', href: '/benefits' },
  ];

  const rightNav = [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const navigation = [...mainNav, ...rightNav];

  return (
    <header className="sticky top-0 z-40 bg-white/40 backdrop-blur-3xl backdrop-saturate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-24">

          <Link href="/" className="flex-shrink-0">
            <div className="flex flex-col items-center" style={{ fontFamily: '"Avenir Next", "Avenir", system-ui, sans-serif' }}>
              <span className="text-[24px] font-medium tracking-[0.15em] text-gray-900">VEVANTAE LABS</span>
              <span className="text-[16px] font-light tracking-[0.08em] text-gray-700">Wellness That Works</span>
            </div>
          </Link>


          <nav className="hidden lg:flex items-center justify-center flex-1 space-x-6">
            {mainNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 uppercase tracking-wide ${
                    isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center space-x-6">
            {rightNav.map((item) => {
              const isActive = pathname === item.href;
              const isContact = item.name === 'Contact';
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 uppercase tracking-wide flex items-center gap-2 ${
                    isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                  {isContact && <Phone className="w-4 h-4" />}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4 lg:hidden">
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>

        
        {isMenuOpen && (
          <div className="lg:hidden bg-white/30 backdrop-blur-3xl backdrop-saturate-200">
            <nav className="py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-6 py-3 text-sm font-medium transition-colors duration-200 uppercase tracking-wide ${
                      isActive
                        ? 'text-blue-600 bg-blue-50/50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-white/40'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
