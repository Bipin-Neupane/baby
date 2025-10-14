'use client'

import PricingCard from './PricingCard'
import { Baby, Heart, Crown, CheckCircle, BookOpen, Download, FileText, Star } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import toast from 'react-hot-toast'

export default function PricingSection() {
  const { addItem } = useCart()

  const ebookProducts = [
    {
      id: 'starter-ebook',
      name: 'Basic',
      tagline: 'Perfect for New Parents',
      icon: Baby,
      color: 'from-blue-400 to-blue-600',
      price: 10,
      originalPrice: 15,
      popular: false,
      pages: 85,
      formats: ['PDF', 'EPUB'],
      features: [
        { icon: BookOpen, text: 'Newborn care fundamentals', included: true },
        { icon: FileText, text: 'Feeding schedules & techniques', included: true },
        { icon: CheckCircle, text: 'Safety checklists', included: true },
        { icon: Download, text: 'Printable quick reference cards', included: true },
        { icon: Star, text: 'Sleep routine guides', included: true },
        { icon: Heart, text: 'Bonding activities', included: true },
        { icon: Crown, text: 'Advanced troubleshooting', included: false },
        { icon: FileText, text: 'Developmental milestones tracker', included: false }
      ],
      benefits: [
        '85 pages of expert pediatric advice',
        'Step-by-step feeding guides',
        'Safe sleep practices',
        'Essential baby gear recommendations',
        'Common concerns & solutions'
      ],
      buttonText: 'Add to Cart',
      description: 'Complete digital guide covering all newborn essentials.',
      // Product details for cart integration
      images: [],
      brand: 'Dcube Store',
      category: 'Digital Books'
    },
    {
      id: 'premium-ebook',
      name: 'Standard',
      tagline: 'Most Popular Choice',
      icon: Heart,
      color: 'from-pink-400 to-pink-600',
      price: 25,
      originalPrice: 35,
      popular: true,
      pages: 150,
      formats: ['PDF', 'EPUB', 'MOBI'],
      features: [
        { icon: BookOpen, text: 'Complete first-year development', included: true },
        { icon: FileText, text: 'Monthly milestone trackers', included: true },
        { icon: CheckCircle, text: 'Advanced safety protocols', included: true },
        { icon: Download, text: 'Interactive checklists & forms', included: true },
        { icon: Star, text: 'Sleep training methods', included: true },
        { icon: Heart, text: 'Bonding & attachment guides', included: true },
        { icon: Crown, text: 'Troubleshooting difficult phases', included: true },
        { icon: FileText, text: 'Health monitoring charts', included: true }
      ],
      benefits: [
        '150 pages of comprehensive guidance',
        'Month-by-month development tracking',
        'Advanced sleep training techniques',
        'Feeding transition guides (6-12 months)',
        'Early learning activities',
        'Common health concerns guide'
      ],
      buttonText: 'Add to Cart',
      description: 'Comprehensive guide covering your baby\'s entire first year.',
      images: [],
      brand: 'Dcube Store',
      category: 'Digital Books'
    },
    {
      id: 'expert-ebook',
      name: 'Premium',
      tagline: 'Complete Digital Library',
      icon: Crown,
      color: 'from-purple-400 to-purple-600',
      price: 50,
      originalPrice: 75,
      popular: false,
      pages: 250,
      formats: ['PDF', 'EPUB', 'MOBI', 'Interactive'],
      features: [
        { icon: BookOpen, text: 'Complete 3-book collection', included: true },
        { icon: FileText, text: 'Advanced troubleshooting guides', included: true },
        { icon: CheckCircle, text: 'Emergency care protocols', included: true },
        { icon: Download, text: 'Bonus quick-reference guides', included: true },
        { icon: Star, text: 'Specialized techniques (colic, reflux)', included: true },
        { icon: Heart, text: 'Postpartum recovery guide', included: true },
        { icon: Crown, text: 'Exclusive expert interviews', included: true },
        { icon: FileText, text: 'Interactive assessment tools', included: true }
      ],
      benefits: [
        '250+ pages across 3 comprehensive books',
        'Advanced troubleshooting for complex issues',
        'Specialized care techniques',
        'Postpartum recovery & mental health',
        'Partner involvement strategies',
        'Long-term development planning',
        'Exclusive pediatrician interviews'
      ],
      buttonText: 'Add to Cart',
      description: 'Complete digital library with everything you need for confident parenting.',
      images: [],
      brand: 'Dcube Store',
      category: 'Digital Books'
    }
  ]

  const handleAddToCart = (ebook) => {
    addItem({
      id: ebook.id,
      name: ebook.name,
      price: ebook.price,
      images: ebook.images,
      brand: ebook.brand,
      category: ebook.category
    })
    toast.success(`"${ebook.name}" added to cart!`)
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"> Digital Guide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Expert-written digital guides created by certified pediatricians. 
            Instant download, lifetime access, and comprehensive baby care knowledge.
          </p>
        </div>

        {/* Ebook Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {ebookProducts.map((ebook) => (
            <PricingCard
              key={ebook.id}
              ebook={ebook}
              onAddToCart={() => handleAddToCart(ebook)}
            />
          ))}
        </div>

        {/* Satisfaction Guarantee */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-800 px-6 py-3 rounded-full border border-green-200">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">30-day satisfaction guarantee • Instant download • Lifetime access</span>
          </div>
        </div>
      </div>
    </section>
  )
}
