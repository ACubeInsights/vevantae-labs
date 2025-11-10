'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Benefits', href: '/benefits' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/40 backdrop-blur-3xl backdrop-saturate-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-4">
              <Image
                src="/Vevantae_logo_cropped.svg"
                alt="Vevantae Labs Logo"
                width={64}
                height={64}
                className="drop-shadow-lg"
              />
              <span
                className="text-2xl font-light text-gray-900 tracking-wide drop-shadow-lg"
                style={{ textShadow: '0 0 8px rgba(255,255,255,0.8)' }}
              >
                Vevantae Labs
              </span>
            </div>
          </Link>

          
          <nav className="hidden lg:flex items-center space-x-12">
            {navigation
              .filter((item) => item.name !== 'Contact')
              .map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-normal transition-colors duration-300 uppercase tracking-wider drop-shadow-lg ${
                    isActive ? 'text-blue-600 font-medium' : 'text-gray-800 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          
          <div className="flex items-center space-x-6">
            <Link
              href="/contact"
              className="hidden lg:block text-sm font-normal text-gray-800 hover:text-blue-600 transition-colors duration-300 uppercase tracking-wider drop-shadow-lg"
            >
              Contact
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-800 hover:text-blue-600 transition-colors duration-300 drop-shadow-lg"
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
                    className={`block px-6 py-3 text-sm font-normal transition-colors duration-300 uppercase tracking-wider drop-shadow-lg ${
                      isActive
                        ? 'text-blue-600 font-medium bg-blue-100/40'
                        : 'text-gray-800 hover:text-blue-600 hover:bg-white/30'
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
