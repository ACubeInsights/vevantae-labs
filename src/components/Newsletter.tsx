'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { trackNewsletterSignup, trackEvent } from '@/components/GoogleAnalytics';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate success path
      trackNewsletterSignup('newsletter_component');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch {
      setMessage('Something went wrong. Please try again.');
      trackEvent('newsletter_error', { component: 'newsletter_component' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-border p-8">
      <div className="max-w-md mx-auto text-center space-y-4">
        <h3 className="text-xl font-semibold text-primary">Stay Updated</h3>

        <p className="text-secondary text-sm leading-relaxed">
          Subscribe to our newsletter for wellness tips, product updates, and exclusive offers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-border bg-background text-primary placeholder-secondary focus:outline-none focus:border-primary transition-colors duration-200"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>

        <p
          aria-live="polite"
          aria-atomic="true"
          className={`min-h-[1.25rem] text-sm transition-colors ${
            message
              ? message.includes('Thank you')
                ? 'text-olive'
                : 'text-terracotta'
              : 'text-secondary/60'
          }`}
        >
          {message || 'Enter your email to subscribe.'}
        </p>
      </div>
    </div>
  );
}
