/**
 * Product Card Component
 *
 * Reusable card for displaying product information in grid layouts.
 * Used on: products listing page, search results, featured products.
 */

import Link from "next/link"
import Image from "next/image"
import { formatPrice, getImageUrl } from "@/lib/medusa-client"

interface ProductCardProps {
  product: {
    id: string
    title: string
    subtitle?: string
    description?: string
    handle: string
    thumbnail?: string
    variants?: Array<{
      id: string
      title: string
      prices: Array<{
        amount: number
        currency_code: string
      }>
    }>
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  // Get the minimum price from all variants
  const getMinPrice = () => {
    if (!product.variants || product.variants.length === 0) {
      return null
    }

    const prices = product.variants
      .flatMap((v) => v.prices)
      .filter((p) => p.currency_code === "usd")
      .map((p) => p.amount)

    return Math.min(...prices)
  }

  const minPrice = getMinPrice()
  const imageUrl = product.thumbnail
    ? getImageUrl(product.thumbnail)
    : "/images/brand/candle.webp"

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group bg-[#222] rounded-lg overflow-hidden hover:bg-[#333] transition-all duration-200"
    >
      {/* Product Image */}
      <div className="aspect-square bg-[#111] relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Out of Stock Badge (TODO: implement inventory check) */}
        {/* <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          Sold Out
        </div> */}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-grey-light transition-colors">
          {product.title}
        </h3>

        {product.subtitle && (
          <p className="text-grey-light text-sm mb-3">{product.subtitle}</p>
        )}

        <div className="flex items-center justify-between">
          {minPrice ? (
            <div className="flex flex-col">
              <span className="text-sm text-grey-light">From</span>
              <span className="text-xl font-bold">{formatPrice(minPrice)}</span>
            </div>
          ) : (
            <span className="text-grey-light">Price unavailable</span>
          )}

          <div className="btn btn-primary text-sm px-4 py-2 group-hover:bg-white transition-colors">
            View Details
          </div>
        </div>
      </div>
    </Link>
  )
}
