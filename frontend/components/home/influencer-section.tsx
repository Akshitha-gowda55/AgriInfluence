import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Instagram, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { influencers } from '@/lib/data';

const benefits = [
  'Exclusive product access',
  'Competitive commission rates',
  'Dedicated support team',
  'Free product samples',
];

export function InfluencerSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <Badge variant="secondary" className="mb-4">
              Influencer Program
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Partner With Us & Grow Your Influence
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Join our network of agriculture influencers and help farmers discover premium products while earning competitive commissions.
            </p>

            {/* Benefits */}
            <ul className="mt-8 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/influencers">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>

          {/* Influencer Cards */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {influencers.map((influencer, index) => (
                <div
                  key={influencer.id}
                  className={`relative overflow-hidden rounded-xl bg-card border border-border p-4 ${
                    index === 2 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={influencer.image}
                        alt={influencer.name}
                        fill
                        className="rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#E1306C] text-white">
                        <Instagram className="h-3.5 w-3.5" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {influencer.name}
                      </h3>
                      <p className="text-sm text-primary truncate">
                        {influencer.handle}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          {influencer.followers} followers
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-sm text-muted-foreground truncate">
                          {influencer.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 -top-4 -right-4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
