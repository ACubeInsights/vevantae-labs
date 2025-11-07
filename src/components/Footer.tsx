'use client';

import Link from 'next/link';

export function Footer() {
  const footerLinks = {
    Products: [
      { name: 'Ayurvedic Solutions', href: '/products?category=ayurvedic' },
      { name: 'Nutraceuticals', href: '/products?category=nutraceutical' },
      { name: 'New & Notable', href: '/products?featured=true' },
      { name: 'All Products', href: '/products' },
    ],
    Learn: [
      { name: 'Benefits of Ayurveda', href: '/benefits/ayurveda' },
      { name: 'Benefits of Nutraceuticals', href: '/benefits/nutraceuticals' },
      { name: 'Blog', href: '/blog' },
      { name: 'About Us', href: '/about' },
    ],
    Partnership: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'B2B Inquiries', href: '/contact?type=b2b' },
      { name: 'Quality Standards', href: '/quality' },
      { name: 'Certifications', href: '/certifications' },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-xl font-light text-primary-foreground tracking-wide">
                Vevantae Labs
              </span>
            </Link>

            <p className="text-primary-foreground/70 leading-relaxed max-w-md text-sm">
              Ancient Wisdom, Modern Wellness. Bridging traditional ayurvedic knowledge with
              contemporary nutraceutical science for holistic health solutions.
            </p>

            <div className="space-y-2 text-sm text-primary-foreground/60">
              <p>
                Email:{' '}
                <a
                  href="mailto:alokik2012@gmail.com"
                  className="hover:text-primary-foreground transition-colors"
                >
                  alokik2012@gmail.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a
                  href="tel:+919671300080"
                  className="hover:text-primary-foreground transition-colors"
                >
                  +91 96713 00080
                </a>
              </p>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="text-sm font-normal text-primary-foreground uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/20">
          <div className="max-w-md">
            <h3 className="text-lg font-light text-primary-foreground mb-4">Stay informed</h3>
            <p className="text-sm text-primary-foreground/60 mb-6">
              Subscribe to receive updates on new products and wellness insights.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                className="flex-1 px-4 py-3 bg-transparent border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-primary-foreground transition-colors"
              />
              <button className="px-6 py-3 bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/60">
              <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>

            <div className="text-sm text-primary-foreground/60">
              <p>&copy; {new Date().getFullYear()} Vevantae Labs. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
