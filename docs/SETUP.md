# Goosed Moose - Development Setup Guide

This guide will walk you through setting up the Goosed Moose e-commerce platform on your local machine.

## Prerequisites

Before you begin, make sure you have these installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Check version: `node --version`

2. **PostgreSQL** (v14 or higher)
   - Download from: https://www.postgresql.org/download/
   - Check version: `psql --version`

3. **Git** (for version control)
   - Download from: https://git-scm.com/
   - Check version: `git --version`

4. **A code editor** (VS Code recommended)
   - Download from: https://code.visualstudio.com/

## Step-by-Step Setup

### 1. Clone the Repository

```bash
cd /path/to/where/you/want/the/project
git clone <your-repo-url>
cd goosedmoose
```

### 2. Set Up PostgreSQL Database

#### Create a Database

Open PostgreSQL command line (psql) or use a GUI tool like pgAdmin:

```sql
-- Create the database for Medusa
CREATE DATABASE goosedmoose;

-- Create a user (optional, or use your existing postgres user)
CREATE USER goosedmoose_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE goosedmoose TO goosedmoose_user;
```

**What is PostgreSQL?**
PostgreSQL is a database system that stores all your products, orders, and customer data in an organized way. Think of it as a super-powered Excel spreadsheet that your application talks to.

### 3. Set Up Medusa Backend

#### Install Dependencies

```bash
cd backend
npm install
```

This downloads all the code libraries that Medusa needs to run.

#### Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cp .env.example .env
```

Edit the `.env` file with your settings:

```env
# Database connection
DATABASE_URL=postgresql://goosedmoose_user:your_secure_password@localhost:5432/goosedmoose

# Medusa configuration
PORT=9000
ADMIN_CORS=http://localhost:7001,http://localhost:7000
STORE_CORS=http://localhost:3000,http://localhost:8000
JWT_SECRET=something-super-secret-change-this
COOKIE_SECRET=something-super-secret-change-this-too

# Stripe configuration (you'll get these from Stripe dashboard)
STRIPE_API_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

**Where to get Stripe keys:**
1. Sign up at https://stripe.com
2. Go to Developers > API Keys
3. Copy the "Secret key" (starts with `sk_test_`)
4. We'll set up webhooks later

#### Run Database Migrations

This creates all the necessary tables in your PostgreSQL database:

```bash
npx medusa migrations run
```

You should see output showing tables being created (products, orders, customers, etc.)

#### Create Your Admin User

```bash
npx medusa user -e info@goosed.me -p your_secure_password
```

Replace with your actual email and a strong password. You'll use this to log into the admin dashboard.

#### Seed Initial Data (Optional)

You can add sample products to test with:

```bash
npm run seed
```

#### Start the Backend

```bash
npm run dev
```

You should see:
```
Server is ready on port: 9000
Admin is ready on port: 7001
```

**Test it:** Open http://localhost:7001 in your browser. You should see the Medusa Admin login page.

### 4. Set Up Next.js Storefront

Open a **new terminal** (keep the backend running):

```bash
cd storefront
npm install
```

#### Configure Storefront Environment

Create `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Medusa backend URL
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

# Stripe publishable key (safe to expose in browser)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

#### Start the Storefront

```bash
npm run dev
```

You should see:
```
- Local:        http://localhost:3000
```

**Test it:** Open http://localhost:3000 - you should see the Goosed Moose landing page!

## Verify Everything Works

### Check the Admin Dashboard

1. Go to http://localhost:7001
2. Log in with the admin credentials you created
3. You should see the Medusa Admin dashboard

### Check the Storefront

1. Go to http://localhost:3000
2. You should see the Goosed Moose landing page
3. Navigate to products (once we add them)

## Common Setup Issues

### Port Already in Use

**Error:** `Port 9000 is already in use`

**Solution:**
```bash
# Find what's using the port
lsof -i :9000

# Kill that process
kill -9 <PID>

