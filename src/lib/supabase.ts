import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Product {
  id: string
  sku: string
  slug: string | null
  name: string
  description: string | null
  short_description: string | null
  category: string
  product_type: string | null
  net_quantity: string | null
  serving_info: string | null
  mrp: number | null
  selling_price: number
  age_group: string | null
  gender: string | null
  health_benefits: string[] | null
  health_conditions: string[] | null
  key_ingredients: string[] | null
  dosha: string | null
  how_to_use: string | null
  duration: string | null
  precautions: string | null
  certifications: string[] | null
  images: string[] | null
  main_image: string | null
  meta_title: string | null
  meta_description: string | null
  tags: string[] | null
  stock_quantity: number | null
  in_stock: boolean | null
  status: string | null
  is_featured: boolean | null
  is_bestseller: boolean | null
  average_rating: number | null
  total_reviews: number | null
  created_at: string | null
  updated_at: string | null
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  meta_title: string | null
  meta_description: string | null
  featured_image: string | null
  category: string
  tags: string[]
  author: string
  status: string
  is_featured: boolean
  published_at: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  rating: number
  comment: string
  product_id?: string
  created_at: string
}

// Database query functions
export const getProducts = async (filters?: {
  category?: string
  age_group?: string
  health_benefit?: string
  health_condition?: string
  search?: string
  is_featured?: boolean
  is_bestseller?: boolean
  gender?: string
  dosha?: string
}) => {
  let query = supabase.from('products03').select('*')

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }

  if (filters?.age_group) {
    query = query.eq('age_group', filters.age_group)
  }

  if (filters?.gender) {
    query = query.eq('gender', filters.gender)
  }

  if (filters?.dosha) {
    query = query.eq('dosha', filters.dosha)
  }

  if (filters?.health_benefit) {
    query = query.contains('health_benefits', [filters.health_benefit])
  }

  if (filters?.health_condition) {
    query = query.contains('health_conditions', [filters.health_condition])
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`)
  }

  if (filters?.is_featured !== undefined) {
    query = query.eq('is_featured', filters.is_featured)
  }

  if (filters?.is_bestseller !== undefined) {
    query = query.eq('is_bestseller', filters.is_bestseller)
  }

  // Only show active products that are in stock
  // Be robust to status casing differences ('active' vs 'Active')
  query = query.in('status', ['active', 'Active']).eq('in_stock', true)

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error?.message || error, error)
    return []
  }

  return data || []
}

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products03')
    .select('*')
    .eq('id', id)
    .in('status', ['active', 'Active'])
    .single()

  if (error) {
    console.error('Error fetching product:', error?.message || error, error)
    return null
  }

  return data
}

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('products03')
    .select('*')
    .eq('slug', slug)
    .in('status', ['active', 'Active'])
    .single()

  if (error) {
    console.error('Error fetching product by slug:', error?.message || error, error)
    return null
  }

  return data
}

export const getBlogPosts = async (limit?: number) => {
  let query = supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query
  
  if (error) throw error
  return data as BlogPost[]
}

export const getBlogPost = async (slug: string) => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  
  if (error) throw error
  return data as BlogPost
}

export const getTestimonials = async (limit?: number) => {
  let query = supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query
  
  if (error) throw error
  return data as Testimonial[]
}

export const submitContactForm = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([formData])
  
  if (error) throw error
  return data
}