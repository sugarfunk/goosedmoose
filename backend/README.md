# Goosed Moose E-commerce - Backend

This is the Medusa backend for the Goosed Moose e-commerce platform. It handles products, orders, customers, payments (via Stripe), and more.

## What is this?

This backend is built with **Medusa v2**, an open-source e-commerce engine. Think of it as your store's brain - it manages everything behind the scenes while your Next.js storefront (in `../storefront`) displays products to customers.

## Quick Start

### Prerequisites

1. **Node.js** v18 or higher
2. **PostgreSQL** database
3. **Stripe** account (for payments)

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   # Copy the example file
   cp .env.example .env

   # Edit .env and fill in your values:
   # - DATABASE_URL (PostgreSQL connection string)
   # - STRIPE_API_KEY (from Stripe dashboard)
   # - Other configuration (see .env.example for details)
   ```

3. **Run database migrations:**
   ```bash
   npx medusa migrations run
   ```

   This creates all necessary database tables.

4. **Create your admin user:**
   ```bash
   npx medusa user -e info@goosed.me -p YourSecurePassword
   ```

5. **Seed sample products (optional):**
   ```bash
   npm run seed
   ```

   This adds 3 sample candle products to test with.

6. **Start the server:**
   ```bash
   npm run dev
   ```

You should see:
```
Server is ready on port: 9000
Admin is ready on port: 7001
```

## Accessing Your Backend

- **API**: http://localhost:9000
- **Admin Dashboard**: http://localhost:7001
- **Health Check**: http://localhost:9000/health

## Project Structure

```
backend/
├── src/
│   └── scripts/
│       └── seed.ts          # Sample product data
├── uploads/                 # Product images (local storage)
├── .env                     # Your configuration (DO NOT COMMIT!)
├── .env.example             # Template for configuration
├── medusa-config.ts         # Medusa configuration (Stripe, DB, etc.)
├── package.json             # Dependencies
└── README.md                # You are here!
```

## Documentation

For detailed guides, see the `../docs/` folder:

- **[SETUP.md](../docs/SETUP.md)** - Complete setup instructions
- **[ARCHITECTURE.md](../docs/ARCHITECTURE.md)** - System architecture explained
- **[PRODUCT_MANAGEMENT.md](../docs/PRODUCT_MANAGEMENT.md)** - Managing products guide
- **[DEPLOYMENT.md](../docs/DEPLOYMENT.md)** - Deploying to production

## Common Commands

```bash
# Development
npm run dev              # Start development server with hot reload

# Database
npx medusa migrations run    # Run database migrations
npx medusa user -e EMAIL -p PASSWORD  # Create admin user

# Seeding
npm run seed             # Add sample products

# Building for Production
npm run build            # Compile TypeScript
npm run start            # Start production server
```

## Stripe Configuration

1. Get your API keys from https://dashboard.stripe.com/apikeys
2. Add to `.env`:
   ```env
   STRIPE_API_KEY=sk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_secret
   ```

Apple Pay is automatically enabled when using HTTPS in production!

## Resources

- **Medusa Docs**: https://docs.medusajs.com/
- **Medusa Discord**: https://discord.gg/medusajs
- **Stripe Docs**: https://stripe.com/docs
- **Project Docs**: `../docs/`

---

**Made with ❤️ for Goosed Moose** 🕯️
