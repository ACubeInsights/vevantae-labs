'use client';

import { useState } from 'react';
import { subscribeToNewsletter } from '@/lib/supabase';
import { trackNewsletterSignup, trackEvent } from '@/components/GoogleAnalytics';

interface NewsletterFormProps {
  /** Where the form lives, stored with the signup and sent to analytics (e.g. "footer"). */
  source: string;
  formClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  placeholder?: string;
  /** Tailwind classes for the status message; defaults to inherit the surrounding text colour. */
  messageClassName?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function NewsletterForm({
  source,
  formClassName,
  inputClassName,
  buttonClassName,
  placeholder = 'Enter your email',
  messageClassName = 'text-sm mt-3 opacity-80',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      await subscribeToNewsletter(email, source);
      trackNewsletterSignup(source);
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Newsletter signup failed:', err);
      trackEvent('newsletter_error', { component: source });
      setStatus('error');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={formClassName}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          aria-label="Email address"
          className={inputClassName}
        />
        <button type="submit" disabled={status === 'submitting'} className={buttonClassName}>
          {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      <p aria-live="polite" className={messageClassName}>
        {status === 'success' && 'Thank you for subscribing!'}
        {status === 'error' && 'Something went wrong. Please try again.'}
      </p>
    </div>
  );
}
