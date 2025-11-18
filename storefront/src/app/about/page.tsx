/**
 * About Page
 *
 * Tells the Goosed Moose family story and brand values.
 */

import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the Goosed Moose family and our passion for creating hand-poured artisan candles in Macedonia, GA.",
}

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#111] to-black py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Goosed Moose Story
            </h1>
            <p className="text-xl text-grey-light">
              A family's passion for crafting beautiful, hand-poured candles
            </p>
          </div>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <p className="text-grey-light text-lg leading-relaxed mb-6">
                We are a family of three in Macedonia, GA (a suburb of Canton, GA) who all
                like to tinker and make things. Our journey began with a simple observation:
                great candles are hard to find. So, we decided to make our own.
              </p>
              <p className="text-grey-light text-lg leading-relaxed mb-6">
                What started as gifts for friends quickly grew as word spread about our
                hand-poured candles. We realized that others appreciated the same quality
                and care that we put into each candle, and that's when Goosed Moose was born.
              </p>

              <h2 className="text-3xl font-bold mb-6 mt-12">Our Craft</h2>
              <p className="text-grey-light text-lg leading-relaxed mb-6">
                Every Goosed Moose candle is hand-poured in small batches using 100% natural
                soy wax and wooden wicks that create a soothing crackling sound. We believe
                in quality over quantity, which is why each candle receives our personal
                attention and care.
              </p>
              <p className="text-grey-light text-lg leading-relaxed mb-6">
                Our candles aren't just products—they're an extension of our family's love
                for creating beautiful things. We already made other crafts too, like
                t-shirts, vinyl work, and laser engraved goods, so candle-making was a
                natural addition to our creative endeavors.
              </p>

              <h2 className="text-3xl font-bold mb-6 mt-12">Beyond Candles</h2>
              <p className="text-grey-light text-lg leading-relaxed mb-6">
                While candles are our flagship product, we're always tinkering and creating.
                In the future, you'll find other handmade crafts from our family, each made
                with the same care and attention to detail that goes into our candles.
              </p>
              <p className="text-grey-light text-lg leading-relaxed mb-6">
                We hope you find something you love, and we love making them for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-[#222]">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-grey-light">
                Every product is crafted by hand with care and attention to detail
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-grey-light">
                Natural soy wax and sustainable materials in all our candles
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Family Made</h3>
              <p className="text-grey-light">
                A true family business where everyone contributes their talents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#222] rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Location</h3>
                  <p className="text-grey-light mb-2">Macedonia, GA</p>
                  <p className="text-grey-light mb-4">(Suburb of Canton)</p>
                  <p className="text-sm text-grey-light">
                    Local pickup available! Select "Local Pickup" at checkout and
                    we'll coordinate a pickup time with you.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Contact</h3>
                  <p className="text-grey-light mb-2">
                    <strong>Phone:</strong> 678-468-2726
                  </p>
                  <p className="text-grey-light mb-4">
                    <strong>Email:</strong> info@goosed.me
                  </p>
                  <Link
                    href="/contact"
                    className="text-white hover:text-grey-light transition-colors inline-flex items-center"
                  >
                    Get in Touch
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white text-black">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Try Our Candles?</h2>
            <p className="text-lg mb-8">
              Discover our collection of hand-poured artisan candles, each crafted
              with love right here in Georgia.
            </p>
            <Link href="/products" className="inline-block bg-black text-white px-8 py-4 rounded font-semibold hover:bg-gray-800 transition-colors">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
