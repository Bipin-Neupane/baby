'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { User, Package, Heart, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function AccountPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">{user.name || 'User'}</h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <Link href="/orders" className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                  <Package className="w-5 h-5 text-gray-600 mr-3" />
                  <span>My Orders</span>
                </Link>
                <Link href="/wishlist" className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                  <Heart className="w-5 h-5 text-gray-600 mr-3" />
                  <span>Wishlist</span>
                </Link>
                <Link href="/settings" className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                  <Settings className="w-5 h-5 text-gray-600 mr-3" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 text-red-600"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h2>
              
              {loading ? (
                <p className="text-gray-600">Loading...</p>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">Order #{order.order_number}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
                        <Link
                          href={`/orders/${order.id}`}
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <Link href="/products" className="btn-primary">
                    Start Shopping
                  </Link>
                </div>
              )}
              
              {orders.length > 0 && (
                <div className="mt-6 text-center">
                  <Link href="/orders" className="text-purple-600 hover:text-purple-700 font-medium">
                    View All Orders →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}