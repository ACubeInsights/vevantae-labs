'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Brain, 
  Shield, 
  Leaf, 
  Zap, 
  Moon, 
  Sun, 
  Droplets,
  CheckCircle
} from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const benefits = [
  {
    icon: Heart,
    title: 'Cardiovascular Health',
    description: 'Support heart health with natural compounds that promote healthy circulation and blood pressure.',
    details: [
      'Improved blood circulation',
      'Healthy cholesterol levels',
      'Enhanced cardiovascular endurance',
      'Natural blood pressure support'
    ]
  },
  {
    icon: Brain,
    title: 'Cognitive Function',
    description: 'Enhance mental clarity, focus, and memory with time-tested nootropic herbs.',
    details: [
      'Enhanced memory and recall',
      'Improved focus and concentration',
      'Mental clarity and alertness',
      'Stress-related cognitive support'
    ]
  },
  {
    icon: Shield,
    title: 'Immune Support',
    description: 'Strengthen your body\'s natural defenses with powerful adaptogenic compounds.',
    details: [
      'Enhanced immune response',
      'Antioxidant protection',
      'Seasonal wellness support',
      'Natural detoxification'
    ]
  },
  {
    icon: Zap,
    title: 'Energy & Vitality',
    description: 'Boost natural energy levels without the crash of synthetic stimulants.',
    details: [
      'Sustained energy throughout the day',
      'Reduced fatigue and tiredness',
      'Enhanced physical performance',
      'Natural metabolic support'
    ]
  },
  {
    icon: Moon,
    title: 'Sleep & Recovery',
    description: 'Promote restful sleep and optimal recovery with calming botanical extracts.',
    details: [
      'Improved sleep quality',
      'Faster recovery times',
      'Reduced stress and anxiety',
      'Natural relaxation support'
    ]
  },
  {
    icon: Droplets,
    title: 'Skin & Beauty',
    description: 'Nourish your skin from within with collagen-supporting nutrients and antioxidants.',
    details: [
      'Healthy, glowing skin',
      'Reduced signs of aging',
      'Enhanced skin elasticity',
      'Natural UV protection'
    ]
  }
]

const ayurvedicPrinciples = [
  {
    title: 'Holistic Approach',
    description: 'Ayurveda treats the whole person, not just symptoms, addressing root causes for lasting wellness.',
    icon: Leaf
  },
  {
    title: 'Natural Ingredients',
    description: 'Using pure, natural herbs and compounds that work in harmony with your body\'s systems.',
    icon: Sun
  },
  {
    title: 'Personalized Wellness',
    description: 'Understanding that each person is unique, with individual needs and constitution.',
    icon: Heart
  },
  {
    title: 'Time-Tested Wisdom',
    description: 'Drawing from 5,000+ years of documented use and traditional knowledge.',
    icon: Shield
  }
]

