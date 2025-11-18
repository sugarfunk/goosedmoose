/**
 * Goosed Moose - Landing Page
 *
 * Eye-catching landing page featuring:
 * - Hero section with brand logo and tagline
 * - Featured products preview
 * - About section highlighting handmade quality
 * - Call-to-action for shopping
 */

import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#111] to-black py-20 md:py-32">
        <div className="container-custom">
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <div className="mb-8">
              <Image
                src="/images/brand/goosedmoose_raisedgoose_withtitle_white.png"
                alt="Goosed Moose - Artisan Candles and Crafts"
                width={600}
                height={334}
                className="w-full max-w-md md:max-w-xl"
                priority
              />
            </div>

            {/* Tagline */}
            <h1 className="text-2xl md:text-4xl font-light text-grey-light mb-6 max-w-2xl">
              Hand-poured artisan candles crafted with love in Macedonia, GA
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/products" className="btn btn-primary text-lg px-8 py-4">
                Shop Candles
              </Link>
              <Link href="/about" className="btn btn-secondary text-lg px-8 py-4">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section - What Makes Us Special */}
      <section className="py-16 md:py-24 bg-[#222]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Goosed Moose?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Natural Soy Wax</h3>
              <p className="text-grey-light">
                Clean burning, eco-friendly candles made with premium natural soy wax
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Wooden Wicks</h3>
              <p className="text-grey-light">
                Our signature wooden wicks create a soothing crackling sound like a fireplace
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hand-Poured with Love</h3>
              <p className="text-grey-light">
                Every candle is carefully crafted by hand in small batches by our family
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Candles
            </h2>
            <p className="text-grey-light text-lg">
              Discover our signature scents
            </p>
          </div>

          {/* Product Grid Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { name: "Merry Moosemas", scent: "Pine, Ginger & Orange" },
              { name: "Lavender Dreams", scent: "Pure Lavender Essential Oil" },
              { name: "Autumn Harvest", scent: "Pumpkin Spice & Cinnamon" },
            ].map((product) => (
              <div key={product.name} className="bg-[#222] rounded-lg p-6 hover:bg-[#333] transition-colors">
                <div className="aspect-square bg-[#111] rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src="/images/brand/candle.webp"
                    alt={product.name}
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-grey-light text-sm mb-4">{product.scent}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">From $12</span>
                  <Link href="/products" className="btn btn-primary text-sm px-4 py-2">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/products" className="btn btn-primary text-lg px-8 py-4">
              Shop All Candles
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-[#222]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-grey-light text-lg leading-relaxed mb-6">
              We are a family of three in Macedonia, GA (suburb of Canton, GA) who all like to
              tinker and make things. We started making candles because great candles are hard
              to find. Friends got gifts and word spread, so we decided to make our products
              available to others to enjoy.
            </p>
            <p className="text-grey-light text-lg leading-relaxed mb-8">
              We already made other things too like t-shirts, vinyl work, laser engraved goods,
              and other crafts. We hope you find something you love, and we love making them for you.
            </p>
            <Link href="/about" className="btn btn-secondary text-lg px-8 py-4">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Shipping Info CTA */}
      <section className="py-16 bg-white text-black">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Local Pickup Available!</h2>
            <p className="text-lg mb-6">
              Located in Canton, GA? Choose free local pickup at checkout.
              We also ship throughout the United States.
            </p>
            <Link href="/shipping" className="inline-block text-black font-semibold hover:opacity-80 transition-opacity">
              Learn More About Shipping →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
