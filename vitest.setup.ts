import '@testing-library/jest-dom/vitest';

import { createElement, type ReactNode } from 'react';
import { vi } from 'vitest';

// Mock Next.js specific modules that rely on the browser/runtime
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: ReactNode; href: string }) =>
    createElement('a', { href, ...props }, children),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill: _fill, ...props }: { src: string; alt: string; className?: string }) =>
    createElement('img', { ...props }),
}));
