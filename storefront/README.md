# Goosed Moose Storefront

Modern e-commerce storefront for Goosed Moose artisan candles, built with Next.js 14 and integrated with Medusa backend.

## Features

### ✅ Implemented

- **Landing Page**: Eye-catching homepage with brand identity, featured products, and CTAs
- **Product Catalog**: Browse all candles with filtering and grid display
- **Product Details**: Detailed product pages with variant selection, image galleries, and add-to-cart
- **Shopping Cart**: Full cart functionality with quantity updates, item removal, and order summary
- **Brand Integration**: Goosed Moose colors, fonts (Montserrat), and assets throughout
- **Responsive Design**: Mobile-first design that works on all devices
- **Cart Persistence**: Cart data saved in localStorage
- **SEO Optimized**: Proper metadata, Open Graph tags, and semantic HTML

### 🚧 Future Enhancements

- **Checkout Flow**: Stripe payment integration (placeholder link exists)
- **Customer Accounts**: Order history and saved addresses
- **Product Reviews**: Customer testimonials and ratings
- **Search**: Full-text product search
- **Filtering**: Filter by scent, size, price range

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Medusa backend running at `http://localhost:9000`
- Products seeded in the backend

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Environment Variables

See `.env.local.example` for all available options. Key variables:

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Project Structure

```
storefront/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Landing page
│   │   ├── products/         # Product pages
│   │   ├── cart/             # Shopping cart
│   │   └── about/            # About page
│   ├── components/           # Reusable components
│   │   ├── layout/           # Header, Footer
│   │   └── product/          # Product components
│   └── lib/                  # Utilities and context
│       ├── medusa-client.ts  # Medusa SDK
│       └── cart-context.tsx  # Cart state
└── public/images/brand/      # Brand assets
```

## Documentation

For detailed information, see:

- **[../docs/SETUP.md](../docs/SETUP.md)** - Complete setup guide
- **[../docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)** - System architecture
- **[../docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md)** - Deployment guide

## Common Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Run production build
npm run lint       # Run ESLint
```

## Technologies

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS v4
- Medusa JS SDK
- React Context for state management

---

**Made with ❤️ for Goosed Moose** 🕯️
