/**
 * Products Listing Page
 *
 * Displays all available candles with filtering and sorting options.
 * Server component that fetches products from Medusa backend.
 */

import { Metadata } from "next"
import ProductCard from "@/components/product/ProductCard"
import { medusaClient } from "@/lib/medusa-client"

export const metadata: Metadata = {
  title: "Shop Candles",
  description: "Browse our collection of hand-poured artisan candles made with natural soy wax and wooden wicks.",
}

async function getProducts() {
  try {
    // Fetch all published products from Medusa
    const response = await medusaClient.store.product.list({
      limit: 100,
      // Only show published products
      status: ["published"],
    })

    return response.products || []
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-[#222] py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Candles</h1>
          <p className="text-grey-light text-lg max-w-2xl">
            Discover our hand-poured artisan candles. Each one crafted with love
            using 100% natural soy wax and wooden wicks.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          {products.length === 0 ? (
            /* No Products State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#222] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-grey-light"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">No Products Available</h2>
              <p className="text-grey-light mb-6">
                We're currently updating our inventory. Please check back soon!
              </p>
              <p className="text-sm text-grey-light">
                <strong>Developer Note:</strong> Make sure the Medusa backend is
                running and seeded with products.
              </p>
            </div>
          ) : (
            /* Products Grid */
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-grey-light">
                  Showing {products.length} {products.length === 1 ? "product" : "products"}
                </p>

                {/* TODO: Add sorting and filtering */}
                {/* <div className="flex items-center gap-4">
                  <select className="bg-[#222] border border-grey-medium rounded px-4 py-2 text-sm">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Name: A-Z</option>
                  </select>
                </div> */}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-[#222] py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">🚚 Shipping & Pickup</h3>
              <p className="text-grey-light">
                Free local pickup in Canton, GA. We also ship throughout the
                United States via USPS.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">🕯️ Quality Guarantee</h3>
              <p className="text-grey-light">
                All candles are hand-poured in small batches with 100% natural
                soy wax and premium wooden wicks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
