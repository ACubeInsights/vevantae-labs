'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Target, Eye, Heart, Calendar, ArrowRight } from 'lucide-react';
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
    image: 'https://via.placeholder.com/300x300/F8F6F3/8B7355?text=Dr.+Priya',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Head of Product Development',
    bio: 'Expert in nutraceutical formulation with a passion for innovation and quality.',
    image: 'https://via.placeholder.com/300x300/F8F6F3/8B7355?text=Rajesh+K.',
  },
  {
    name: 'Dr. Anita Patel',
    role: 'Director of Research',
    bio: 'Biochemist specializing in the intersection of traditional and modern medicine.',
    image: 'https://via.placeholder.com/300x300/F8F6F3/8B7355?text=Dr.+Anita',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

export default function AboutPage() {
  usePageTracking({
    pageName: 'About'
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111]">

      <main>
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#8B7355] via-transparent to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[#8B7355] uppercase tracking-[0.2em] text-sm font-medium mb-4 block">
                  Our Essence
                </span>
                <h1 className="text-5xl md:text-7xl font-light text-[#111111] leading-[1.1] tracking-tight mb-6">
                  Rooted in Nature.<br />
                  Backed by Science.
                </h1>
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-[#666666] max-w-2xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Bridging ancient wisdom with modern science to create transformative wellness
                solutions that honor tradition while embracing innovation.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Ancient Wisdom - Luxury Card Layout */}
        <section className="py-20 lg:py-32 bg-[#F5F5F0]">
          <div className="container mx-auto px-6">
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                className="lg:col-span-5 lg:pr-12 relative z-10"
                {...fadeInUp}
              >
                <div className="w-16 h-[1px] bg-[#8B7355] mb-8" />
                <h2 className="text-4xl md:text-5xl font-light text-[#111111] mb-8 leading-tight">
                  Ancient Wisdom,<br />
                  <span className="italic text-[#8B7355]">Modern Science</span>
                </h2>
                <div className="space-y-6 text-lg text-[#444444] leading-relaxed font-light">
                  <p>
                    Vevantae Labs was born from a simple belief: that the wisdom of ancient traditions
                    can be harmoniously combined with modern science to create products that truly
                    enhance human wellness.
                  </p>
                  <p>
                    Founded in 2018, we&#39;ve dedicated ourselves to researching, developing, and
                    crafting premium ayurvedic and nutraceutical products that honor traditional
                    knowledge while meeting contemporary quality standards.
                  </p>
                </div>
                <div className="mt-10">
                  <div className="inline-flex items-center gap-2 text-[#8B7355] uppercase tracking-wider text-sm font-medium border-b border-[#8B7355] pb-1">
                    Est. 2018
                  </div>
                </div>
              </motion.div>

              {/* Image Content */}
              <motion.div
                className="lg:col-span-7 relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-sm shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?q=80&w=1740&auto=format&fit=crop"
                    alt="Laboratory and Herbs"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                {/* Decorative floating element */}
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#E8E6E0] -z-10 rounded-full opacity-50 blur-2xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision - Split Layout */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <motion.div
                className="space-y-6"
                {...fadeInUp}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-[#FAF9F6] rounded-full">
                    <Target className="w-6 h-6 text-[#8B7355]" />
                  </div>
                  <h2 className="text-3xl font-light text-[#111111]">Our Mission</h2>
                </div>
                <p className="text-xl text-[#666666] leading-relaxed font-light pl-2 border-l-2 border-[#E8E6E0]">
                  To make authentic, high-quality wellness products accessible to everyone,
                  combining the best of traditional knowledge with modern scientific validation to
                  support holistic health and well-being.
                </p>
              </motion.div>

              <motion.div
                className="space-y-6"
                {...fadeInUp}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-[#FAF9F6] rounded-full">
                    <Eye className="w-6 h-6 text-[#8B7355]" />
                  </div>
                  <h2 className="text-3xl font-light text-[#111111]">Our Vision</h2>
                </div>
                <p className="text-xl text-[#666666] leading-relaxed font-light pl-2 border-l-2 border-[#E8E6E0]">
                  To be the global leader in integrative wellness solutions, creating a world where
                  traditional wisdom and modern science work together to enhance human health and
                  promote sustainable well-being.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values - Grid */}
        <section className="py-24 bg-[#FAF9F6]">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              {...fadeInUp}
            >
              <h2 className="text-4xl font-light text-[#111111] mb-4">Our Values</h2>
              <p className="text-[#666666] max-w-2xl mx-auto text-lg">
                The principles that guide everything we do
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="bg-white p-10 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#E8E6E0]/50"
                >
                  <value.icon className="w-10 h-10 text-[#8B7355] mb-6" />
                  <h3 className="text-xl font-medium text-[#111111] mb-3">{value.title}</h3>
                  <p className="text-[#666666] leading-relaxed font-light">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Journey - Timeline */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-20"
              {...fadeInUp}
            >
              <h2 className="text-4xl font-light text-[#111111] mb-4">Our Journey</h2>
              <p className="text-[#666666] max-w-2xl mx-auto text-lg">
                Key milestones in our mission to transform wellness
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-8 border-l border-[#E8E6E0] space-y-2"
                  >
                    <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-[#8B7355] rounded-full" />
                    <span className="text-4xl font-light text-[#E8E6E0] absolute -top-4 right-0 select-none">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-medium text-[#111111] pt-1 relative z-10">{item.title}</h3>
                    <p className="text-[#666666] text-sm leading-relaxed relative z-10">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Founder's Story - Personal Letter Style with Abstract Background */}
        <section className="relative py-24 bg-[#FAF9F6] overflow-hidden">
          {/* Abstract Background */}
          <div className="absolute inset-0 z-0 opacity-40">
            <Image
              src="/images/founder-bg-ayurveda.png"
              alt="Ayurvedic botanical background"
              fill
              className="object-cover"
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto bg-white p-12 md:p-16 shadow-xl shadow-[#8B7355]/5 relative">
              {/* Decorative Quote Mark */}
              <div className="absolute top-12 left-12 text-[#F5F5F0] text-9xl font-serif leading-none select-none -z-0">
                &ldquo;
              </div>

              <motion.div
                className="relative z-10 space-y-10"
                {...fadeInUp}
              >
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-light text-[#111111]">
                    The Story Behind Vevantae Labs
                  </h2>
                  <p className="text-[#8B7355] uppercase tracking-widest text-xs font-medium">
                    From the Founder
                  </p>
                </div>

                <div className="prose prose-lg mx-auto text-[#444444] leading-relaxed font-light">
                  <p className="text-xl text-[#111111] font-normal">
                    Every brand begins with an idea.<br />
                    Vevantae Labs began with a frustration.
                  </p>

                  <p>
                    For years, I watched the nutraceutical and Ayurvedic space grow fast—sometimes too fast. Shelves were filling with products that looked impressive but didn’t deliver results you could feel. Labels were clever, marketing was loud, but integrity in formulation was missing. And once you’ve seen that gap clearly, it’s impossible to unsee it.
                  </p>

                  <p>
                    I grew up around the pharmaceutical ecosystem. Conversations about quality, consistency, shortages, and trust were normal at home. It shaped how I look at healthcare even today. I learned early that people don’t ask for much—they ask for products that work and a company that respects their trust.
                  </p>

                  <p className="font-medium text-[#111111]">
                    That became the seed of Vevantae Labs.
                  </p>

                  <p>
                    When I decided to build this brand, I didn’t want to create another “flavour-of-the-season” wellness label. I wanted to build something that treats well-being seriously—something rooted in science, backed by Ayurveda, and driven by a simple non-negotiable: integrity first.
                  </p>

                  <blockquote className="border-l-2 border-[#8B7355] pl-6 py-2 my-8 not-italic">
                    <p className="text-xl text-[#111111] font-light mb-2">
                      &ldquo;Would I give this to my own family?&rdquo;
                    </p>
                    <p className="text-base text-[#666666]">
                      If the answer is no, the product doesn’t move forward.
                      No shortcuts, no inflated claims, no half-hearted dosing.
                    </p>
                  </blockquote>

                  <p>
                    Vevantae isn’t here to impress; it’s here to impact.
                  </p>

                  <p>
                    We create products with clean intentions, transparent ingredient lists, and a commitment to quality that doesn’t bend for costs or convenience. From men’s health to maternity, from liver wellness to hair care, the goal stays the same—make wellness that actually works.
                  </p>
                </div>

                <div className="pt-8 border-t border-[#F5F5F0] text-center">
                  <div className="font-handwriting text-3xl text-[#111111] mb-2 font-light italic">
                    Founder
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#8B7355]">
                    Vevantae Labs
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team - Minimal Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              {...fadeInUp}
            >
              <h2 className="text-4xl font-light text-[#111111] mb-4">Meet Our Team</h2>
              <p className="text-[#666666] max-w-2xl mx-auto text-lg">
                The experts behind our innovative wellness solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group text-center space-y-6"
                >
                  <div className="relative aspect-[3/4] bg-[#E8E6E0] overflow-hidden mx-auto max-w-[280px] rounded-sm">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 280px, 300px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-[#111111]">{member.name}</h3>
                    <p className="text-xs text-[#8B7355] uppercase tracking-widest">{member.role}</p>
                    <p className="text-[#666666] text-sm leading-relaxed max-w-xs mx-auto">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Dark Mode */}
        <section className="py-24 bg-[#111111] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center space-y-10"
              {...fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-light leading-tight">
                Begin Your Journey to<br />
                <span className="italic text-[#8B7355]">Holistic Wellness</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed font-light">
                Discover how our products can support your path to better health, naturally.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/products"
                  className="group px-10 py-4 bg-white text-black text-sm font-medium hover:bg-[#F5F5F0] transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="px-10 py-4 border border-white/30 text-white text-sm font-medium hover:bg-white hover:text-black transition-all uppercase tracking-widest"
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
