'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

const faqCategories = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 3-5 business days within the US. Express shipping (2-3 days) and Next Day delivery are also available. International shipping typically takes 7-14 business days.'
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! We offer free standard shipping on all orders over $50 within the United States. No promo code needed - the discount is automatically applied at checkout.'
      },
      {
        q: 'Can I track my order?',
        a: 'Absolutely! Once your order ships, you\'ll receive an email with tracking information. You can also track your order by logging into your account and viewing your order history.'
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. Note that international customers are responsible for any customs duties and taxes.'
      },
      {
        q: 'Can I change or cancel my order?',
        a: 'You can modify or cancel your order within 1 hour of placing it. After that, the order enters our fulfillment process and cannot be changed. Please contact customer service immediately if you need assistance.'
      }
    ]
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day satisfaction guarantee. Most items can be returned within 30 days of delivery for a full refund or exchange, as long as they\'re unused and in original packaging with tags attached.'
      },
      {
        q: 'How do I return an item?',
        a: 'Log into your account, go to "My Orders," and select the item you want to return. We\'ll email you a prepaid shipping label. Pack the item securely and drop it off at any authorized shipping location.'
      },
      {
        q: 'Are there items that cannot be returned?',
        a: 'For hygiene reasons, opened feeding bottles, pacifiers, and breast pumps cannot be returned unless defective. Personalized items, final sale items, and gift cards are also non-returnable.'
      },
      {
        q: 'How long do refunds take?',
        a: 'Once we receive your return, refunds are processed within 5-7 business days for credit cards, 3-5 days for PayPal, and immediately for store credit.'
      }
    ]
  },
  {
    category: 'Products & Safety',
    questions: [
      {
        q: 'Are your products safe for babies?',
        a: 'Absolutely! All our products meet or exceed safety standards set by the CPSC (Consumer Product Safety Commission). We only work with certified manufacturers and conduct regular quality checks.'
      },
      {
        q: 'Are your products organic?',
        a: 'Many of our clothing and textile products are made from certified organic materials. Look for the "Organic" label on product pages. We also offer a dedicated organic collection.'
      },
      {
        q: 'What age ranges do you cater to?',
        a: 'We offer products for newborns through toddlers (0-4 years). Each product page clearly indicates the recommended age range and sizing information.'
      },
      {
        q: 'How do I choose the right size?',
        a: 'Each product page includes a detailed size chart. We recommend measuring your baby and comparing to our charts. When in doubt, size up - babies grow quickly!'
      },
      {
        q: 'Do you test products for harmful chemicals?',
        a: 'Yes, all products are tested for harmful chemicals and meet strict safety standards. We ensure products are free from lead, phthalates, BPA, and other harmful substances.'
      }
    ]
  },
  {
    category: 'Account & Payment',
    questions: [
      {
        q: 'Do I need an account to place an order?',
        a: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, view order history, and create wishlists.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Dcube Store gift cards.'
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes! We use industry-standard SSL encryption and are PCI compliant. Your payment information is encrypted and never stored on our servers.'
      },
      {
        q: 'Can I save multiple addresses?',
        a: 'Yes, account holders can save multiple shipping and billing addresses for faster checkout. You can manage your addresses in your account settings.'
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes, we partner with Afterpay and Klarna to offer interest-free payment plans on orders over $100. You can split your purchase into 4 equal payments.'
      }
    ]
  },
  {
    category: 'Promotions & Rewards',
    questions: [
      {
        q: 'How do I use a promo code?',
        a: 'Enter your promo code in the "Discount Code" field at checkout and click "Apply." The discount will be reflected in your order total. Note that only one promo code can be used per order.'
      },
      {
        q: 'Do you have a rewards program?',
        a: 'Yes! Our Dcube Store Rewards program lets you earn points on every purchase. Points can be redeemed for discounts on future orders. Sign up for free in your account dashboard.'
      },
      {
        q: 'Do you offer a registry service?',
        a: 'Yes, we offer baby registry services with a 10% completion discount. Create your registry online and share it with friends and family. You\'ll also get a welcome gift!'
      },
      {
        q: 'Are there discounts for first-time customers?',
        a: 'Yes! Sign up for our newsletter and receive 15% off your first order. The discount code will be emailed to you immediately after signing up.'
      }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h1>
      
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {filteredCategories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No FAQs found matching your search.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((item, questionIndex) => {
                  const isOpen = openItems[`${categoryIndex}-${questionIndex}`]
                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      <button
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-900">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 bg-purple-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-4">
          Our customer service team is here to help!
        </p>
        <div className="flex justify-center gap-4">
          <a href="/contact" className="btn-primary">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}