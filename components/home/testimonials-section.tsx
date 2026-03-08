import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/lib/data';

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Testimonials
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Trusted by Farmers Nationwide
          </h2>
          <p className="mt-4 text-muted-foreground">
            Hear from our community of farmers who have transformed their harvests with our products.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative overflow-hidden rounded-xl bg-card border border-border p-6 transition-shadow hover:shadow-lg"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />

              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6">
                {`"${testimonial.quote}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.crop} · {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: '10K+', label: 'Happy Farmers' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '500+', label: 'Products Available' },
            { value: '50', label: 'States Served' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
