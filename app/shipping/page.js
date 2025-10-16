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
        <p className="text-lg opacity-90">For a limited time, enjoy completely free shipping and zero taxes on all baby products!</p>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping & Delivery Information</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
          <Zap className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2 text-purple-800">Fast Processing</h3>
          <p className="text-gray-600">Orders are processed within 1-2 business days</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
          <Globe className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2 text-blue-800">Worldwide Delivery</h3>
          <p className="text-gray-600">We ship to all locations across the globe</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
          <Shield className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2 text-green-800">Secure Packaging</h3>
          <p className="text-gray-600">All products are carefully packed for safe delivery</p>
        </div>
        
        <div className="bg-pink-50 rounded-lg p-6 border-2 border-pink-200">
          <Star className="w-8 h-8 text-pink-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2 text-pink-800">Order Tracking</h3>
          <p className="text-gray-600">Track your order from dispatch to delivery</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Shipping Rates & Delivery Times</h2>
        
        <div className="bg-green-50 rounded-lg p-6 mb-6 border-2 border-green-200">
          <div className="flex items-center mb-3">
            <Zap className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">🎉 Limited Time: Free Shipping & No Taxes!</h3>
          </div>
          <p className="text-green-700 font-medium mb-2">All baby products ship with:</p>
          <ul className="list-disc list-inside text-green-700 space-y-1">
            <li><strong>$0 Shipping Cost</strong> - Free shipping on all orders</li>
            <li><strong>$0 Tax</strong> - No taxes applied at checkout</li>
            <li><strong>Fast Processing</strong> - Orders processed within 1-2 business days</li>
            <li><strong>Tracking Included</strong> - Track your package every step of the way</li>
          </ul>
        </div>
    
      <div className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Shipping Policies</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Order Processing</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Orders are processed within 1-2 business days after payment confirmation</li>
          <li>You will receive an email confirmation once your order has been shipped</li>
          <li>Orders placed on weekends or holidays will be processed on the next business day</li>
          <li>Processing time does not include shipping time</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Delivery Timeframes</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Standard delivery takes 3-7 business days after order processing</li>
          <li>Delivery times may vary based on your location</li>
          <li>Remote areas may require additional delivery time</li>
          <li>Tracking information will be provided via email once shipped</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Tracking Your Order</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>A tracking number will be sent to your email once the order ships</li>
          <li>You can track your package using the tracking number provided</li>
          <li>Check your order status anytime through your account dashboard</li>
          <li>Contact us if you haven't received tracking information within 2 business days</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Shipping Restrictions</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>We currently ship within the United States only</li>
          <li>PO Boxes and APO/FPO addresses are accepted</li>
          <li>Please ensure your shipping address is correct at checkout</li>
          <li>We are not responsible for delays caused by incorrect addresses</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Damaged or Lost Packages</h3>
        <p className="text-gray-600 mb-4">
          If your package arrives damaged or goes missing during transit, please contact us immediately. 
          We will work with the shipping carrier to resolve the issue and ensure you receive your order.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Contact Us</h3>
        <p className="text-gray-600">
          If you have any questions about shipping or your order, please contact our customer service team at 
          <a href="mailto:support@dcubestore.com" className="text-purple-600"> support@dcubestore.com</a> or 
          use our live chat for immediate assistance.
        </p>
      </div>
    </div>
  )
}
