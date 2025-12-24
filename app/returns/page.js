import { Package, Clock, CreditCard, Shield } from 'lucide-react'

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns & Exchanges</h1>
      
      <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
        <h2 className="text-xl font-semibold text-green-900 mb-2">30-Day Satisfaction Guarantee</h2>
        <p className="text-green-800">
          We want you to love your Dcube Store products! If you're not completely satisfied, 
          you can return most items within 30 days for a full refund or exchange.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Package className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
          <p className="text-gray-600">Free return shipping on all orders with prepaid label</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Clock className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Quick Processing</h3>
          <p className="text-gray-600">Refunds processed within 5-7 business days</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <CreditCard className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Flexible Refunds</h3>
          <p className="text-gray-600">Original payment method or store credit available</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Shield className="w-8 h-8 text-pink-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
          <p className="text-gray-600">Defective items replaced immediately at no cost</p>
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Return Policy Details</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Eligible Items</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Unused items in original packaging with all tags attached</li>
          <li>Items purchased within the last 30 days</li>
          <li>Products with original receipt or proof of purchase</li>
          <li>Items not marked as final sale or clearance</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Non-Returnable Items</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Opened feeding bottles and pacifiers (for hygiene reasons)</li>
          <li>Personalized or custom-made items</li>
          <li>Intimate items such as breast pumps (unless defective)</li>
          <li>Items marked as "Final Sale"</li>
          <li>Gift cards</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">How to Return an Item</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-600">
          <li>
            <strong>Initiate Return:</strong> Log into your account and go to "My Orders" 
            to start a return request, or contact customer service
          </li>
          <li>
            <strong>Print Label:</strong> Once approved, we'll email you a prepaid return 
            shipping label
          </li>
          <li>
            <strong>Pack Items:</strong> Securely pack the items in their original packaging 
            with all accessories and documentation
          </li>
          <li>
            <strong>Ship Return:</strong> Drop off the package at any authorized shipping 
            location
          </li>
          <li>
            <strong>Receive Refund:</strong> Once we receive and inspect the items, we'll 
            process your refund within 5-7 business days
          </li>
        </ol>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Exchanges</h3>
        <p className="text-gray-600 mb-4">
          Want a different size, color, or product? We're happy to exchange items that meet 
          our return criteria. Simply indicate you'd like an exchange when initiating your 
          return, and we'll ship the replacement item as soon as we receive your return.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Damaged or Defective Items</h3>
        <p className="text-gray-600 mb-4">
          If you receive a damaged or defective item, please contact us immediately at 
          <a href="mailto:quality@dcubestore.com" className="text-purple-600"> quality@dcubestore.com</a> with 
          photos of the issue. We'll arrange for a replacement to be sent right away at no 
          additional cost to you.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Refund Timeline</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Credit cards: 5-7 business days after we receive your return</li>
          <li>PayPal: 3-5 business days after we receive your return</li>
          <li>Store credit: Available immediately after return is processed</li>
          <li>Original shipping costs are non-refundable unless the return is due to our error</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Questions?</h3>
        <p className="text-gray-600">
          If you have any questions about returns or exchanges, our customer service team is 
          here to help! Contact us at <a href="mailto:returns@dcubestore.com" className="text-purple-600">contact@dcubestore.com</a> or 
          call <span className="text-purple-600">+1925 231 7524</span>.
        </p>
      </div>
    </div>
  )
}
