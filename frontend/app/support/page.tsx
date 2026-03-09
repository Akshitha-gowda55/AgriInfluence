'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, Phone, HelpCircle } from 'lucide-react'

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 py-10">

          <h1 className="text-3xl font-bold mb-6">Customer Support</h1>

          <div className="grid gap-8 md:grid-cols-2">

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-5 w-5" />
                  <h2 className="font-semibold">Email Support</h2>
                </div>
                <p className="text-muted-foreground">
                  support@agrinfluence.com
                </p>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="h-5 w-5" />
                  <h2 className="font-semibold">Phone</h2>
                </div>
                <p className="text-muted-foreground">
                  +91 98765 43210
                </p>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <HelpCircle className="h-5 w-5" />
                  <h2 className="font-semibold">FAQ</h2>
                </div>
                <p className="text-muted-foreground">
                  For common questions about orders, shipping, and products.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              {submitted ? (
                <div className="text-center py-10">
                  <h2 className="text-xl font-bold mb-2">
                    Message Sent
                  </h2>
                  <p className="text-muted-foreground">
                    Our support team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">

                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={4} required />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>

                </form>
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}