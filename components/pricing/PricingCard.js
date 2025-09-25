'use client'

import { Check, X, Star } from 'lucide-react'

export default function PricingCard({ ebook, onAddToCart }) {
  const IconComponent = ebook.icon
  const currentPrice = ebook.price
  const originalPrice = ebook.originalPrice
  const savings = originalPrice ? originalPrice - currentPrice : 0
  
  return (
    <div className={`pricing-card relative bg-white rounded-2xl shadow-lg hover:shadow-xl ${
      ebook.popular ? 'ring-2 ring-pink-500 scale-105' : ''
    }`}>
      {/* Popular Badge */}
      {ebook.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current" />
            <span>Best Value</span>
          </div>
        </div>
      )}

      {/* Savings Badge */}
      {savings > 0 && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Save ${savings}
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${ebook.color} rounded-full flex items-center justify-center shadow-lg`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{ebook.name}</h3>
          <p className="text-gray-600 text-sm font-medium">{ebook.tagline}</p>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">{ebook.description}</p>
          
          {/* Ebook Details */}
          <div className="mt-4 flex justify-center space-x-4 text-xs text-gray-500">
            <span>{ebook.pages} pages</span>
            <span>•</span>
            <span>{ebook.formats.join(', ')}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center mb-2">
            <span className="text-4xl font-bold text-gray-900">${currentPrice}</span>
            <span className="text-gray-600 ml-2">one-time</span>
          </div>
          
          {originalPrice && (
            <div className="flex items-center justify-center space-x-2 text-sm">
              <span className="text-gray-400 line-through">Was ${originalPrice}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Save ${savings}
              </span>
            </div>
          )}
          
          <p className="text-sm text-green-600 mt-2 font-medium">
            Instant download • Lifetime access
          </p>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
          <ul className="space-y-3">
            {ebook.features.map((feature, index) => {
              const FeatureIcon = feature.icon
              return (
                <li key={index} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                    feature.included 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {feature.included ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <X className="w-3 h-3" />
                    )}
                  </div>
                  <div className="flex items-start space-x-2 flex-1">
                    <FeatureIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      feature.included ? 'text-gray-600' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm ${
                      feature.included ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">Key Benefits:</h4>
          <ul className="space-y-2">
            {ebook.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-600 leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={onAddToCart}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
            ebook.popular
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105'
              : `bg-gradient-to-r ${ebook.color} hover:shadow-lg transform hover:scale-105`
          }`}
        >
          {ebook.buttonText}
        </button>

        {/* Additional Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Digital download • 30-day guarantee
          </p>
        </div>
      </div>
    </div>
  )
}