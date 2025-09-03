import { Truck, Clock, Globe, Shield } from 'lucide-react'

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Information</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-purple-50 rounded-lg p-6">
          <Truck className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
          <p className="text-gray-600">On all orders over $50 within the United States</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6">
          <Clock className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-600">2-5 business days for standard shipping</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <Globe className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">International Shipping</h3>
          <p className="text-gray-600">We ship to over 50 countries worldwide</p>
        </div>
        
        <div className="bg-pink-50 rounded-lg p-6">
          <Shield className="w-8 h-8 text-pink-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Secure Packaging</h3>
          <p className="text-gray-600">All items are carefully packaged for safe delivery</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Shipping Rates & Delivery Times</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Shipping Method</th>
                <th className="text-left py-3">Delivery Time</th>
                <th className="text-left py-3">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 font-medium">Standard Shipping</td>
                <td className="py-3">3-5 business days</td>
                <td className="py-3">$9.99 (Free over $50)</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Express Shipping</td>
                <td className="py-3">2-3 business days</td>
                <td className="py-3">$19.99</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Next Day Delivery</td>
                <td className="py-3">1 business day</td>
                <td className="py-3">$39.99</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">International Standard</td>
                <td className="py-3">7-14 business days</td>
                <td className="py-3">$29.99+</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">International Express</td>
                <td className="py-3">3-7 business days</td>
                <td className="py-3">$59.99+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Shipping Policies</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Order Processing</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Orders placed before 2 PM EST on business days are processed the same day</li>
          <li>Orders placed after 2 PM EST or on weekends are processed the next business day</li>
          <li>You will receive a confirmation email with tracking information once your order ships</li>
          <li>During peak seasons, processing may take an additional 1-2 business days</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Shipping Restrictions</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>We currently ship to all 50 US states and select international countries</li>
          <li>Some products may have shipping restrictions due to size or regulations</li>
          <li>P.O. Box delivery is available for standard shipping only</li>
          <li>Signature may be required for high-value orders</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">International Shipping</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>International customers are responsible for any customs duties and taxes</li>
          <li>Delivery times may vary based on customs processing</li>
          <li>Some products may not be available for international shipping</li>
          <li>Contact us for shipping quotes to countries not listed</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Tracking Your Order</h3>
        <p className="text-gray-600 mb-4">
          Once your order ships, you'll receive an email with your tracking number. 
          You can also track your order by logging into your account and viewing your order history.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Contact Us</h3>
        <p className="text-gray-600">
          If you have any questions about shipping, please contact our customer service team at 
          <a href="mailto:shipping@babybloom.com" className="text-purple-600"> contact@dcube.store</a> or 
          call us at <span className="text-purple-600">+1 (555) 123-4567</span>.
        </p>
      </div>
    </div>
  )
}