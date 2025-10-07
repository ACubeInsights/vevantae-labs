'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Target, Eye, Heart, Calendar } from 'lucide-react';
import { usePageTracking } from '@/hooks/usePageTracking';

const values = [
  {
    icon: Heart,
    title: 'Holistic Wellness',
    description:
      'We believe in treating the whole person, not just symptoms, through comprehensive wellness solutions.',
  },
  {
    icon: Users,
    title: 'Community First',
    description:
      'Our customers are at the heart of everything we do, and we build lasting relationships based on trust.',
  },
  {
    icon: Target,
    title: 'Quality Excellence',
    description:
      'We maintain the highest standards in sourcing, manufacturing, and testing of all our products.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'We believe in complete transparency about our ingredients, processes, and business practices.',
  },
];

const timeline = [
  {
    year: '2018',
    title: 'Foundation',
    description:
      'Vevantae Labs was founded with a vision to bridge ancient wisdom and modern science.',
  },
  {
    year: '2019',
    title: 'First Products',
    description:
      'Launched our first line of premium ayurvedic formulations after extensive research.',
  },
  {
    year: '2020',
    title: 'Expansion',
    description:
      'Expanded into nutraceuticals and established partnerships with leading research institutions.',
  },
  {
    year: '2021',
    title: 'Recognition',
    description: 'Received industry recognition for innovation in traditional wellness products.',
  },
  {
    year: '2022',
    title: 'Global Reach',
    description:
      'Expanded our reach to serve customers worldwide while maintaining quality standards.',
  },
  {
    year: '2023',
    title: 'Innovation',
    description:
      'Launched advanced formulations combining cutting-edge research with traditional knowledge.',
  },
];

const team = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Chief Scientific Officer',
    bio: 'Leading ayurvedic researcher with 15+ years of experience in traditional medicine.',
    image: 'https://via.placeholder.com/300x300/F8F6F3/8B7355?text=Team+Member',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Head of Product Development',
    bio: 'Expert in nutraceutical formulation with a passion for innovation and quality.',
    image: 'https://via.placeholder.com/300x300/F8F6F3/8B7355?text=Team+Member',
  },
  {
    name: 'Dr. Anita Patel',
    role: 'Director of Research',
    bio: 'Biochemist specializing in the intersection of traditional and modern medicine.',
    image: 'https://via.placeholder.com/300x300/F8F6F3/8B7355?text=Team+Member',
  },
];

export default function AboutPage() {
  usePageTracking({
    pageName: 'About'
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6]">

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
                Our Story
              </motion.h1>

              <motion.p
                className="text-lg text-[#666666] max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Bridging ancient wisdom with modern science to create transformative wellness
                solutions that honor tradition while embracing innovation.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Story Content */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-light text-[#111111] mb-6">
                  Ancient Wisdom, Modern Science
                </h2>
                <p className="text-lg text-[#666666] leading-relaxed">
                  Vevantae Labs was born from a simple belief: that the wisdom of ancient traditions
                  can be harmoniously combined with modern science to create products that truly
                  enhance human wellness.
                </p>
                <p className="text-lg text-[#666666] leading-relaxed">
                  Founded in 2018, we&#39;ve dedicated ourselves to researching, developing, and
                  crafting premium ayurvedic and nutraceutical products that honor traditional
                  knowledge while meeting contemporary quality standards.
                </p>
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
                    src="https://via.placeholder.com/500x600/F8F6F3/8B7355?text=About+Story"
                    alt="Our laboratory"
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

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-[#8B7355]" />
                  <h2 className="text-3xl font-light text-[#111111]">Our Mission</h2>
                </div>
                <p className="text-lg text-[#666666] leading-relaxed">
                  To make authentic, high-quality wellness products accessible to everyone,
                  combining the best of traditional knowledge with modern scientific validation to
                  support holistic health and well-being.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-8 h-8 text-[#8B7355]" />
                  <h2 className="text-3xl font-light text-[#111111]">Our Vision</h2>
                </div>
                <p className="text-lg text-[#666666] leading-relaxed">
                  To be the global leader in integrative wellness solutions, creating a world where
                  traditional wisdom and modern science work together to enhance human health and
                  promote sustainable well-being.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-light text-[#111111] mb-4">Our Values</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-sm"
                >
                  <value.icon className="w-12 h-12 text-[#8B7355] mb-4" />
                  <h3 className="text-xl font-medium text-[#111111] mb-3">{value.title}</h3>
                  <p className="text-[#666666] leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-light text-[#111111] mb-4">Our Journey</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Key milestones in our mission to transform wellness
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-[#8B7355] rounded-full flex items-center justify-center mx-auto">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-light text-[#111111]">{item.year}</h3>
                      <h4 className="text-lg font-medium text-[#111111]">{item.title}</h4>
                      <p className="text-[#666666] text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-light text-[#111111] mb-4">Meet Our Team</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                The experts behind our innovative wellness solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center space-y-4"
                >
                  <div className="relative aspect-square bg-[#E8E6E0] rounded-sm overflow-hidden mx-auto max-w-xs">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 200px, 300px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-[#111111]">{member.name}</h3>
                    <p className="text-sm text-[#8B7355] uppercase tracking-wider">{member.role}</p>
                    <p className="text-[#666666] text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
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
              <h2 className="text-3xl lg:text-4xl font-light">Join Our Wellness Journey</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Discover how our products can support your path to holistic wellness
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="px-8 py-3 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors uppercase tracking-wider"
                >
                  Explore Products
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-colors uppercase tracking-wider"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  );
}