const comparisonData = [
  {
    aspect: 'Approach',
    synthetic: 'Targets specific symptoms',
    natural: 'Addresses root causes holistically'
  },
  {
    aspect: 'Side Effects',
    synthetic: 'Often has unwanted side effects',
    natural: 'Minimal to no side effects when used properly'
  },
  {
    aspect: 'Long-term Use',
    synthetic: 'May cause dependency or tolerance',
    natural: 'Safe for long-term use and maintenance'
  },
  {
    aspect: 'Body Harmony',
    synthetic: 'May disrupt natural processes',
    natural: 'Works with body\'s natural systems'
  },
  {
    aspect: 'Sustainability',
    synthetic: 'Often environmentally harmful',
    natural: 'Eco-friendly and sustainable'
  }
]

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.h1 
                className="text-4xl md:text-6xl font-light text-[#111111] leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                The Benefits of Natural Wellness
              </motion.h1>
              
              <motion.p 
                className="text-lg text-[#666666] max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Discover how ancient wisdom and modern science combine to support 
                your journey toward optimal health and vitality.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-light text-[#111111] mb-4">
                Comprehensive Wellness Support
              </h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Our products target multiple aspects of health for complete well-being
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-sm group hover:shadow-lg transition-shadow duration-300"
                >
                  <benefit.icon className="w-12 h-12 text-[#8B7355] mb-6" />
                  <h3 className="text-xl font-medium text-[#111111] mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-[#666666] leading-relaxed mb-6">
                    {benefit.description}
                  </p>
                  <ul className="space-y-2">
                    {benefit.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-sm text-[#666666]">
                        <CheckCircle className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ayurvedic Principles */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-light text-[#111111]">
                    Rooted in Ancient Wisdom
                  </h2>
                  <p className="text-lg text-[#666666] leading-relaxed">
                    Our approach is grounded in Ayurvedic principles that have guided 
                    wellness practices for thousands of years, validated by modern research.
                  </p>
                </div>

                <div className="space-y-6">
                  {ayurvedicPrinciples.map((principle, index) => (
                    <motion.div
                      key={principle.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4"
                    >
                      <principle.icon className="w-8 h-8 text-[#8B7355] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-medium text-[#111111] mb-2">
                          {principle.title}
                        </h3>
                        <p className="text-[#666666] leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[4/5] bg-[#8B7355] rounded-sm overflow-hidden">
                  <Image
                    src="https://via.placeholder.com/500x600/F8F6F3/8B7355?text=Benefits+Image"
                    alt="Ayurvedic herbs and ingredients"
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Natural vs Synthetic Comparison */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-light text-[#111111] mb-4">
                Natural vs Synthetic
              </h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Understanding the difference between natural and synthetic approaches to wellness
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-sm overflow-hidden">
                <div className="grid grid-cols-3 bg-[#111111] text-white">
                  <div className="p-6">
                    <h3 className="text-lg font-medium">Aspect</h3>
                  </div>
                  <div className="p-6 border-l border-gray-600">
                    <h3 className="text-lg font-medium">Synthetic</h3>
                  </div>
                  <div className="p-6 border-l border-gray-600">
                    <h3 className="text-lg font-medium text-[#8B7355]">Natural</h3>
                  </div>
                </div>
                
                {comparisonData.map((item, index) => (
                  <motion.div
                    key={item.aspect}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-[#FAF9F6]' : 'bg-white'}`}
                  >
                    <div className="p-6">
                      <p className="font-medium text-[#111111]">{item.aspect}</p>
                    </div>
                    <div className="p-6 border-l border-gray-200">
                      <p className="text-[#666666]">{item.synthetic}</p>
                    </div>
                    <div className="p-6 border-l border-gray-200">
                      <p className="text-[#111111] font-medium">{item.natural}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scientific Backing */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[4/5] bg-[#E8E6E0] rounded-sm overflow-hidden">
                  <Image
                    src="https://via.placeholder.com/500x600/F8F6F3/8B7355?text=Research+Image"
                    alt="Scientific research and testing"
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-light text-[#111111]">
                    Backed by Science
                  </h2>
                  <p className="text-lg text-[#666666] leading-relaxed">
                    Every ingredient in our formulations is supported by extensive research 
                    and clinical studies, ensuring both safety and efficacy.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#8B7355] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">500+</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#111111] mb-2">
                        Published Studies
                      </h3>
                      <p className="text-[#666666]">
                        Our ingredients are backed by hundreds of peer-reviewed research papers
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#8B7355] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">25+</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#111111] mb-2">
                        Clinical Trials
                      </h3>
                      <p className="text-[#666666]">
                        Rigorous testing ensures safety and validates traditional uses
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#8B7355] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">5K+</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#111111] mb-2">
                        Years of Tradition
                      </h3>
                      <p className="text-[#666666]">
                        Drawing from millennia of documented traditional use and wisdom
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#111111] text-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center space-y-8"
            >
              <h2 className="text-3xl lg:text-4xl font-light">
                Experience the Benefits
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Start your journey toward optimal wellness with our scientifically-backed, 
                naturally-derived formulations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="px-8 py-3 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors uppercase tracking-wider"
                >
                  Shop Products
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-colors uppercase tracking-wider"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}