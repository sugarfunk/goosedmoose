# Deployment Guide

This guide walks you through deploying your Goosed Moose e-commerce platform to production.

## Deployment Overview

We'll deploy three components:

1. **PostgreSQL Database** - Hosted database service
2. **Medusa Backend** - API server (Railway, Render, or DigitalOcean)
3. **Next.js Storefront** - Customer-facing website (Vercel)

## Recommended Hosting Stack

| Component | Service | Cost | Why |
|-----------|---------|------|-----|
| Database | Railway PostgreSQL | ~$5/mo | Easy setup, automatic backups |
| Backend | Railway | ~$5/mo | Simple deployment, great for Medusa |
| Storefront | Vercel | Free | Optimized for Next.js, generous free tier |

**Total estimated cost: ~$10/month** (scales with traffic)

## Prerequisites

Before deploying:

- [ ] Your code is pushed to GitHub
- [ ] You have a Stripe account (test mode → live mode)
- [ ] You have a domain name (optional but recommended)
- [ ] All features tested locally

## Part 1: Deploy Database (Railway)

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub
3. Verify your email

### Step 2: Create PostgreSQL Database

1. Click **"New Project"**
2. Select **"Provision PostgreSQL"**
3. Railway creates a database instantly
4. Click on the **PostgreSQL** service
5. Go to **"Variables"** tab
6. Copy the **`DATABASE_URL`** (you'll need this!)

Example:
```
postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway
```

### Step 3: Configure Database

The database is ready to use - Railway handles all configuration!

**Optional**: Set up automatic backups
1. Go to database settings
2. Enable automatic backups (recommended)

## Part 2: Deploy Medusa Backend (Railway)

### Step 1: Prepare Backend for Production

In your `backend/medusa-config.js`, make sure you have production settings:

```javascript
// Already configured in the file we'll create
const DATABASE_URL = process.env.DATABASE_URL
const ADMIN_CORS = process.env.ADMIN_CORS || "https://yourdomain.com"
const STORE_CORS = process.env.STORE_CORS || "https://shop.yourdomain.com"
```

### Step 2: Create Backend Service on Railway

1. In Railway dashboard, click **"New"** → **"GitHub Repo"**
2. Select your `goosedmoose` repository
3. Railway detects it's a Node.js project
4. Set root directory to `backend`

### Step 3: Configure Environment Variables

In Railway, go to your backend service → **Variables** tab:

Add all these variables:

```env
# Database (use the URL from Part 1)
DATABASE_URL=postgresql://postgres:password@containers...

# Medusa
PORT=9000
NODE_ENV=production

# CORS (update with your actual domain)
ADMIN_CORS=https://yourdomain.com
STORE_CORS=https://shop.yourdomain.com,https://www.shop.yourdomain.com

# Secrets (generate new ones for production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-now
COOKIE_SECRET=your-super-secret-cookie-key-change-this-now

# Stripe (LIVE keys from Stripe dashboard)
STRIPE_API_KEY=sk_live_your_actual_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

**How to generate secure secrets:**
```bash
# Run this in your terminal to generate random secrets
openssl rand -base64 32
```

### Step 4: Deploy Backend

1. Railway automatically builds and deploys when you push to GitHub
2. Wait for deployment to complete (check logs)
3. Once deployed, Railway gives you a URL like:
   ```
   https://goosedmoose-backend.up.railway.app
   ```

### Step 5: Run Database Migrations

Railway provides a shell for running commands:

1. Go to your backend service
2. Click **"Shell"** tab (or use Railway CLI)
3. Run migrations:
   ```bash
   npx medusa migrations run
   ```
4. Create admin user:
   ```bash
   npx medusa user -e info@goosed.me -p YourSecurePassword
   ```

### Step 6: Verify Backend is Running

Visit: `https://your-backend-url.railway.app/health`

You should see:
```json
{
  "message": "OK"
}
```

Admin dashboard: `https://your-backend-url.railway.app/app`

## Part 3: Configure Stripe for Production

### Step 1: Activate Stripe Account

1. Go to https://dashboard.stripe.com
2. Complete account activation
3. Provide business details, banking info
4. Wait for approval (usually quick for US businesses)

### Step 2: Get Live API Keys

1. Toggle from **Test Mode** to **Live Mode** (top right)
2. Go to **Developers** → **API Keys**
3. Copy your **Live** keys:
   - Secret key (starts with `sk_live_`)
   - Publishable key (starts with `pk_live_`)

### Step 3: Set Up Webhooks

Webhooks tell your backend when payments succeed:

1. In Stripe dashboard: **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. Endpoint URL:
   ```
   https://your-backend-url.railway.app/hooks/stripe
   ```
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`
5. Click **"Add endpoint"**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add to Railway backend variables as `STRIPE_WEBHOOK_SECRET`

### Step 4: Enable Apple Pay

1. In Stripe dashboard: **Settings** → **Payment Methods**
2. Enable **Apple Pay**
3. Add your domain(s)
4. Verify domain (Stripe provides instructions)

Apple Pay will automatically appear for eligible customers (iPhone/Mac).

## Part 4: Deploy Storefront (Vercel)

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Verify email

### Step 2: Import Project

1. Click **"Add New"** → **"Project"**
2. Import your `goosedmoose` repository
3. Configure project:
   - **Root Directory**: `storefront`
   - **Framework**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Configure Environment Variables

In Vercel project settings → **Environment Variables**:

```env
# Medusa backend (use your Railway URL)
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-backend-url.railway.app

# Stripe (use LIVE publishable key)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_publishable_key

# Optional: Analytics, etc.
```

### Step 4: Deploy

1. Click **"Deploy"**
2. Vercel builds and deploys (takes 2-3 minutes)
3. You get a URL like:
   ```
   https://goosedmoose.vercel.app
   ```

### Step 5: Add Custom Domain (Optional)

1. In Vercel project → **Settings** → **Domains**
2. Add your domain: `shop.goosed.me`
3. Follow DNS configuration instructions
4. Vercel provides automatic HTTPS

## Part 5: Update CORS Settings

Now that you have production URLs, update CORS:

### Backend Environment Variables (Railway)

```env
ADMIN_CORS=https://your-backend-url.railway.app
STORE_CORS=https://goosedmoose.vercel.app,https://shop.goosed.me
```

Include all domains customers will access the store from.

## Part 6: Configure Email (SMTP)

For order confirmations and notifications:

### Option 1: Gmail SMTP (Free, Good for Starting)

1. Create a dedicated Gmail account (e.g., orders@goosed.me)
2. Enable 2-factor authentication
3. Generate App Password: https://myaccount.google.com/apppasswords
4. Add to Railway backend variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=orders@goosed.me
SMTP_PASSWORD=your-16-character-app-password
SMTP_FROM=orders@goosed.me
```

### Option 2: SendGrid (Recommended for High Volume)

1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Create API key
3. Add to Railway variables:

```env
SENDGRID_API_KEY=SG.your-api-key
SENDGRID_FROM=orders@goosed.me
```

### Configure Email Templates

In your Medusa backend, email templates are in:
```
backend/src/services/emailService.js
```

Customize templates for:
- Order confirmation
- Shipping notification
- Password reset

## Part 7: Test Production Environment

### Backend Health Check

Visit: `https://your-backend-url.railway.app/health`

Expected response: `{"message":"OK"}`

### Admin Dashboard

1. Visit: `https://your-backend-url.railway.app/app`
2. Log in with your admin credentials
3. Verify all products are visible
4. Check settings

### Storefront

1. Visit your Vercel URL
2. Browse products
3. Add to cart
4. Complete a **test order** using Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

### Switch to Live Payments

When ready for real customers:

1. In Stripe dashboard, toggle **Test Mode** OFF
2. Use live API keys in production environment variables
3. Test with a real card (your own)
4. **Refund yourself** to verify the full flow

## Security Checklist

Before going live:

- [ ] All `.env` files in `.gitignore` (never commit secrets!)
- [ ] Using HTTPS for all domains
- [ ] Strong admin password set
- [ ] Stripe webhook secret configured
- [ ] CORS properly configured (only allow your domains)
- [ ] Database backups enabled
- [ ] JWT_SECRET and COOKIE_SECRET are random and secure
- [ ] Stripe is in live mode with live keys

## Post-Deployment Tasks

### 1. Set Up Monitoring

**Railway:**
- Built-in monitoring for backend uptime
- Set up alerts for errors

**Vercel:**
- Analytics automatically enabled
- Monitor page load times

### 2. Configure Backups

**Database Backups (Railway):**
- Enable automatic daily backups
- Test restore process once

**Code Backups:**
- Everything's in GitHub already!
- Tag releases: `git tag v1.0.0`

### 3. Set Up Analytics (Optional)

Add Google Analytics or Plausible to your storefront:

In `storefront/src/app/layout.tsx`, add analytics script.

### 4. Create a Backup Admin User

In case you forget your password:

```bash
# SSH into Railway backend
npx medusa user -e backup@goosed.me -p SecureBackupPassword
```

## Updating Your Live Site

### When You Make Changes

1. **Make changes locally**
2. **Test thoroughly**
3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

4. **Automatic deployment:**
   - Railway auto-deploys backend
   - Vercel auto-deploys storefront

5. **Verify:** Check both sites after deployment

### Rolling Back Changes

If something breaks:

**Vercel:**
1. Go to project → Deployments
2. Find last working deployment
3. Click **"Promote to Production"**

**Railway:**
1. Go to service → Deployments
2. Rollback to previous version

## Troubleshooting Production Issues

### Backend Won't Start

Check Railway logs:
1. Go to backend service
2. Click **"Logs"** tab
3. Look for error messages

Common issues:
- Missing environment variable
- Database connection failed
- Migration not run

### Storefront Shows Errors

Check Vercel logs:
1. Go to project → Deployments
2. Click on latest deployment
3. View build logs

Common issues:
- Wrong `NEXT_PUBLIC_MEDUSA_BACKEND_URL`
- Missing environment variable
- CORS error (check backend CORS settings)

### Orders Not Processing

1. Check Stripe dashboard for payment status
2. Verify webhook is receiving events
3. Check backend logs for errors
4. Ensure `STRIPE_WEBHOOK_SECRET` is correct

### Emails Not Sending

1. Verify SMTP credentials
2. Check spam folder
3. Review backend logs for email errors
4. Test SMTP connection separately

## Performance Optimization

### Backend

1. **Enable Redis caching** (Railway add-on)
2. **Optimize database queries** (add indexes)
3. **Use CDN for uploads** (Cloudinary integration)

### Storefront

1. **Image optimization** (Next.js does this automatically)
2. **Enable caching** (Vercel Edge Network)
3. **Lazy load images** (implemented in code)

## Cost Optimization

### Railway
- Start with hobby plan ($5/mo per service)
- Monitor resource usage
- Scale only when needed

### Vercel
- Free tier is generous (enough for starting out)
- Upgrade to Pro ($20/mo) when you outgrow free tier

### Expected Costs

| Traffic | Backend | Database | Storefront | Total/Month |
|---------|---------|----------|------------|-------------|
| < 1000 visitors/mo | $5 | $5 | $0 | **$10** |
| < 10k visitors/mo | $5 | $5 | $0 | **$10** |
| < 50k visitors/mo | $10 | $10 | $20 | **$40** |

## Scaling for Growth

As your business grows:

1. **More traffic?**
   - Railway auto-scales
   - Vercel handles traffic spikes automatically

2. **More products?**
   - Database can handle thousands of products
   - Might need to optimize queries

3. **More orders?**
   - Consider upgrading database
   - Add Redis for caching

4. **International customers?**
   - Add currency conversion
   - Multi-region deployment

## Domain Setup Example

If you own `goosed.me`:

```
goosed.me               → Main website (existing Hugo site or redirect)
shop.goosed.me          → Storefront (Vercel)
admin.goosed.me         → Backend Admin (Railway)
api.goosed.me           → Backend API (Railway)
```

Configure DNS:
```
shop    CNAME   cname.vercel-dns.com
admin   CNAME   your-backend.up.railway.app
api     CNAME   your-backend.up.railway.app
```

## Going Live Checklist

Final checklist before announcing your store:

- [ ] All products added with photos and descriptions
- [ ] Shipping rates configured correctly
- [ ] Legal pages added (Privacy Policy, Terms of Service, Return Policy)
- [ ] Contact information accurate
- [ ] Test order completed successfully (real payment + refund)
- [ ] Email confirmations working
- [ ] Admin dashboard accessible
- [ ] Domain pointed correctly (if using custom domain)
- [ ] SSL certificates active (HTTPS working)
- [ ] Mobile responsive design tested
- [ ] Social media links added
- [ ] Google Analytics configured (optional)
- [ ] Backups tested and working

## Post-Launch

After going live:

1. **Monitor first orders closely**
   - Check order notifications
   - Verify inventory updates
   - Confirm email sending

2. **Gather feedback**
   - Ask first customers about their experience
   - Fix any UX issues quickly

3. **Marketing**
   - Announce on social media
   - Update existing website (gm-parked) to link to shop
   - Tell your existing customers

## Support Resources

- **Medusa Discord:** https://discord.gg/medusajs
- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Stripe Support:** https://support.stripe.com

---

**Congratulations!** You're now running a production e-commerce store. Welcome to the world of online retail!

Keep this guide handy for future deployments and troubleshooting.
