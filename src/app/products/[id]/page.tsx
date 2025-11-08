'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Product, getProduct } from '@/lib/supabase';

function getValidImageUrl(imageUrl: string | undefined): string | null {
  if (!imageUrl) return null;

  const cleanUrl = imageUrl.trim();

  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    return cleanUrl;
  }

  if (cleanUrl.startsWith('/')) {
    return cleanUrl;
  }

  if (
    cleanUrl.includes('supabase') ||
    cleanUrl.includes('storage') ||
    cleanUrl.includes('images')
  ) {
    return cleanUrl;
  }

  return cleanUrl || null;
}

const getProductById = async (id: string): Promise<Product | null> => {
  try {
    if (!id || typeof id !== 'string') {
      console.error('Invalid product ID:', id);
      return null;
    }
    return await getProduct(id);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id || typeof id !== 'string') {
          console.error('Product id param missing or invalid:', id);
          setLoading(false);
          return;
        }
        console.log('Fetching product with id:', id);
        const fetchedProduct = await getProductById(id);
        console.log('Fetched product:', fetchedProduct);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-foreground mb-4">Product Not Found</h1>
          <Link href="/products" className="text-secondary hover:text-foreground transition-colors">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-secondary">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-foreground transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            
            <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg group w-[90%] mx-auto">
              <Image
                key={`main-${selectedImage}`}
                src={
                  getValidImageUrl(product.images?.[selectedImage]) ||
                  'https://via.placeholder.com/600x800/F8F6F3/8B7355?text=Product+Image'
                }
                alt={product.name || 'Product'}
                fill
                className="object-cover"
                priority
                quality={100}
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        (prev) => (prev - 1 + product.images!.length) % product.images!.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-3 opacity-70 hover:opacity-100 transition-all duration-200 shadow-lg z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % product.images!.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-3 opacity-70 hover:opacity-100 transition-all duration-200 shadow-lg z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {product.images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-foreground' : 'border-transparent'
                    }`}
                  >
                    <Image
                      key={`thumb-${index}`}
                      src={
                        getValidImageUrl(image) ||
                        'https://via.placeholder.com/80x80/F8F6F3/8B7355?text=Img'
                      }
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      quality={100}
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            
            <div>
              {product.category && (
                <div className="text-sm text-secondary mb-2">{product.category}</div>
              )}
              <h1 className="text-3xl md:text-4xl font-light text-foreground mb-4">
                {product.name || 'Untitled Product'}
              </h1>

              <p className="text-lg text-secondary mb-4">
                {product.description || 'No description available'}
              </p>
            </div>

            
            <div className="space-y-2">
              {product.net_quantity && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-secondary w-24">Net Quantity:</span>
                  <span className="text-lg font-medium text-foreground">
                    {product.net_quantity}
                  </span>
                </div>
              )}
              {product.serving_info && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-secondary w-24">Serving Info:</span>
                  <span className="text-lg font-medium text-foreground">
                    {product.serving_info}
                  </span>
                </div>
              )}
              {/* Price section removed as requested */}
              {(product.average_rating ?? 0) > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-secondary w-24">Rating:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-medium text-foreground">
                      ★ {product.average_rating}
                    </span>
                    {(product.total_reviews ?? 0) > 0 && (
                      <span className="text-sm text-secondary">
                        ({product.total_reviews} reviews)
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            
            <div className="space-y-4">
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Learn More & Inquire
                </Link>
              </div>
            </div>

            
            <div className="border-t border-border pt-6">
              <div className="flex gap-6 mb-6">
                {['description', 'benefits', 'ingredients', 'usage'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-foreground border-b-2 border-foreground pb-2'
                        : 'text-secondary hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {activeTab === 'description' && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-secondary leading-relaxed">
                      {product.description || 'No detailed description available.'}
                    </p>
                    {product.short_description && (
                      <p className="text-secondary leading-relaxed mt-3">
                        {product.short_description}
                      </p>
                    )}
                    {product.health_conditions && product.health_conditions.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">
                          Health Conditions:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.health_conditions.map((condition: string, index: number) => (
                            <span
                              key={index}
                              className="text-xs bg-muted text-secondary px-3 py-1 rounded-full"
                            >
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {product.dosha && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Dosha:</h4>
                        <span className="text-sm text-secondary">{product.dosha}</span>
                      </div>
                    )}
                    {product.certifications && product.certifications.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">
                          Certifications:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.certifications.map((cert: string, index: number) => (
                            <span
                              key={index}
                              className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div className="space-y-3">
                    {product.health_benefits && product.health_benefits.length > 0 ? (
                      <ul className="space-y-2">
                        {product.health_benefits.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-secondary">
                            <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-secondary">No benefits information available.</p>
                    )}
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-3">
                    {product.key_ingredients && product.key_ingredients.length > 0 ? (
                      <div className="grid gap-3">
                        {product.key_ingredients.map((ingredient: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-secondary">{ingredient}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-secondary text-sm">
                        No ingredients information available.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'usage' && (
                  <div className="space-y-3">
                    {product.how_to_use ? (
                      <div className="text-secondary">{product.how_to_use}</div>
                    ) : (
                      <p className="text-secondary">No usage instructions available.</p>
                    )}
                    {product.duration && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Duration</h4>
                        <p className="text-secondary">{product.duration}</p>
                      </div>
                    )}
                    {product.precautions && (
                      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <h4 className="font-medium text-amber-800 mb-2">Precautions</h4>
                        <p className="text-amber-700">{product.precautions}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        
        {/* Similar products section removed as requested */}
      </div>
    </div>
  );
}
