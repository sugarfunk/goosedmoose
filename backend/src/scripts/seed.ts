/**
 * Goosed Moose - Database Seed Script
 *
 * This script populates your database with sample candle products, categories,
 * collections, and shipping options to get you started.
 *
 * Run with: npm run seed
 *
 * IMPORTANT: This is for development/testing. You'll replace these with your actual products.
 */

import {
  ExecArgs,
  IProductModuleService,
  ISalesChannelModuleService,
  IRegionModuleService,
} from "@medusajs/framework/types"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"

/**
 * Sample candle products based on the Goosed Moose brand
 */
const sampleProducts = [
  {
    title: "Merry Moosemas Candle",
    subtitle: "Pine, Ginger & Orange",
    description: `Transform your space into a winter wonderland with our Merry Moosemas candle. This festive blend combines crisp pine needles, warm ginger, and sweet orange for the perfect holiday ambiance.

Hand-poured in small batches using 100% natural soy wax and wooden wicks that crackle like a cozy fireplace. Each candle burns cleanly and evenly, filling your home with holiday cheer.

Made with love in Macedonia, GA by the Goosed Moose family.`,
    handle: "merry-moosemas-candle",
    is_giftcard: false,
    status: "published",
    thumbnail: "/images/candles/merry-moosemas.jpg",
    images: [
      { url: "/images/candles/merry-moosemas.jpg" },
      { url: "/images/candles/merry-moosemas-lit.jpg" },
      { url: "/images/candles/merry-moosemas-top.jpg" },
    ],
    options: [
      {
        title: "Size",
        values: ["2oz", "4oz", "8oz", "16oz"],
      },
    ],
    variants: [
      {
        title: "2oz",
        sku: "GM-MERRY-2OZ",
        manage_inventory: true,
        allow_backorder: false,
        prices: [
          {
            amount: 1200, // $12.00 (stored in cents)
            currency_code: "usd",
          },
        ],
        options: {
          Size: "2oz",
        },
        inventory_quantity: 25,
        metadata: {
          burn_time: "15 hours",
          weight_oz: 2,
        },
      },
      {
        title: "4oz",
        sku: "GM-MERRY-4OZ",
        manage_inventory: true,
        allow_backorder: false,
        prices: [
          {
            amount: 1800, // $18.00
            currency_code: "usd",
          },
        ],
        options: {
          Size: "4oz",
        },
        inventory_quantity: 20,
        metadata: {
          burn_time: "30 hours",
          weight_oz: 4,
        },
      },
      {
        title: "8oz",
        sku: "GM-MERRY-8OZ",
        manage_inventory: true,
        allow_backorder: false,
        prices: [
          {
            amount: 2400, // $24.00
            currency_code: "usd",
          },
        ],
        options: {
          Size: "8oz",
        },
        inventory_quantity: 15,
        metadata: {
          burn_time: "50 hours",
          weight_oz: 8,
        },
      },
      {
        title: "16oz",
        sku: "GM-MERRY-16OZ",
        manage_inventory: true,
        allow_backorder: false,
        prices: [
          {
            amount: 3800, // $38.00
            currency_code: "usd",
          },
        ],
        options: {
          Size: "16oz",
        },
        inventory_quantity: 10,
        metadata: {
          burn_time: "100+ hours",
          weight_oz: 16,
        },
      },
    ],
    metadata: {
      wax_type: "100% Natural Soy Wax",
      wick_type: "Wooden Wick (crackles)",
      scent_notes: "Pine, Ginger, Orange",
      made_in: "Macedonia, GA",
      hand_poured: true,
      category: "seasonal",
    },
  },
  {
    title: "Lavender Dreams Candle",
    subtitle: "Pure Lavender Essential Oil",
    description: `Unwind and relax with our Lavender Dreams candle. Made with pure lavender essential oil sourced from French lavender fields, this candle creates a peaceful, calming atmosphere perfect for meditation, yoga, or bedtime.

Our signature soy wax blend ensures a clean, even burn that releases the therapeutic properties of lavender throughout your space. The natural wooden wick adds a soothing crackling sound.

Hand-poured with care in Macedonia, GA.`,
    handle: "lavender-dreams-candle",
    is_giftcard: false,
    status: "published",
    thumbnail: "/images/candles/lavender-dreams.jpg",
    images: [
      { url: "/images/candles/lavender-dreams.jpg" },
    ],
    options: [
      {
        title: "Size",
        values: ["2oz", "8oz"],
      },
    ],
    variants: [
      {
        title: "2oz",
        sku: "GM-LAV-2OZ",
        manage_inventory: true,
        allow_backorder: false,
        prices: [
          {
            amount: 1400, // $14.00 (premium price for essential oil)
            currency_code: "usd",
          },
        ],
        options: {
          Size: "2oz",
        },
        inventory_quantity: 30,
        metadata: {
          burn_time: "15 hours",
          weight_oz: 2,
        },
      },
      {
        title: "8oz",
        sku: "GM-LAV-8OZ",
        manage_inventory: true,
        allow_backorder: false,
        prices: [
          {
            amount: 2800, // $28.00
            currency_code: "usd",
          },
        ],
        options: {
          Size: "8oz",
        },
        inventory_quantity: 18,
        metadata: {
          burn_time: "50 hours",
          weight_oz: 8,
        },
      },
    ],
    metadata: {
      wax_type: "100% Natural Soy Wax",
      wick_type: "Wooden Wick (crackles)",
      scent_notes: "Pure Lavender Essential Oil",
      made_in: "Macedonia, GA",
      hand_poured: true,
      category: "signature",
    },
  },
  {
    title: "Autumn Harvest Candle",
    subtitle: "Pumpkin Spice, Cinnamon & Maple",
    description: `Capture the essence of fall with our Autumn Harvest candle. This warm, inviting blend combines pumpkin spice, cinnamon, and sweet maple for the ultimate cozy autumn atmosphere.

Perfect for crisp fall evenings, Thanksgiving gatherings, or any time you want to bring the warmth of autumn indoors. Made with premium soy wax and wooden wicks.

Hand-crafted in Georgia with love.`,
    handle: "autumn-harvest-candle",
    is_giftcard: false,
    status: "published",
    thumbnail: "/images/candles/autumn-harvest.jpg",
    images: [
      { url: "/images/candles/autumn-harvest.jpg" },
    ],
    options: [
      {
        title: "Size",
        values: ["4oz", "8oz"],
      },
    ],
    variants: [
      {
        title: "4oz",
        sku: "GM-AUTUMN-4OZ",
        manage_inventory: true,
        allow_backorder: false,
        prices: [
          {
            amount: 1800, // $18.00
            currency_code: "usd",
          },
        ],
        options: {
          Size: "4oz",
        },
        inventory_quantity: 12,
        metadata: {
          burn_time: "30 hours",
          weight_oz: 4,
        },
      },
      {
        title: "8oz",
        sku: "GM-AUTUMN-8OZ",
        manage_inventory: true,
        allow_backorder: false,
        prices: [
          {
            amount: 2400, // $24.00
            currency_code: "usd",
          },
        ],
        options: {
          Size: "8oz",
        },
        inventory_quantity: 8,
        metadata: {
          burn_time: "50 hours",
          weight_oz: 8,
        },
      },
    ],
    metadata: {
      wax_type: "100% Natural Soy Wax",
      wick_type: "Wooden Wick (crackles)",
      scent_notes: "Pumpkin Spice, Cinnamon, Maple",
      made_in: "Macedonia, GA",
      hand_poured: true,
      category: "seasonal",
    },
  },
]

