import { render, screen } from '@testing-library/react';

import { BlogCard } from '@/components/BlogCard';
import type { BlogPost } from '@/lib/supabase';

const mockPost: BlogPost = {
  id: '1',
  title: 'Harnessing Botanicals for Modern Wellness',
  slug: 'harnessing-botanicals-modern-wellness',
  excerpt: 'Discover how Vevantae Labs formulates plant-powered solutions for every day balance.',
  content: 'Long-form content',
  author: 'Team Vevantae',
  category: 'Insights',
  published_at: '2024-11-01',
  featured_image: '/certificates2/ISO-certificate.avif',
  tags: ['Herbal', 'Innovation', 'Wellness'],
  updated_at: '2024-11-01',
  created_at: '2024-10-01',
  meta_title: null,
  meta_description: null,
  status: 'published',
  is_featured: false,
};

describe('BlogCard', () => {
  it('renders primary blog metadata', () => {
    render(<BlogCard post={mockPost} />);

    expect(
      screen.getByRole('heading', { name: 'Harnessing Botanicals for Modern Wellness' })
    ).toBeInTheDocument();
    expect(screen.getByText(/Team Vevantae/i)).toBeInTheDocument();
    expect(screen.getByText('#Herbal')).toBeInTheDocument();
  });

  it('links to the blog detail page', () => {
    render(<BlogCard post={mockPost} />);

    const link = screen.getAllByRole('link').find((element) => element.getAttribute('href'));
    expect(link).toHaveAttribute('href', `/blog/${mockPost.slug}`);
  });
});
