import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Shield, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $99',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Lab-tested products',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Sustainable farming',
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop"
          alt="Agriculture field"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Trusted by 10,000+ Farmers
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
            Grow Better with Premium Agriculture Products
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed max-w-xl">
            From certified fertilizers to eco-friendly pesticides, we provide everything you need for a thriving harvest. Join our community of modern farmers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/products">
                Shop Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
              <Link href="/influencers">
                Become an Influencer
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Bar */}
      <div className="relative bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
