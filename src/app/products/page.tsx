'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProducts, Product } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';

const categories = ['All', 'ayurvedic', 'nutraceutical'];

// Helper function to validate and fix image URLs
function getValidImageUrl(imageUrl: string | undefined): string | null {
  if (!imageUrl) return null;
  
  // If it's already a valid URL, return it
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative path or invalid, return null to use fallback
  return null;
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#111111] mx-auto mb-4"></div>
          <p className="text-[#666666]">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-[#111111] text-white rounded-lg hover:bg-[#333333] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
      case 'price-high':
        // Price sorting not available - fallback to name
        return (a.name || '').localeCompare(b.name || '');
      case 'name':
      default:
        return (a.name || '').localeCompare(b.name || '');
    }
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-20">
      {/* Header */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-light text-[#111111] mb-6">
              Our Products
            </h1>
            <p className="text-xl text-[#666666] max-w-2xl mx-auto">
              Discover our curated collection of premium wellness products, 
              crafted with ancient wisdom and modern science.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#111111] text-white'
                      : 'bg-white text-[#111111] hover:bg-[#f0f0f0]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-[#e0e0e0] rounded-lg bg-white text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2">
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={getValidImageUrl(product.images?.[0]) || 'https://via.placeholder.com/300x400/F8F6F3/8B7355?text=Product+Image'}
                        alt={product.name || 'Product'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 text-black px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded">
                          {product.category === 'ayurvedic' ? 'Ayurvedic' : 'Nutraceutical'}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="text-sm text-[#666666] mb-2">{product.category}</div>
                      <h3 className="text-lg font-medium text-[#111111] mb-2 group-hover:text-[#666666] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#666666] mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Benefits */}
                      {product.benefits && product.benefits.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.benefits.slice(0, 2).map((benefit: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs bg-[#f5f5f5] text-[#666666] px-2 py-1 rounded"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Product Info */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#666666]">
                          {product.category || 'Wellness Product'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* No Products Message */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-[#666666]">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#111111] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Be the first to know about new products, exclusive offers, and wellness tips.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-[#111111] focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-[#111111] rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}