import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, asChild = false, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-200 border-0 cursor-pointer text-center';

    const variants = {
      default: 'bg-transparent border border-border text-primary hover:bg-muted',
      primary: 'bg-primary text-background border border-primary hover:bg-secondary',
      outline:
        'bg-transparent border border-primary text-primary hover:bg-primary hover:text-background',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-button',
      lg: 'px-8 py-4 text-button',
    };

    const Component = asChild ? 'span' : 'button';

    return (
      <Component
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export { Button };
