/**
 * Product Detail Page
 *
 * Displays detailed information about a single product:
 * - Image gallery
 * - Product title, subtitle, description
 * - Variant selection (sizes)
 * - Price display
 * - Add to cart button
 * - Product metadata (burn time, wax type, etc.)
 */

import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { medusaClient, formatPrice, getImageUrl } from "@/lib/medusa-client"
import AddToCartButton from "@/components/product/AddToCartButton"

interface ProductPageProps {
  params: {
    handle: string
  }
}

async function getProduct(handle: string) {
  try {
    const response = await medusaClient.store.product.list({
      handle: handle,
      limit: 1,
    })

    if (!response.products || response.products.length === 0) {
      return null
    }

    return response.products[0]
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.handle)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.title} ${product.subtitle ? "- " + product.subtitle : ""}`,
    description: product.description || `Shop ${product.title} at Goosed Moose`,
    openGraph: {
      title: product.title,
      description: product.description || undefined,
      images: product.thumbnail ? [getImageUrl(product.thumbnail)] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.handle)

  if (!product) {
    notFound()
  }

  // Get product images (thumbnail + additional images)
  const images = [
    product.thumbnail,
    ...(product.images?.map((img: any) => img.url) || []),
  ].filter(Boolean)

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="bg-[#222] py-4">
        <div className="container-custom">
          <nav className="text-sm text-grey-light">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-white">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Images */}
            <div>
              {/* Main Image */}
              <div className="aspect-square bg-[#222] rounded-lg overflow-hidden mb-4">
                <div className="relative w-full h-full">
                  <Image
                    src={images[0] ? getImageUrl(images[0]) : "/images/brand/candle.webp"}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.slice(1, 5).map((image: string, index: number) => (
                    <div
                      key={index}
                      className="aspect-square bg-[#222] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageUrl(image)}
                          alt={`${product.title} - Image ${index + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 25vw, 12.5vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {product.title}
              </h1>

              {product.subtitle && (
                <p className="text-xl text-grey-light mb-6">{product.subtitle}</p>
              )}

              {/* Price Range */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <div className="text-3xl font-bold">
                    {formatPrice(
                      Math.min(
                        ...product.variants
                          .flatMap((v: any) => v.prices)
                          .filter((p: any) => p.currency_code === "usd")
                          .map((p: any) => p.amount)
                      )
                    )}
                    {product.variants.length > 1 && (
                      <span className="text-lg text-grey-light ml-2">and up</span>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-grey-light whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Metadata */}
              {product.metadata && (
                <div className="bg-[#222] rounded-lg p-6 mb-8">
                  <h3 className="font-bold mb-4">Product Details</h3>
                  <div className="space-y-2 text-sm">
                    {product.metadata.wax_type && (
                      <div className="flex justify-between">
                        <span className="text-grey-light">Wax Type:</span>
                        <span>{product.metadata.wax_type}</span>
                      </div>
                    )}
                    {product.metadata.wick_type && (
                      <div className="flex justify-between">
                        <span className="text-grey-light">Wick Type:</span>
                        <span>{product.metadata.wick_type}</span>
                      </div>
                    )}
                    {product.metadata.scent_notes && (
                      <div className="flex justify-between">
                        <span className="text-grey-light">Scent Notes:</span>
                        <span>{product.metadata.scent_notes}</span>
                      </div>
                    )}
                    {product.metadata.made_in && (
                      <div className="flex justify-between">
                        <span className="text-grey-light">Made In:</span>
                        <span>{product.metadata.made_in}</span>
                      </div>
                    )}
                    {product.metadata.hand_poured && (
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-500">Hand-poured in small batches</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Add to Cart Component (will be client component) */}
              <AddToCartButton product={product} />

              {/* Shipping Info */}
              <div className="mt-8 p-4 bg-[#222] rounded-lg text-sm">
                <h4 className="font-semibold mb-2">Shipping & Pickup</h4>
                <ul className="space-y-1 text-grey-light">
                  <li>✓ Free local pickup in Canton, GA</li>
                  <li>✓ USPS shipping available nationwide</li>
                  <li>✓ Ships within 1-2 business days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section (TODO) */}
      {/* <section className="py-12 bg-[#222]">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            Related products grid
          </div>
        </div>
      </section> */}
    </div>
  )
}
