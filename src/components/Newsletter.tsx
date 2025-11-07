'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

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

      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border p-8">
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

        {message && (
          <p
            className={`text-sm ${
              message.includes('Thank you') ? 'text-olive' : 'text-terracotta'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
