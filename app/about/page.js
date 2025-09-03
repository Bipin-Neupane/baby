import Image from 'next/image'
import { Heart, Shield, Users, Award, Baby, Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  BabyBloom
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're passionate parents on a mission to provide the safest, highest-quality 
                baby products for your precious little ones. Every product is carefully 
                selected with love, tested for safety, and designed to grow with your family.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Made with Love</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Safety Certified</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full filter blur-3xl opacity-30"></div>
              <div className="relative z-10 rounded-2xl shadow-2xl overflow-hidden aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=600&fit=crop&crop=center&auto=format"
                  alt="Happy family with baby"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              BabyBloom was born from a simple belief: every child deserves the very best start in life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">How It All Began</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2020 by parents Sarah and Michael Chen, BabyBloom started when they 
                couldn't find baby products that met their high standards for safety, quality, 
                and design. As new parents, they spent countless hours researching products, 
                reading safety reports, and testing items for their own daughter, Emma.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                What began as a quest to find the perfect products for Emma evolved into a 
                mission to help other parents make informed choices. Today, BabyBloom serves 
                thousands of families worldwide, each product carefully curated with the same 
                love and attention we'd give our own children.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that parenting is one of life's greatest adventures, and we're here 
                to support you every step of the way with products you can trust.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=500&h=500&fit=crop&crop=center&auto=format"
                  alt="Founder story"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-lg text-gray-600">
              Everything we do is guided by our core values and commitment to your family's wellbeing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety First</h3>
              <p className="text-gray-600 leading-relaxed">
                Every product undergoes rigorous safety testing and meets or exceeds all applicable 
                safety standards. Your child's safety is our top priority.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Made with Love</h3>
              <p className="text-gray-600 leading-relaxed">
                We're parents too, and we choose every product with the same care and love we'd 
                use for our own children. Quality isn't just a standard—it's personal.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainable Future</h3>
              <p className="text-gray-600 leading-relaxed">
                We're committed to eco-friendly practices and sustainable materials, creating 
                a better world for the next generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-pink-100">Happy Families</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-pink-100">Premium Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.8%</div>
              <div className="text-pink-100">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4 Years</div>
              <div className="text-pink-100">Of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose BabyBloom?</h2>
            <p className="text-lg text-gray-600">
              We go above and beyond to ensure every shopping experience exceeds your expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <Baby className="w-12 h-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Curation</h3>
              <p className="text-gray-600">
                Our team of parents and child development experts carefully selects every product 
                based on safety, quality, and developmental benefits.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <Award className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Award-Winning Service</h3>
              <p className="text-gray-600">
                Recognized for outstanding customer service, we're here to support you with 
                personalized recommendations and expert advice.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Parent Community</h3>
              <p className="text-gray-600">
                Join our growing community of parents sharing tips, reviews, and experiences 
                to help each other navigate parenthood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              The passionate parents and experts behind BabyBloom's success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616c31fd9db?w=200&h=200&fit=crop&crop=face&auto=format"
                  alt="Sarah Chen"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Sarah Chen</h3>
              <p className="text-pink-600 mb-2">Co-Founder & CEO</p>
              <p className="text-sm text-gray-600">
                Mom of two, former pediatric nurse, and passionate advocate for child safety and development.
              </p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&auto=format"
                  alt="Michael Chen"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Michael Chen</h3>
              <p className="text-purple-600 mb-2">Co-Founder & CTO</p>
              <p className="text-sm text-gray-600">
                Father, tech innovator, and safety engineering expert ensuring our platform meets the highest standards.
              </p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&auto=format"
                  alt="Dr. Emily Rodriguez"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Dr. Emily Rodriguez</h3>
              <p className="text-blue-600 mb-2">Chief Product Officer</p>
              <p className="text-sm text-gray-600">
                Pediatrician and mother of three, leading our product curation with medical expertise and parental insight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Connect</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions, suggestions, or just want to share your parenting journey? 
            We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-primary inline-block"
            >
              Get in Touch
            </a>
            <a
              href="/products"
              className="btn-secondary inline-block"
            >
              Shop Our Products
            </a>
          </div>
          
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <span>📧</span>
              <span>hello@babybloom.com</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>📞</span>
              <span>1-800-BABY-BLOOM</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>💬</span>
              <span>Live Chat Available</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}