# Goosed Moose E-commerce Architecture

## Overview

This document explains the architecture of the Goosed Moose e-commerce platform, built with Medusa.js for the backend and Next.js for the storefront.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Goosed Moose E-commerce                   │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌─────────────────────────┐
│   STOREFRONT         │         │   MEDUSA BACKEND        │
│   (Next.js 14+)      │ ◄─────► │   (Node.js)             │
│                      │  REST   │                         │
│  • Landing Page      │  API    │  • Product Management   │
│  • Product Catalog   │         │  • Order Processing     │
│  • Shopping Cart     │         │  • Customer Accounts    │
│  • Checkout          │         │  • Inventory Tracking   │
│  • Account Dashboard │         │  • Admin Dashboard      │
└──────────────────────┘         └─────────────────────────┘
         │                                    │
         │                                    │
         v                                    v
┌──────────────────────┐         ┌─────────────────────────┐
│   Stripe             │         │   PostgreSQL            │
│                      │         │                         │
│  • Card Payments     │         │  • Products             │
│  • Apple Pay         │         │  • Orders               │
│  • Google Pay        │         │  • Customers            │
│  • Checkout Sessions │         │  • Inventory            │
└──────────────────────┘         └─────────────────────────┘
```

## Technology Stack

### Backend
- **Medusa v2**: Modern, open-source e-commerce engine
  - Built on Node.js
  - Modular architecture
  - Headless commerce approach
- **PostgreSQL**: Relational database for all data
- **Stripe**: Payment processing with Apple Pay support
- **Node.js**: Runtime environment

### Storefront
- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Medusa JS Client**: Official SDK for API calls

## What is Medusa?

Medusa is a **headless commerce engine** that provides:

1. **Backend API**: RESTful API for all e-commerce operations
2. **Admin Dashboard**: Web interface for managing products, orders, customers
3. **Flexibility**: Build any frontend you want (we're using Next.js)

### Key Concepts

**Headless Commerce**: The backend (Medusa) is separate from the frontend (Next.js storefront). They communicate via API calls. This means:
- You can redesign the storefront without touching the backend
- You could build mobile apps, voice commerce, etc., all using the same backend
- Each piece can be deployed and scaled independently

**Why Medusa over Shopify/WooCommerce?**
- Full control over your code and data
- No transaction fees
- Highly customizable
- Modern developer experience
- Open source and free

## Project Structure

```
goosedmoose/
├── backend/                    # Medusa backend application
│   ├── src/
│   │   ├── admin/             # Admin dashboard customizations
│   │   ├── api/               # Custom API endpoints
│   │   ├── models/            # Database models
│   │   ├── services/          # Business logic
│   │   └── subscribers/       # Event handlers
│   ├── uploads/               # Product images
│   ├── .env                   # Backend environment variables
│   ├── medusa-config.js       # Main Medusa configuration
│   └── package.json           # Backend dependencies
│
├── storefront/                # Next.js storefront application
│   ├── src/
│   │   ├── app/              # Pages (App Router)
│   │   │   ├── page.tsx      # Landing page
│   │   │   ├── products/     # Product pages
│   │   │   ├── cart/         # Shopping cart
│   │   │   └── account/      # Customer account
│   │   ├── components/        # Reusable UI components
│   │   ├── lib/              # Utilities & Medusa client
│   │   └── styles/           # Global styles
│   ├── public/               # Static assets
│   ├── .env.local            # Storefront environment variables
│   └── package.json          # Frontend dependencies
│
├── docs/                      # Documentation (you are here!)
│   ├── ARCHITECTURE.md       # This file
│   ├── SETUP.md              # Development setup guide
│   ├── DEPLOYMENT.md         # Production deployment
│   └── PRODUCT_MANAGEMENT.md # Managing products guide
│
└── gm-parked/                # Original website (reference only)
```

## Data Flow Example: Customer Makes a Purchase

1. **Customer browses products** → Next.js storefront requests products from Medusa API
2. **Medusa returns product data** → Including prices, images, inventory
3. **Customer adds to cart** → Cart stored in browser + synced with Medusa
4. **Customer clicks checkout** → Storefront creates Stripe checkout session via Medusa
5. **Customer pays with Apple Pay** → Stripe processes payment
6. **Payment succeeds** → Medusa creates order, reduces inventory
7. **Order confirmation** → Customer sees success page (email sent via SMTP later)
8. **You fulfill order** → View order in Medusa Admin, mark as shipped

## Product Structure

### Categories
- Candles
  - Seasonal
  - Signature Scents
  - Limited Edition
- Future categories: T-Shirts, Laser Engraved Items, Vinyl Work

### Product Variants
Each candle can have multiple variants based on:
- **Size**: 2oz, 4oz, 8oz, 16oz
- **Scent**: Pine + Ginger + Orange, etc.

### Inventory Tracking
- Real-time stock levels per variant
- Low stock warnings in admin
- Automatic "sold out" display on storefront

### Shipping Options
1. **Local Pickup**: Free pickup in Canton, GA
2. **USPS Shipping**: Calculated based on weight and distance

## Security Considerations

1. **Environment Variables**: All secrets stored in .env files (not committed to git)
2. **API Keys**: Stripe keys kept server-side only
3. **HTTPS**: Required for production (Stripe requirement)
4. **Payment Security**: Stripe handles all payment data (PCI compliant)
5. **Admin Access**: Protected by authentication

## Performance

- **Database**: PostgreSQL for reliable data storage
- **Image Optimization**: Next.js automatic image optimization
- **Static Generation**: Product pages can be pre-rendered for speed
- **API Caching**: Reduce database queries

## Scalability

This architecture can grow with your business:
- Add more product categories easily
- Support wholesale/B2B customers
- Add subscriptions (monthly candle deliveries)
- Multi-location inventory
- Mobile app using same Medusa backend

## Monitoring & Maintenance

**What You'll Need to Monitor:**
- Order notifications (via email when configured)
- Inventory levels (low stock alerts)
- Customer inquiries
- Payment processing issues

**Regular Maintenance:**
- Update product inventory
- Add new products/scents
- Review and fulfill orders
- Back up database periodically

## Next Steps

1. Read [SETUP.md](./SETUP.md) - Set up your development environment
2. Read [PRODUCT_MANAGEMENT.md](./PRODUCT_MANAGEMENT.md) - Learn to manage products
3. Read [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy to production

## Questions?

If anything is unclear, refer to:
- [Medusa Documentation](https://docs.medusajs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe Documentation](https://stripe.com/docs)
