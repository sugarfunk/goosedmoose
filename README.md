# Goosed Moose E-commerce Platform

Complete e-commerce solution for Goosed Moose artisan candles, built with Medusa.js (backend) and Next.js (storefront).

## Project Overview

This repository contains a modern, production-ready e-commerce platform specifically designed for the Goosed Moose brand. The platform consists of two main components:

1. **Backend** (`/backend`) - Medusa v2 e-commerce engine
2. **Storefront** (`/storefront`) - Next.js 14 customer-facing website

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials and Stripe keys
npx medusa migrations run
npx medusa user -e info@goosed.me -p YourPassword
npm run seed
npm run dev
```

Backend runs at: http://localhost:9000
Admin dashboard: http://localhost:7001

### 2. Storefront Setup

```bash
cd storefront
npm install
cp .env.local.example .env.local
# Edit .env.local with backend URL
npm run dev
```

Storefront runs at: http://localhost:3000

## Project Structure

```
goosedmoose/
├── backend/              # Medusa backend (API + Admin)
│   ├── src/             # Custom code
│   │   └── scripts/     # Seed scripts with sample products
│   ├── .env.example     # Environment template
│   └── README.md        # Backend documentation
│
├── storefront/          # Next.js storefront
│   ├── src/
│   │   ├── app/        # Pages (landing, products, cart, about)
│   │   ├── components/ # Reusable UI components
│   │   └── lib/        # Utilities and state management
│   ├── public/         # Static assets and brand images
│   └── README.md       # Storefront documentation
│
├── docs/               # Comprehensive documentation
│   ├── ARCHITECTURE.md # System architecture explained
│   ├── SETUP.md        # Development setup guide
│   ├── PRODUCT_MANAGEMENT.md # Managing products
│   └── DEPLOYMENT.md   # Production deployment
│
└── gm-parked/          # Original site (brand reference)
```

## Features

### ✅ Implemented

**Backend:**
- Medusa v2 with PostgreSQL database
- Stripe payment provider (Apple Pay ready)
- Product catalog with inventory tracking
- Variant support (sizes: 2oz, 4oz, 8oz, 16oz)
- Sample seed script with 3 candles
- Admin dashboard for product management
- RESTful API for storefront

**Storefront:**
- Landing page with Goosed Moose branding
- Product catalog page with grid layout
- Product detail pages with variant selection
- Shopping cart with localStorage persistence
- Add to cart functionality
- Cart management (update quantities, remove items)
- About page with brand story
- Responsive mobile-first design
- SEO optimization with metadata
- Montserrat font and brand colors

**Documentation:**
- Complete architecture guide
- Step-by-step setup instructions
- Product management tutorial
- Deployment guide for Railway/Vercel
- Troubleshooting guides

### 🚧 Future Enhancements

- Stripe checkout integration
- Order confirmation emails (SMTP)
- Customer accounts and order history
- Shipping rate calculation
- Product reviews and ratings
- Product search and filtering
- Wishlist functionality
- Newsletter signup
- Blog/content pages

## Technologies

### Backend
- **Medusa v2** - Headless e-commerce engine
- **PostgreSQL** - Database
- **Stripe** - Payment processing
- **Node.js** - Runtime

### Storefront
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Medusa JS SDK** - API client
- **React Context** - State management

## Key Configuration

### Backend Environment Variables
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/goosedmoose
STRIPE_API_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
STORE_CORS=http://localhost:3000
```

### Storefront Environment Variables
```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Documentation

Comprehensive guides are available in the `/docs` folder:

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - How everything works together
- **[SETUP.md](docs/SETUP.md)** - Detailed setup for beginners
- **[PRODUCT_MANAGEMENT.md](docs/PRODUCT_MANAGEMENT.md)** - Adding/managing products
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Going to production

Each component also has its own README:
- **[backend/README.md](backend/README.md)** - Backend-specific docs
- **[storefront/README.md](storefront/README.md)** - Storefront-specific docs

## Development Workflow

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Storefront**: `cd storefront && npm run dev`
3. **Access Admin**: http://localhost:7001 (manage products)
4. **Access Store**: http://localhost:3000 (customer view)
5. **Make Changes**: Edit code, auto-reload on save
6. **Test**: Browse products, add to cart, check out flow

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

**Recommended Stack:**
- **Database**: Railway PostgreSQL (~$5/mo)
- **Backend**: Railway (~$5/mo)
- **Storefront**: Vercel (Free tier)

**Total Cost**: ~$10/month to start

## Support

For issues or questions:

1. Check the documentation in `/docs`
2. Review component READMEs
3. Search Medusa docs: https://docs.medusajs.com
4. Check Next.js docs: https://nextjs.org/docs

## Brand Assets

The Goosed Moose brand assets are located in:
- `gm-parked/assets/` - Original brand files
- `storefront/public/images/brand/` - Storefront copies

## License

Custom build for Goosed Moose. All rights reserved.

---

**Built with ❤️ for Goosed Moose**
*Hand-poured artisan candles from Macedonia, GA*
