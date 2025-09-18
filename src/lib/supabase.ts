import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Product {
  id: string
  name: string | null
  description: string | null
  detailed_info: string | null
  quantity: number | null
  product_ml: number | null
  product_weight: number | null
  price: number | null
  images: string[] | null
  lifestyle_problems: string[] | null
  is_featured: boolean | null
  created_at: string | null
  category: string | null
  age_group: string | null
  key_ingredients: string[] | null
  benefits: string[] | null
  usage_instructions: string[] | null
  status: string | null
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  author: string
  published_at: string
  category: string
  tags?: string[]
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
  lifestyle_problem?: string
  search?: string
  is_featured?: boolean
}) => {
  let query = supabase.from('products_01').select('*')

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }

  if (filters?.age_group) {
    query = query.eq('age_group', filters.age_group)
  }

  if (filters?.lifestyle_problem) {
    query = query.contains('lifestyle_problems', [filters.lifestyle_problem])
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  if (filters?.is_featured !== undefined) {
    query = query.eq('is_featured', filters.is_featured)
  }

  // Only show active products
  query = query.eq('status', 'Active')

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products_01')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }
  return data as Product
}

export const getBlogPosts = async (limit?: number) => {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
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
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
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