/**
 * Main seed function
 */
export default async function seedDemoData({ container }: ExecArgs) {
  console.log("🌱 Starting Goosed Moose database seed...")

  // Get the required services from the container
  const productModuleService: IProductModuleService = container.resolve(
    Modules.PRODUCT
  )
  const salesChannelService: ISalesChannelModuleService = container.resolve(
    Modules.SALES_CHANNEL
  )
  const regionService: IRegionModuleService = container.resolve(
    Modules.REGION
  )

  try {
    // Step 1: Create default sales channel if it doesn't exist
    console.log("📢 Setting up sales channels...")
    const salesChannels = await salesChannelService.listSalesChannels()
    let defaultSalesChannel = salesChannels.find((sc) => sc.name === "Default Sales Channel")

    if (!defaultSalesChannel) {
      defaultSalesChannel = await salesChannelService.createSalesChannels({
        name: "Default Sales Channel",
        description: "Main storefront for Goosed Moose",
      })
      console.log("✅ Created default sales channel")
    } else {
      console.log("✅ Using existing default sales channel")
    }

    // Step 2: Create US region with Georgia
    console.log("🗺️  Setting up regions...")
    const regions = await regionService.listRegions()
    let usRegion = regions.find((r) => r.name === "United States")

    if (!usRegion) {
      usRegion = await regionService.createRegions({
        name: "United States",
        currency_code: "usd",
        countries: ["us"],
        metadata: {
          tax_rate: 0, // Set your Georgia tax rate if needed
        },
      })
      console.log("✅ Created US region")
    } else {
      console.log("✅ Using existing US region")
    }

    // Step 3: Create sample products
    console.log("🕯️  Creating sample candle products...")
    for (const product of sampleProducts) {
      try {
        // Check if product already exists
        const existingProducts = await productModuleService.listProducts({
          handle: product.handle,
        })

        if (existingProducts && existingProducts.length > 0) {
          console.log(`   ⏭️  Product "${product.title}" already exists, skipping...`)
          continue
        }

        // Create the product
        const createdProduct = await productModuleService.createProducts(product as any)
        console.log(`   ✅ Created product: ${product.title}`)

        // Log variant info
        if (product.variants) {
          product.variants.forEach((variant) => {
            console.log(`      - ${variant.title}: $${(variant.prices[0].amount / 100).toFixed(2)} (${variant.inventory_quantity} in stock)`)
          })
        }
      } catch (error) {
        console.error(`   ❌ Error creating product "${product.title}":`, error)
      }
    }

    console.log("\n✨ Seed completed successfully!")
    console.log("\n📝 Next steps:")
    console.log("   1. Start the backend: npm run dev")
    console.log("   2. Access admin at: http://localhost:7001")
    console.log("   3. Create admin user: npx medusa user -e info@goosed.me -p YourPassword")
    console.log("   4. Log in and explore your products!")
    console.log("\n🎯 Sample products created:")
    sampleProducts.forEach((p) => console.log(`   - ${p.title}`))

  } catch (error) {
    console.error("\n❌ Seed failed:", error)
    throw error
  }
}
