'use client';

import { useState } from 'react';

// Force dynamic rendering to avoid build-time issues
export const dynamic = 'force-dynamic';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { usePageTracking } from '@/hooks/usePageTracking';

interface FormData {
  name: string;
  email: string;
  company: string;
  inquiryType: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { trackFormSubmission } = usePageTracking({
    pageName: 'Contact'
  });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    inquiryType: 'general',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    trackFormSubmission('Contact', {
      inquiry_type: formData.inquiryType,
      has_company: formData.company ? 'yes' : 'no'
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        inquiryType: 'general',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'B2B Partnerships',
      details: 'partnerships@vevantaelabs.com',
      description: 'For bulk orders and business inquiries',
    },
    {
      icon: Phone,
      title: 'Business Line',
      details: '+91 96713 00080',
      description: 'Mon-Fri from 9am to 6pm IST',
    },
    {
      icon: MapPin,
      title: 'Corporate Office',
      details: 'India - Research &amp; Development Center',
      description: 'Our headquarters and manufacturing facility',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday: 9:00 AM - 6:00 PM IST',
      description: 'Dedicated support for business clients',
    },
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'b2b', label: 'B2B Partnership' },
    { value: 'bulk', label: 'Bulk Orders (500+ units)' },
    { value: 'private-label', label: 'Private Label Manufacturing' },
    { value: 'distribution', label: 'Distribution Partnership' },
    { value: 'research', label: 'Research Collaboration' },
  ];

  const faqs = [
    {
      question: 'What is the minimum order quantity for bulk purchases?',
      answer:
        'Our bulk order program starts at 500 units per product. We offer tiered pricing with better rates for larger volumes (1000+, 5000+, 10000+ units).',
    },
    {
      question: 'Do you offer private label manufacturing?',
      answer:
        'Yes, we provide comprehensive private label services including custom formulations, packaging design, and regulatory compliance support for businesses looking to launch their own wellness product lines.',
    },
    {
      question: 'What certifications do your manufacturing facilities have?',
      answer:
        'Our facilities are GMP certified, ISO 22000 compliant, and follow FSSAI guidelines. We maintain the highest quality standards for all B2B partnerships.',
    },
    {
      question: 'How long does it take to fulfill bulk orders?',
      answer:
        'Standard bulk orders (500-2000 units) typically take 2-3 weeks. Larger orders or custom formulations may require 4-6 weeks. We provide detailed timelines during the quotation process.',
    },
    {
      question: 'Do you offer distribution partnerships?',
      answer:
        'Yes, we work with qualified distributors globally. We provide marketing support, training materials, and competitive wholesale pricing for our distribution partners.',
    },
    {
      question: 'Can you develop custom formulations for our brand?',
      answer:
        'Absolutely. Our R&D team can develop custom ayurvedic and nutraceutical formulations based on your specifications, target market, and regulatory requirements.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <main>
        
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.h1
                className="text-4xl md:text-6xl font-light text-[#111111] leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Partner With Us
              </motion.h1>

              <motion.p
                className="text-lg text-[#666666] max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to explore B2B partnerships, bulk orders, or custom wellness solutions?
                Let's discuss how we can support your business needs.
              </motion.p>
            </div>
          </div>
        </section>

      
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-3xl font-light text-[#111111] mb-8">Business Inquiry Form</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-light text-[#111111] mb-2">Thank You!</h3>
                    <p className="text-[#666666]">
                      Your message has been sent successfully. We&#39;ll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[#111111] mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent transition-all"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[#111111] mb-2"
                        >
                          Business Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent transition-all"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-[#111111] mb-2"
                        >
                          Company Name *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent transition-all"
                          placeholder="Your company name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="inquiryType"
                          className="block text-sm font-medium text-[#111111] mb-2"
                        >
                          Inquiry Type *
                        </label>
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent transition-all"
                        >
                          {inquiryTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-[#111111] mb-2"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent transition-all"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[#111111] mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent transition-all resize-none"
                        placeholder="Please provide details about your business needs, expected volumes, timeline, and any specific requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#111111] text-white py-4 px-6 rounded-lg hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-light text-[#111111] mb-8">Contact Information</h2>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-[#111111] rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-[#111111] mb-1">{info.title}</h3>
                          <p className="text-[#111111] font-medium mb-1">{info.details}</p>
                          <p className="text-sm text-[#666666]">{info.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-[#111111] mb-6">B2B Partnership FAQs</h2>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              Common questions about bulk orders, partnerships, and custom manufacturing services.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#FAF9F6] rounded-xl p-6"
              >
                <h3 className="text-lg font-medium text-[#111111] mb-3">{faq.question}</h3>
                <p className="text-[#666666] leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light text-[#111111] mb-6">Manufacturing Facility</h2>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              Visit our state-of-the-art manufacturing and R&D facility to see our quality processes
              and discuss partnership opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[#666666] mx-auto mb-4" />
              <p className="text-lg text-[#666666]">Interactive Map Coming Soon</p>
              <p className="text-sm text-[#999999] mt-2">
                India - Research &amp; Development Center
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      </main>
    </div>
  );
}
