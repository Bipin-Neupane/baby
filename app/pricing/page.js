import PricingSection from '@/components/pricing/PricingSection'
import { CheckCircle, Star, Users, Shield } from 'lucide-react'

export const metadata = {
  title: 'Baby Care Ebooks - Expert Guides for New Parents',
  description: 'Download comprehensive baby care ebooks written by pediatricians. Complete guides covering feeding, sleep, development, and safety for every stage.',
  keywords: 'baby care ebooks, parenting guides, digital baby books, infant care pdf, newborn care guide',
}

export default function PricingPage() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Expert-Written Content",
      description: "All guides are written and reviewed by certified pediatricians and child development specialists."
    },
    {
      icon: Star,
      title: "Instant Access",
      description: "Download immediately after purchase and access your guides anytime, anywhere."
    },
    {
      icon: Users,
      title: "Lifetime Ownership",
      description: "Once purchased, these digital guides are yours forever. No recurring fees or subscriptions."
    },
    {
      icon: Shield,
      title: "Satisfaction Guaranteed",
      description: "30-day money-back guarantee if you're not completely satisfied with your purchase."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "First-time Mom",
      quote: "The Complete Baby Development Guide was exactly what I needed. So comprehensive and easy to follow!"
    },
    {
      name: "Michael Chen",
      role: "Father of Two",
      quote: "The Ultimate Parenting Collection saved us so much time and stress. Having all this knowledge in one place is incredible."
    },
    {
      name: "Emily Rodriguez",
      role: "Pediatric Nurse & Mom",
      quote: "Even as a healthcare professional, I found these ebooks incredibly valuable. The format makes it easy to reference quickly."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Expert Baby Care <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Ebooks</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Download comprehensive digital guides written by pediatricians. Get instant access to expert baby care knowledge at your fingertips.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Instant Digital Download</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Written by Pediatricians</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Lifetime Access</span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">15K+</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">4.8★</div>
                <div className="text-sm text-gray-600">Customer Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">300+</div>
                <div className="text-sm text-gray-600">Pages of Content</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Baby Care Ebooks?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our digital guides are written by certified pediatricians and trusted by thousands of parents worldwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Parents Are Saying</h2>
            <p className="text-xl text-gray-600">
              Real stories from real parents who trust our guidance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mr-4">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">How do I download my ebook after purchase?</h3>
              <p className="text-gray-600">After completing your purchase, you'll receive an instant download link via email. You can also access your purchases from your account dashboard.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">What formats are the ebooks available in?</h3>
              <p className="text-gray-600">Our ebooks are available in PDF, EPUB, and MOBI formats to work with all devices including smartphones, tablets, e-readers, and computers.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Can I get a refund if I'm not satisfied?</h3>
              <p className="text-gray-600">Yes! We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, we'll provide a full refund.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Can I share the ebooks with my partner?</h3>
              <p className="text-gray-600">The ebooks are for personal use within your immediate household. Sharing with your partner or spouse is perfectly fine!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Get Your Expert Guides Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of confident parents who rely on our expert baby care guides for reliable, pediatrician-approved guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing" className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
              Shop Digital Guides
            </a>
            <a href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all">
              Have Questions?
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}