import { MapPin, Phone, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Dcube Store</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for premium baby products. Quality, safety, and comfort for your little ones.
            </p>
            <div className="text-gray-400 text-sm space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-purple-400" />
                <div>
                  8029, 1021 E Lincolnway<br />
                  Cheyenne, WY, Laramie,<br />
                  United States
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-purple-400" />
                <a href="tel:+15551234567" className="hover:text-white">+1 (555) 123-4567</a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="/shipping" className="hover:text-white">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-white">Returns</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-gray-400 text-sm mb-4">
              Follow us for updates and parenting tips
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          © 2025 Dcube Store. All rights reserved.
        </div>
      </div>
    </footer>
  )
}