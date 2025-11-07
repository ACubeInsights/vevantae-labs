'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProducts, Product } from '@/lib/supabase';

function getValidImageUrl(imageUrl: string | undefined): string | null {
  if (!imageUrl) return null;

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  return null;
}

export default function TestSupabasePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Supabase Connection Test</h1>
          <p className="text-lg text-gray-600">
            Successfully connected to Supabase! Found {products.length} products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-lg shadow-md overflow-hidden h-full flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={
                    getValidImageUrl(product.images?.[0]) ||
                    'https://via.placeholder.com/300x400/F8F6F3/8B7355?text=Product+Image'
                  }
                  alt={product.name || 'Product'}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name || 'Untitled Product'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description || 'No description available'}
                </p>
                <div className="flex items-center justify-between mb-4">
                  {product.net_quantity && (
                    <span className="text-lg font-medium text-blue-600">
                      {product.net_quantity}
                    </span>
                  )}
                  {product.category && (
                    <span className="text-sm text-primary-foreground/50 capitalize">
                      {product.category}
                    </span>
                  )}
                </div>
                {product.stock_quantity !== null && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-600">
                      Available: {product.stock_quantity} units
                    </span>
                  </div>
                )}
                {product.health_benefits && product.health_benefits.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Benefits:</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.health_benefits.slice(0, 3).map((benefit, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {product.key_ingredients && product.key_ingredients.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Ingredients:</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.key_ingredients.slice(0, 2).map((ingredient, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-primary-foreground/50 text-lg">
              No products found. Make sure to run the SQL schema in your Supabase dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
