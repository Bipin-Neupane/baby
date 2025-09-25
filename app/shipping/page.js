import { Truck, Clock, Globe, Shield, Star, Zap } from 'lucide-react'

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Limited Time Promotion Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg p-6 mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <Star className="w-6 h-6 mr-2 fill-current" />
          <span className="text-xl font-bold">LIMITED TIME OFFER</span>
          <Star className="w-6 h-6 ml-2 fill-current" />
        </div>
        <h2 className="text-2xl font-bold mb-2">🎉 FREE Shipping & NO Taxes on ALL Orders!</h2>
        <p className="text-lg opacity-90">For a limited time, enjoy completely free shipping and zero taxes on all our digital baby care guides!</p>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping & Delivery Information</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
          <Zap className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2 text-purple-800">Instant Download</h3>
          <p className="text-gray-600">Get your digital ebooks immediately after purchase - no waiting!</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
          <Globe className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2 text-blue-800">Worldwide Access</h3>
          <p className="text-gray-600">Available globally - download from anywhere in the world</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
          <Shield className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2 text-green-800">Secure Downloads</h3>
          <p className="text-gray-600">SSL-encrypted downloads and secure payment processing</p>
        </div>
        
        <div className="bg-pink-50 rounded-lg p-6 border-2 border-pink-200">
          <Star className="w-8 h-8 text-pink-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2 text-pink-800">Lifetime Access</h3>
          <p className="text-gray-600">Download as many times as you need - yours forever!</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Digital Product Delivery</h2>
        
        <div className="bg-green-50 rounded-lg p-6 mb-6 border-2 border-green-200">
          <div className="flex items-center mb-3">
            <Zap className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">🎉 Limited Time: Everything FREE!</h3>
          </div>
          <p className="text-green-700 font-medium mb-2">All our baby care ebooks are digital products with:</p>
          <ul className="list-disc list-inside text-green-700 space-y-1">
            <li><strong>$0 Shipping Cost</strong> - No physical shipping needed!</li>
            <li><strong>$0 Tax</strong> - No taxes on digital downloads!</li>
            <li><strong>Instant Access</strong> - Download immediately after purchase</li>
            <li><strong>Global Availability</strong> - Access from anywhere in the world</li>
          </ul>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Product Type</th>
                <th className="text-left py-3">Delivery Method</th>
                <th className="text-left py-3">Delivery Time</th>
                <th className="text-left py-3">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="bg-green-50">
                <td className="py-4 font-medium">Essential Baby Care Guide</td>
                <td className="py-4">Instant Digital Download</td>
                <td className="py-4 text-green-600 font-semibold">Immediate</td>
                <td className="py-4 text-green-600 font-semibold">FREE</td>
              </tr>
              <tr className="bg-green-50">
                <td className="py-4 font-medium">Complete Development Guide</td>
                <td className="py-4">Instant Digital Download</td>
                <td className="py-4 text-green-600 font-semibold">Immediate</td>
                <td className="py-4 text-green-600 font-semibold">FREE</td>
              </tr>
              <tr className="bg-green-50">
                <td className="py-4 font-medium">Ultimate Parenting Collection</td>
                <td className="py-4">Instant Digital Download</td>
                <td className="py-4 text-green-600 font-semibold">Immediate</td>
                <td className="py-4 text-green-600 font-semibold">FREE</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Digital Download Policies</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Instant Access</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Digital ebooks are delivered instantly after successful payment processing</li>
          <li>Download links are sent to your email address within minutes of purchase</li>
          <li>You can also access your purchases from your account dashboard at any time</li>
          <li>All downloads are available 24/7 - no business hours restrictions!</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">File Formats & Compatibility</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Our ebooks are available in PDF, EPUB, and MOBI formats</li>
          <li>Compatible with all devices: smartphones, tablets, e-readers, and computers</li>
          <li>No special software required - works with standard readers</li>
          <li>High-quality formatting optimized for easy reading</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Global Accessibility</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Available worldwide - no geographic restrictions</li>
          <li>No customs, duties, or international fees</li>
          <li>Same instant delivery whether you're in New York or Tokyo</li>
          <li>Multi-language support for international customers</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Download & Usage Rights</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Download as many times as you need from your account</li>
          <li>Keep forever - no expiration dates or access limits</li>
          <li>For personal use within your immediate family</li>
          <li>Print-friendly versions included for reference</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Technical Support</h3>
        <p className="text-gray-600 mb-4">
          Having trouble with your download? We're here to help! Check your email (including spam folder) for download links, 
          or log into your account to re-download at any time.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Contact Us</h3>
        <p className="text-gray-600">
          If you have any questions about downloads or accessing your ebooks, please contact our support team at 
          <a href="mailto:support@dcubestore.com" className="text-purple-600"> support@dcubestore.com</a> or 
          use our live chat for instant assistance.
        </p>
      </div>
    </div>
  )
}