'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Leaf,
  Users,
  Target,
  Heart,
  CheckCircle,
} from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Sustainability',
    description:
      'We are committed to promoting sustainable farming practices that protect our environment for future generations.',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'Building a strong network of farmers and influencers who share knowledge and support each other.',
  },
  {
    icon: Target,
    title: 'Quality',
    description:
      'Every product we offer is rigorously tested to meet the highest standards of effectiveness and safety.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description:
      'Our team is driven by a genuine passion for agriculture and helping farmers succeed.',
  },
];

const team = [
  {
    name: 'John Anderson',
    role: 'Founder & CEO',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    bio: '20+ years in agriculture industry',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Head of Operations',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
    bio: 'Supply chain expert',
  },
  {
    name: 'David Chen',
    role: 'Product Director',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    bio: 'Agricultural scientist',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Lead',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    bio: 'Digital marketing specialist',
  },
];

const faqs = [
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business day delivery. Orders over $99 qualify for free standard shipping.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for all unopened products in their original packaging. If you receive a damaged item, please contact us within 48 hours for a replacement.',
  },
  {
    question: 'Are your products organic certified?',
    answer:
      'Many of our products are OMRI certified organic. Look for the "Organic" badge on product pages. We also carry conventional options to meet all farming needs.',
  },
  {
    question: 'How do I become an influencer partner?',
    answer:
      'Visit our Influencer page and fill out the application form. We look for creators with at least 5,000 followers who focus on agriculture, farming, or sustainability content.',
  },
  {
    question: 'Do you offer bulk pricing for large orders?',
    answer:
      'Yes! We offer competitive bulk pricing for orders over $500. Contact our sales team at sales@agriinfluence.com for a custom quote.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order ships, you will receive an email with tracking information. You can also view order status in your account dashboard.',
  },
];

export default function AboutPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop"
            alt="About AgriInfluence"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-balance text-primary-foreground sm:text-5xl lg:text-6xl">
            About AgriInfluence
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            Empowering farmers with premium products and connecting brands with
            influential voices in agriculture since 2018.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Our Story
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                AgriInfluence was founded in 2018 by John Anderson, a
                third-generation farmer who saw the need for a trusted online
                marketplace where farmers could access quality products without
                the hassle of dealing with multiple suppliers.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                What started as a small operation has grown into a nationwide
                platform serving over 10,000 farmers. In 2021, we launched our
                influencer program, recognizing the power of authentic voices in
                helping farmers make informed decisions.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Today, we partner with over 100 agriculture influencers and
                offer more than 500 carefully curated products. Our mission
                remains the same: to help farmers grow better while building a
                sustainable future for agriculture.
              </p>
            </div>
            <div className="relative aspect-square lg:aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"
                alt="Our Story"
                fill
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-muted-foreground">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-muted-foreground">
              The passionate people behind AgriInfluence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto mb-4 h-32 w-32">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <section className="bg-muted/50 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Find answers to common questions about our products and services.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-lg border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Get in Touch
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Have questions? We would love to hear from you. Send us a
                message and we will respond as soon as possible.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Phone</h3>
                    <p className="text-muted-foreground">1-800-AGRI-INF</p>
                    <p className="text-sm text-muted-foreground">
                      Mon-Fri, 8am-6pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Email</h3>
                    <p className="text-muted-foreground">
                      support@agriinfluence.com
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We reply within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Address</h3>
                    <p className="text-muted-foreground">
                      123 Farm Road
                      <br />
                      Agriculture Valley, CA 90210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      Business Hours
                    </h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8am - 6pm EST
                      <br />
                      Saturday: 9am - 3pm EST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              {formSubmitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                    <CheckCircle className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Thank you for reaching out. We will get back to you within
                    24 hours.
                  </p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: '',
                      });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}