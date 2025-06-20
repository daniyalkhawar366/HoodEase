'use client';

export const dynamic = 'force-static';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useSettingsStore } from '@/store/useStore';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const { phone, supportEmail } = useSettingsStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="flex flex-col items-center justify-center relative z-0 bg-white min-h-screen">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex flex-col items-center justify-center p-4 max-w-4xl w-full mx-auto h-full pt-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 minimal-text text-center text-black">Contact Us</h1>
        <p className="text-lg mb-8 text-center text-gray-700">Just write us a message!</p>

        <div className="bg-white rounded-lg p-8 w-full max-w-2xl shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-black">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-white border-b border-gray-300 focus:border-black text-black placeholder-gray-500 focus:ring-0 focus:outline-none rounded-none px-0"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-black">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-white border-b border-gray-300 focus:border-black text-black placeholder-gray-500 focus:ring-0 focus:outline-none rounded-none px-0"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-black">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-white border-b border-gray-300 focus:border-black text-black placeholder-gray-500 focus:ring-0 focus:outline-none rounded-none px-0"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-black">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-white border-b border-gray-300 focus:border-black text-black placeholder-gray-500 focus:ring-0 focus:outline-none rounded-none px-0"
              />
            </div>
            
            <div>
              <Label htmlFor="message" className="text-black">Message</Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="bg-white border border-gray-300 focus:border-black text-black placeholder-gray-500 focus:ring-0 focus:outline-none rounded-md p-2"
                placeholder="Write your message.."
                required
              />
            </div>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg" 
                className="bg-black text-white hover:bg-gray-800 rounded-md px-8 py-3 minimal-text"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>

        {/* Reach us section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 minimal-text text-black">Reach us</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <Phone className="h-5 w-5 text-gray-700" />
              <p className="text-black">{phone}</p>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-5 w-5 text-gray-700" />
              <p className="text-black">{supportEmail}</p>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-700" />
              <p className="text-black">543 Aspen, Colorado</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}