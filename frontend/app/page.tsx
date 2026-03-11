import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import HeroSection from '@/components/home/hero-section'
import FeaturedProducts from '@/components/home/featured-products'
import CategoriesSection from '@/components/home/categories-section'
import TrustBadges from '@/components/home/trust-badges'
import TestimonialsSection from '@/components/home/testimonials-section'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <CategoriesSection />
        <TrustBadges />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  )
}