# Or change the port in backend/.env
PORT=9001
```

### Database Connection Failed

**Error:** `Error connecting to database`

**Solution:**
1. Make sure PostgreSQL is running
2. Check your DATABASE_URL in `.env`
3. Verify the database exists: `psql -l` (should list goosedmoose)
4. Check username/password are correct

### Node Version Issues

**Error:** `The engine "node" is incompatible`

**Solution:**
```bash
# Check your Node version
node --version

# You need v18 or higher - upgrade Node.js
```

### Missing Environment Variables

**Error:** `Missing required environment variable`

**Solution:**
1. Make sure you created the `.env` files (backend and storefront)
2. Check you copied all required variables
3. No spaces around the `=` sign

## Development Workflow

### Daily Development

1. **Start the backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the storefront** (in a new terminal):
   ```bash
   cd storefront
   npm run dev
   ```

3. **Make changes** to code
4. Both servers will auto-reload when you save files

### Adding Products

1. Go to Admin Dashboard: http://localhost:7001
2. Click "Products" in sidebar
3. Click "New Product"
4. Fill in details (we'll cover this in PRODUCT_MANAGEMENT.md)

### Testing Checkout

1. Add products to cart on storefront
2. Proceed to checkout
3. Use Stripe test card: `4242 4242 4242 4242`
4. Any future date for expiry
5. Any 3-digit CVC

## Project Structure Explained

```
backend/
├── src/                  # Your custom code goes here
├── uploads/             # Product images stored here
├── .env                 # Configuration (never commit this!)
└── medusa-config.js     # Medusa settings

storefront/
├── src/
│   ├── app/            # Pages (each folder = a route)
│   ├── components/     # Reusable UI pieces
│   └── lib/            # Helper functions
├── public/             # Images, fonts, etc.
└── .env.local          # Configuration (never commit this!)
```

## Environment Variables Explained

**Backend `.env`:**

- `DATABASE_URL`: Tells Medusa where your PostgreSQL database is
- `PORT`: Which port the backend runs on (default: 9000)
- `ADMIN_CORS`: Which URLs can access the admin API
- `STORE_CORS`: Which URLs can access the store API
- `JWT_SECRET`: Used to encrypt user sessions (keep secret!)
- `STRIPE_API_KEY`: Your Stripe secret key (keeps transactions secure)

**Storefront `.env.local`:**

- `NEXT_PUBLIC_MEDUSA_BACKEND_URL`: Where to find the Medusa API
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Public Stripe key (safe for browsers)

**Why NEXT_PUBLIC_?**
In Next.js, environment variables are server-only by default. `NEXT_PUBLIC_` makes them available in the browser (only use for non-secret values).

## Git Workflow

```bash
# Make sure you're on your feature branch
git checkout claude/goosed-moose-ecommerce-01SRPZB46iTonijL4DouRtEf

# Check what changed
git status

# Add your changes
git add .

# Commit with a descriptive message
git commit -m "Set up Medusa backend with Stripe integration"

# Push to remote
git push -u origin claude/goosed-moose-ecommerce-01SRPZB46iTonijL4DouRtEf
```

## Next Steps

1. ✅ You have the development environment running!
2. 📖 Read [PRODUCT_MANAGEMENT.md](./PRODUCT_MANAGEMENT.md) to learn how to add products
3. 🎨 Customize the storefront design to match your brand
4. 🚀 When ready, read [DEPLOYMENT.md](./DEPLOYMENT.md) to go live

## Need Help?

- **Medusa Docs:** https://docs.medusajs.com/
- **Next.js Docs:** https://nextjs.org/docs
- **Stripe Test Mode:** https://stripe.com/docs/testing
- **PostgreSQL Docs:** https://www.postgresql.org/docs/

## Quick Reference Commands

```bash
# Backend
cd backend
npm run dev              # Start development server
npx medusa migrations run # Run database migrations
npx medusa user          # Create admin user

# Storefront
cd storefront
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Run production build

# Database
psql goosedmoose         # Connect to database
\dt                      # List all tables
\q                       # Quit psql
```

---

**You're all set!** The development environment is ready for building the Goosed Moose e-commerce platform.
