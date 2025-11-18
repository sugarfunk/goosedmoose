/**
 * Medusa Client Configuration
 *
 * This file sets up the Medusa SDK client for communicating with the backend API.
 * The client is used throughout the storefront to fetch products, manage cart, process orders, etc.
 */

import Medusa from "@medusajs/js-sdk"

// Get the backend URL from environment variables
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

/**
 * Initialize Medusa SDK client
 * This client handles all communication with the Medusa backend
 */
export const medusaClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
})

/**
 * Helper function to format price in USD
 * Medusa stores prices in cents, this converts to dollars
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100)
}

/**
 * Helper function to get image URL
 * Handles both local and remote image URLs
 */
export function getImageUrl(url: string): string {
  if (!url) return "/images/brand/candle.webp" // Fallback image

  // If it's already a full URL, return as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }

  // If it's a relative path, prepend the backend URL
  return `${MEDUSA_BACKEND_URL}${url}`
}

/**
 * Helper to handle errors from Medusa API
 */
export function handleMedusaError(error: any): string {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.message) {
    return error.message
  }
  return "An unexpected error occurred"
}
