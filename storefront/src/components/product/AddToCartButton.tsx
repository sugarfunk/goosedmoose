"use client"

/**
 * Add to Cart Button Component
 *
 * Client component for adding products to cart.
 * Features:
 * - Variant selection (sizes)
 * - Quantity selector
 * - Add to cart button with loading state
 * - Success feedback
 */

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/medusa-client"

interface AddToCartButtonProps {
  product: {
    id: string
    title: string
    subtitle?: string
    thumbnail?: string
    variants?: Array<{
      id: string
      title: string
      prices: Array<{
        amount: number
        currency_code: string
      }>
      inventory_quantity?: number
      metadata?: {
        burn_time?: string
        weight_oz?: number
      }
    }>
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.id || ""
  )
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Get the selected variant object
  const variant = product.variants?.find((v) => v.id === selectedVariant)

  // Get price for selected variant
  const price = variant?.prices.find((p) => p.currency_code === "usd")?.amount || 0

  const handleAddToCart = () => {
    if (!variant) return

    setIsAdding(true)

    // Simulate async operation
    setTimeout(() => {
      addItem({
        variantId: variant.id,
        productId: product.id,
        title: product.title,
        subtitle: product.subtitle,
        variantTitle: variant.title,
        price,
        thumbnail: product.thumbnail,
      })

      setIsAdding(false)
      setShowSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000)
    }, 300)
  }

  if (!product.variants || product.variants.length === 0) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-200">
        This product is currently unavailable.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Variant Selection */}
      <div>
        <label className="block text-sm font-semibold mb-3">
          Select Size
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {product.variants.map((v) => {
            const variantPrice = v.prices.find((p) => p.currency_code === "usd")
            const isSelected = selectedVariant === v.id
            const isOutOfStock = v.inventory_quantity !== undefined && v.inventory_quantity <= 0

            return (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v.id)}
                disabled={isOutOfStock}
                className={`
                  p-4 rounded-lg border-2 transition-all
                  ${
                    isSelected
                      ? "border-white bg-white text-black"
                      : "border-grey-medium hover:border-grey-light"
                  }
                  ${isOutOfStock ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                <div className="font-semibold">{v.title}</div>
                {variantPrice && (
                  <div className="text-sm mt-1">
                    {formatPrice(variantPrice.amount)}
                  </div>
                )}
                {v.metadata?.burn_time && (
                  <div className="text-xs text-grey-light mt-1">
                    {v.metadata.burn_time}
                  </div>
                )}
                {isOutOfStock && (
                  <div className="text-xs text-red-400 mt-1">Out of Stock</div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-semibold mb-3">
          Quantity
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-full border border-grey-medium hover:border-white transition-colors flex items-center justify-center"
            aria-label="Decrease quantity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-full border border-grey-medium hover:border-white transition-colors flex items-center justify-center"
            aria-label="Increase quantity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding || !variant}
        className={`
          w-full btn btn-primary text-lg py-4 flex items-center justify-center space-x-2
          ${isAdding ? "opacity-75 cursor-wait" : ""}
          ${showSuccess ? "!bg-green-600" : ""}
        `}
      >
        {isAdding ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Adding...</span>
          </>
        ) : showSuccess ? (
          <>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Add to Cart - {formatPrice(price * quantity)}</span>
          </>
        )}
      </button>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-900/20 border border-green-500 rounded-lg p-4 flex items-center justify-between">
          <span className="text-green-200">Item added to cart!</span>
          <a href="/cart" className="text-green-200 underline hover:no-underline">
            View Cart
          </a>
        </div>
      )}
    </div>
  )
}
