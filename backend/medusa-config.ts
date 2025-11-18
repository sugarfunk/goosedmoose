/**
 * Goosed Moose E-commerce - Medusa Backend Configuration
 *
 * This file configures the Medusa backend for the Goosed Moose e-commerce platform.
 * It sets up database connections, payment providers (Stripe), and other core services.
 *
 * Learn more: https://docs.medusajs.com/
 */

import { loadEnv, defineConfig } from '@medusajs/framework/utils'

// Load environment variables from .env file
loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    // PostgreSQL database connection
    // Configure this in your .env file: DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
    databaseUrl: process.env.DATABASE_URL,

    // HTTP server configuration
    http: {
      // Allowed origins for store API calls (your storefront)
      storeCors: process.env.STORE_CORS!,

      // Allowed origins for admin dashboard
      adminCors: process.env.ADMIN_CORS!,

      // Allowed origins for authentication
      authCors: process.env.AUTH_CORS!,

      // Secret key for JWT authentication tokens
      // IMPORTANT: Use a strong secret in production!
      jwtSecret: process.env.JWT_SECRET || "supersecret",

      // Secret key for session cookies
      // IMPORTANT: Use a strong secret in production!
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },

  /**
   * Modules configuration
   * Modules are the building blocks of Medusa - they handle payments, fulfillment, etc.
   */
  modules: [
    {
      /**
       * Stripe Payment Provider
       * Handles credit card payments, Apple Pay, Google Pay, etc.
       *
       * Get your Stripe keys from: https://dashboard.stripe.com/apikeys
       * Webhook setup: https://dashboard.stripe.com/webhooks
       */
      resolve: "@medusajs/payment-stripe",
      options: {
        // Your Stripe Secret API Key (sk_test_... for testing, sk_live_... for production)
        apiKey: process.env.STRIPE_API_KEY,

        // Webhook secret for verifying webhook signatures
        // This ensures webhook calls are actually from Stripe
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,

        /**
         * Payment Method Options
         * These enable different payment methods in the Stripe checkout
         */
        paymentIntentOptions: {
          // Automatically confirms payment intents (simpler flow)
          automatic_payment_methods: {
            enabled: true,
            // This enables Apple Pay, Google Pay, and other wallet payments
            allow_redirects: "never",
          },
          // Captures payment immediately when authorized
          capture_method: "automatic",
        },
      },
    },
  ],
})
