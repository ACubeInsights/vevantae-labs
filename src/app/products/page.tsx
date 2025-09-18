'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, Product } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';
import { Search, Filter, X, ChevronDown, Grid, List, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const categories = ['All', 'ayurvedic', 'nutraceutical'];
const ageGroups = ['All Ages', 'Children', 'Adults', 'Seniors'];
const sortOptions = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'featured', label: 'Featured First' }
];

const ITEMS_PER_PAGE = 12;

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
  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All Ages');
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  
  // Available benefits for filtering (extracted from products)
  const availableBenefits = useMemo(() => {
    const benefits = new Set<string>();
    products.forEach(product => {
      product.benefits?.forEach(benefit => benefits.add(benefit));
    });
    return Array.from(benefits).sort();
  }, [products]);

  // Filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      
      // Age group filter
      if (selectedAgeGroup !== 'All Ages' && product.age_group !== selectedAgeGroup.toLowerCase()) {
        return false;
      }
      
      // Benefits filter
      if (selectedBenefits.length > 0) {
        const hasSelectedBenefit = selectedBenefits.some(benefit => 
          product.benefits?.includes(benefit)
        );
        if (!hasSelectedBenefit) return false;
      }
      
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name?.toLowerCase().includes(query);
        const matchesDescription = product.description?.toLowerCase().includes(query);
        const matchesBenefits = product.benefits?.some(benefit => 
          benefit.toLowerCase().includes(query)
        );
        const matchesIngredients = product.key_ingredients?.some(ingredient => 
          ingredient.toLowerCase().includes(query)
        );
        
        if (!matchesName && !matchesDescription && !matchesBenefits && !matchesIngredients) {
          return false;
        }
      }
      
      return true;
    });
    
    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'newest':
          return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
        case 'oldest':
          return new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime();
        case 'featured':
          return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [products, selectedCategory, selectedAgeGroup, selectedBenefits, searchQuery, sortBy]);
  
  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  // Effects
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
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedAgeGroup, selectedBenefits, searchQuery, sortBy]);

  // Early returns after all hooks
  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <p className="text-secondary">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  // Helper functions
  const toggleBenefit = (benefit: string) => {
    setSelectedBenefits(prev => 
      prev.includes(benefit) 
        ? prev.filter(b => b !== benefit)
        : [...prev, benefit]
    );
  };
  
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedAgeGroup('All Ages');
    setSelectedBenefits([]);
    setSortBy('name');
  };
  
  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedAgeGroup !== 'All Ages',
    selectedBenefits.length > 0,
    searchQuery.trim() !== ''
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Header />
      {/* Header */}
        <section className="section-padding pt-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 uppercase">
              Our Products
            </h1>
            <p className="text-xl text-[#333333] max-w-2xl mx-auto">
              Discover our curated collection of premium wellness products, 
              crafted with ancient wisdom and modern science.
            </p>
          </motion.div>

          {/* Search and Controls Bar */}
          <div className="bg-white border border-[#E5E5E0] p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#333333] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, benefits, ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#E5E5E0] focus:outline-none focus:border-[#111111] transition-all duration-300 bg-[#FAF9F6] text-[#111111]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#333333] hover:text-[#111111]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 border transition-all duration-300 ${
                    showFilters || activeFiltersCount > 0
                      ? 'bg-[#111111] text-[#FAF9F6] border-[#111111]'
                  : 'bg-[#FAF9F6] text-[#111111] border-[#E5E5E0] hover:border-[#111111]'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-[#FAF9F6] text-[#111111] text-xs px-2 py-1 font-medium">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* View Mode Toggle */}
                <div className="flex bg-[#E5E5E0] p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-[#FAF9F6] text-[#111111]'
                  : 'text-[#333333] hover:text-[#111111]'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-[#FAF9F6] text-[#111111]'
                  : 'text-[#333333] hover:text-[#111111]'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-[#E5E5E0] text-[#111111] focus:outline-none focus:border-[#111111] bg-[#FAF9F6]"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Advanced Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
                animate={{ opacity: 1, scaleY: 1, transformOrigin: 'top' }}
                exit={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
                transition={{ 
                  duration: 0.25, 
                  ease: [0.4, 0.0, 0.2, 1],
                  opacity: { duration: 0.2 },
                  scaleY: { duration: 0.25 }
                }}
                className="bg-white border border-[#E5E5E0] p-6 mb-8 origin-top"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Categories */}
                  <div className="flex-1">
                    <h3 className="font-bold text-[#111111] mb-3 uppercase text-sm">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 text-sm transition-all duration-300 border ${
                            selectedCategory === category
                              ? 'bg-[#111111] text-[#FAF9F6] border-[#111111]'
                  : 'bg-[#FAF9F6] text-[#333333] border-[#E5E5E0] hover:bg-[#DADAD3] hover:text-[#111111]'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Age Groups */}
                  <div className="flex-1">
                    <h3 className="font-bold text-[#111111] mb-3 uppercase text-sm">Age Groups</h3>
                    <div className="flex flex-wrap gap-2">
                      {ageGroups.map((ageGroup) => (
                        <button
                          key={ageGroup}
                          onClick={() => setSelectedAgeGroup(ageGroup)}
                          className={`px-4 py-2 text-sm transition-all duration-300 border ${
                            selectedAgeGroup === ageGroup
                              ? 'bg-[#8B7355] text-[#FAF9F6] border-[#8B7355]'
                  : 'bg-[#FAF9F6] text-[#A0896B] border-[#E5E5E0] hover:bg-[#DADAD3] hover:text-[#8B7355]'
                          }`}
                        >
                          {ageGroup}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  {availableBenefits.length > 0 && (
                    <div className="flex-1">
                      <h3 className="font-bold text-[#8B7355] mb-3 uppercase text-sm">Benefits</h3>
                      <div className="max-h-32 overflow-y-auto">
                        <div className="flex flex-wrap gap-2">
                          {availableBenefits.slice(0, 10).map((benefit) => (
                            <button
                              key={benefit}
                              onClick={() => toggleBenefit(benefit)}
                              className={`px-3 py-1 text-sm transition-all duration-300 border ${
                                selectedBenefits.includes(benefit)
                                  ? 'bg-[#8B7355] text-[#FAF9F6] border-[#8B7355]'
                  : 'bg-[#FAF9F6] text-[#A0896B] border-[#E5E5E0] hover:bg-[#DADAD3] hover:text-[#8B7355]'
                              }`}
                            >
                              {benefit}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <div className="mt-6 pt-4 border-t border-[#E5E5E0]">
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-[#A0896B] hover:text-[#8B7355] transition-colors duration-300 uppercase"
                    >
                      Clear all filters ({activeFiltersCount})
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-[#333333]">
              <span className="text-sm uppercase font-medium">
                Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
                {activeFiltersCount > 0 && (
                  <span className="ml-2 text-[#111111] font-bold">
                    ({activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied)
                  </span>
                )}
              </span>
            </div>
            
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-[#333333] hover:text-[#111111] transition-colors flex items-center gap-1 uppercase font-medium"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}
          </div>

          {/* Products Grid/List */}
          <motion.div
            layout
            transition={{
              layout: {
                duration: 0.4,
                ease: [0.4, 0.0, 0.2, 1]
              }
            }}
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "flex flex-col gap-4"
            }
          >
            <AnimatePresence mode="wait">
              {paginatedProducts.map((product: Product, index: number) => (
                <motion.div
                  key={`${product.id}-${viewMode}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    layout: {
                      duration: 0.4,
                      ease: [0.4, 0.0, 0.2, 1]
                    }
                  }}
                  className="group"
                >
                  <Link href={`/products/${product.id}`} className="block h-full">
                    {viewMode === 'grid' ? (
                      /* Grid View */
                      <div className="bg-white border border-[#E5E5E0] overflow-hidden hover:border-[#333333] transition-all duration-500 group-hover:-translate-y-1 h-full flex flex-col">
                        {/* Product Image */}
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <Image
                            src={getValidImageUrl(product.images?.[0]) || 'https://via.placeholder.com/300x400/F8F6F3/8B7355?text=Product+Image'}
                            alt={product.name || 'Product'}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#111111] text-[#FAF9F6] px-3 py-1.5 text-xs uppercase tracking-wider font-bold">
                              {product.category === 'ayurvedic' ? 'Ayurvedic' : 'Nutraceutical'}
                            </span>
                          </div>
                          
                          {/* Featured Badge */}
                          {product.is_featured && (
                            <div className="absolute top-4 right-4">
                              <span className="bg-[#A36F40] text-[#FAF9F6] px-2 py-1 text-xs font-bold">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-[#A36F40] transition-colors duration-300 line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="text-sm text-[#333333] mb-4 line-clamp-3 leading-relaxed">
                              {product.description}
                            </p>
                            
                            {/* Benefits */}
                            {product.benefits && product.benefits.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {product.benefits.slice(0, 3).map((benefit: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-[#A36F40]/10 text-[#A36F40] px-2.5 py-1 font-bold border border-[#A36F40]/20"
                                  >
                                    {benefit}
                                  </span>
                                ))}
                                {product.benefits.length > 3 && (
                                  <span className="text-xs text-[#333333] px-2.5 py-1 font-medium">
                                    +{product.benefits.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Age Group */}
                          {product.age_group && (
                            <div className="mt-auto pt-4 border-t border-border/50">
                              <span className="text-xs text-[#333333] uppercase tracking-wider font-medium">
                                For {product.age_group}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* List View */
                      <div className="bg-white border border-[#E5E5E0] overflow-hidden hover:border-[#333333] transition-all duration-300">
                        <div className="flex flex-col md:flex-row">
                          {/* Product Image */}
                          <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden">
                            <Image
                              src={getValidImageUrl(product.images?.[0]) || 'https://via.placeholder.com/300x400/F8F6F3/8B7355?text=Product+Image'}
                              alt={product.name || 'Product'}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="bg-[#111111] text-[#FAF9F6] px-2.5 py-1 text-xs uppercase tracking-wider font-bold">
                                {product.category === 'ayurvedic' ? 'Ayurvedic' : 'Nutraceutical'}
                              </span>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#A36F40] transition-colors duration-300">
                                {product.name}
                              </h3>
                              {product.is_featured && (
                                <span className="bg-[#A36F40] text-[#FAF9F6] px-2 py-1 text-xs font-bold ml-3">
                                  Featured
                                </span>
                              )}
                            </div>
                            
                            <p className="text-[#333333] mb-4 line-clamp-2 leading-relaxed">
                              {product.description}
                            </p>
                            
                            {/* Benefits */}
                            {product.benefits && product.benefits.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {product.benefits.slice(0, 4).map((benefit: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-[#A36F40]/10 text-[#A36F40] px-3 py-1.5 font-bold border border-[#A36F40]/20"
                                  >
                                    {benefit}
                                  </span>
                                ))}
                                {product.benefits.length > 4 && (
                                  <span className="text-xs text-[#333333] px-3 py-1.5 font-medium">
                                    +{product.benefits.length - 4} more benefits
                                  </span>
                                )}
                              </div>
                            )}
                            
                            {/* Age Group */}
                            {product.age_group && (
                              <div className="text-xs text-[#333333] uppercase tracking-wider font-medium">
                                Suitable for {product.age_group}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Products Message */}
          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#111111] mb-2 uppercase">No products found</h3>
              <p className="text-[#333333] mb-6">
                {searchQuery 
                  ? `No products match "${searchQuery}". Try adjusting your search or filters.`
                  : 'No products match your current filters. Try adjusting your selection.'
                }
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-[#111111] text-[#FAF9F6] hover:bg-[#333333] transition-colors border border-[#111111] uppercase font-bold text-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 mb-8 gap-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 border uppercase text-sm font-bold ${
                  currentPage === 1
                    ? 'text-[#333333] cursor-not-allowed opacity-50 border-[#E5E5E0]'
                    : 'text-[#333333] hover:text-[#111111] hover:bg-[#DADAD3] border-[#E5E5E0] hover:border-[#111111]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else if (currentPage <= 4) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  } else {
                    pageNum = currentPage - 3 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 transition-all duration-300 border text-sm font-bold ${
                        currentPage === pageNum
                          ? 'bg-[#111111] text-[#FAF9F6] border-[#111111]'
                          : 'text-[#333333] hover:text-[#111111] hover:bg-[#DADAD3] border-[#E5E5E0] hover:border-[#111111]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 border uppercase text-sm font-bold ${
                  currentPage === totalPages
                    ? 'text-[#333333] cursor-not-allowed opacity-50 border-[#E5E5E0]'
                    : 'text-[#333333] hover:text-[#111111] hover:bg-[#DADAD3] border-[#E5E5E0] hover:border-[#111111]'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}