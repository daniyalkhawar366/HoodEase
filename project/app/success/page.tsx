'use client';

export const dynamic = 'force-static';

import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 text-lg">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Order #HE-2024-001</h2>
                    <p className="text-gray-600">Placed on {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">$197.90</p>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium mb-1">Payment Confirmed</h3>
                    <p className="text-sm text-gray-600">Your payment has been processed</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
                      <Package className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="font-medium mb-1">Preparing Order</h3>
                    <p className="text-sm text-gray-600">We're getting your items ready</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                      <Truck className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-medium mb-1">Ships in 2-3 days</h3>
                    <p className="text-sm text-gray-600">Free standard shipping</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg p-6 mb-8"
          >
            <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>You'll receive an email confirmation with your order details</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>We'll send you tracking information when your order ships</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Your order will arrive in 5-7 business days</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/shop/men">
              <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
                Continue Shopping
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Track Your Order
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}