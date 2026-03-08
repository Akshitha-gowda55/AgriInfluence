'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { influencers } from '@/lib/data';
import {
  Instagram,
  DollarSign,
  Users,
  Package,
  HeartHandshake,
  CheckCircle,
  Send,
  Star,
} from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Commissions',
    description: 'Earn up to 15% commission on every sale you generate',
  },
  {
    icon: Package,
    title: 'Free Products',
    description: 'Receive complimentary products for reviews and content',
  },
  {
    icon: Users,
    title: 'Exclusive Community',
    description: 'Join a network of agriculture influencers',
  },
  {
    icon: HeartHandshake,
    title: 'Dedicated Support',
    description: 'Get personalized assistance from our team',
  },
];

const requirements = [
  'Minimum 5,000 followers on social media',
  'Focus on agriculture, farming, or sustainability',
  'Consistent posting schedule (2+ posts per week)',
  'Authentic engagement with your audience',
  'Alignment with sustainable farming values',
];

const testimonialQuotes = [
  {
    name: 'Emma Green',
    handle: '@farmlife_emma',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    quote: 'Partnering with AgriInfluence has been incredible. Their products are top-notch and the support team is amazing!',
  },
  {
    name: 'Mike Rodriguez',
    handle: '@modernfarmer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    quote: 'The commission structure is the best I have seen. I am proud to recommend products I truly believe in.',
  },
];

export default function InfluencersPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    socialHandle: '',
    followers: '',
    platform: '',
    niche: '',
    bio: '',
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-foreground text-primary-foreground py-20 sm:py-28">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1920&h=1080&fit=crop"
              alt="Influencer collaboration"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4 bg-primary text-primary-foreground">
              Influencer Program
            </Badge>
            <h1 className="font-serif text-4xl font-bold sm:text-5xl lg:text-6xl text-balance">
              Grow Your Influence in Agriculture
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Partner with AgriInfluence and help farmers discover premium products while earning competitive commissions and building your brand.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <a href="#apply">Apply Now</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Why Partner With Us?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Join a growing community of agriculture influencers and unlock exclusive benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Influencers */}
        <section className="py-16 sm:py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Our Featured Partners
              </h2>
              <p className="mt-4 text-muted-foreground">
                Meet some of the amazing creators in our influencer network.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {influencers.map((influencer) => (
                <div
                  key={influencer.id}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="relative mx-auto w-24 h-24 mb-4">
                    <Image
                      src={influencer.image}
                      alt={influencer.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#E1306C] rounded-full flex items-center justify-center">
                      <Instagram className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-medium text-foreground">{influencer.name}</h3>
                  <p className="text-primary text-sm">{influencer.handle}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {influencer.followers} followers
                  </p>
                  <Badge variant="secondary" className="mt-3">
                    {influencer.category}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {testimonialQuotes.map((testimonial) => (
                <div
                  key={testimonial.handle}
                  className="bg-card border border-border rounded-xl p-8"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-lg text-foreground italic leading-relaxed">
                    {`"${testimonial.quote}"`}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-primary">{testimonial.handle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-16 sm:py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Requirements */}
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                  Apply to Join
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Ready to become an AgriInfluence partner? Fill out the application form and our team will review your profile within 48 hours.
                </p>

                <div className="mt-8">
                  <h3 className="font-medium text-foreground mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {requirements.map((req) => (
                      <li key={req} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Form */}
              <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Application Submitted!
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Thank you for applying. We will review your application and get back to you within 48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="socialHandle">Social Media Handle</Label>
                        <Input
                          id="socialHandle"
                          placeholder="@yourhandle"
                          required
                          value={formData.socialHandle}
                          onChange={(e) =>
                            setFormData({ ...formData, socialHandle: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="followers">Number of Followers</Label>
                        <Select
                          value={formData.followers}
                          onValueChange={(value) =>
                            setFormData({ ...formData, followers: value })
                          }
                        >
                          <SelectTrigger id="followers" className="mt-1">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5k-10k">5K - 10K</SelectItem>
                            <SelectItem value="10k-50k">10K - 50K</SelectItem>
                            <SelectItem value="50k-100k">50K - 100K</SelectItem>
                            <SelectItem value="100k+">100K+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="platform">Primary Platform</Label>
                        <Select
                          value={formData.platform}
                          onValueChange={(value) =>
                            setFormData({ ...formData, platform: value })
                          }
                        >
                          <SelectTrigger id="platform" className="mt-1">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="niche">Content Niche</Label>
                        <Select
                          value={formData.niche}
                          onValueChange={(value) =>
                            setFormData({ ...formData, niche: value })
                          }
                        >
                          <SelectTrigger id="niche" className="mt-1">
                            <SelectValue placeholder="Select niche" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="farming">General Farming</SelectItem>
                            <SelectItem value="organic">Organic Farming</SelectItem>
                            <SelectItem value="sustainable">Sustainability</SelectItem>
                            <SelectItem value="homesteading">Homesteading</SelectItem>
                            <SelectItem value="gardening">Gardening</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Tell Us About Yourself</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        placeholder="Share your story, why you're passionate about agriculture, and what kind of content you create..."
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, agreeToTerms: checked as boolean })
                        }
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground cursor-pointer leading-tight"
                      >
                        I agree to the terms and conditions and understand that my application will be reviewed by the AgriInfluence team.
                      </label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={!formData.agreeToTerms}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Submit Application
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
