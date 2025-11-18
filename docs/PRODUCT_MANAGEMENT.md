# Product Management Guide

This guide explains how to add, manage, and organize products in your Goosed Moose e-commerce store using the Medusa Admin dashboard.

## Accessing the Admin Dashboard

1. Make sure your backend is running: `cd backend && npm run dev`
2. Open your browser to: http://localhost:7001
3. Log in with your admin credentials

## Understanding Products in Medusa

In Medusa, products are organized hierarchically:

```
Product (e.g., "Merry Moosemas Candle")
  └── Variants (e.g., "2oz Amber Glass", "8oz Amber Glass")
        ├── Price: $12.00
        ├── SKU: MM-2OZ-001
        └── Inventory: 25 in stock
```

### Key Concepts

**Product**: The general item (e.g., "Lavender Candle")
**Variant**: Specific version (e.g., "8oz Lavender Candle in Amber Glass")
**SKU**: Stock Keeping Unit - unique identifier for each variant
**Inventory**: How many units you have in stock

## Adding Your First Candle Product

### Step 1: Create a Product

1. Click **"Products"** in the left sidebar
2. Click **"New Product"** button (top right)
3. Fill in the **General Information**:

```
Title: Merry Moosemas Candle
Subtitle: Pine, Ginger & Orange (optional)
Description:
A festive blend of fresh pine, warm ginger, and sweet orange.
Hand-poured in Macedonia, GA with love. Made with natural soy wax
and wooden wicks for a cozy crackling sound.

Handle: merry-moosemas-candle
(This becomes the URL: /products/merry-moosemas-candle)
```

**Description Tips:**
- Mention the scent profile
- Highlight "hand-poured" and "made in Macedonia, GA"
- Include wax type (soy, beeswax, etc.)
- Mention any special features (wooden wick, essential oils, etc.)

### Step 2: Add Product Images

1. Scroll to **"Media"** section
2. Click **"Upload images"** or drag and drop
3. Upload multiple images:
   - Main product photo (front)
   - Lifestyle shot (candle in a room)
   - Close-up of label
   - Top-down view showing wax

**Image Requirements:**
- Format: JPG or PNG
- Recommended size: At least 1000x1000 pixels
- First image becomes the thumbnail
- Drag to reorder images

### Step 3: Set Up Variants (Sizes)

This is where you define different sizes and their prices.

1. Scroll to **"Variants"** section
2. Click **"Add Variant"**

#### For a 2oz Candle:

```
Title: 2oz
SKU: GM-MERRY-2OZ
Manage Inventory: ✓ (checked)
Quantity: 15 (how many you have)
Allow backorders: ☐ (unchecked - prevents orders when sold out)

Prices:
  USD: $12.00
```

3. Click **"Add another"** to add more sizes

#### For an 8oz Candle:

```
Title: 8oz
SKU: GM-MERRY-8OZ
Manage Inventory: ✓
Quantity: 10

Prices:
  USD: $24.00
```

### Step 4: Organize with Collections

Collections help group related products (like "Holiday Candles" or "Best Sellers")

1. Scroll to **"Organize"** section
2. Under **Collections**, click **"Add Collection"**
3. Create or select collections:
   - Seasonal Candles
   - Signature Scents
   - Limited Edition

### Step 5: Add Metadata (Optional but Recommended)

Metadata stores additional product information:

1. Scroll to **"Metadata"** section
2. Click **"Add metadata"**
3. Add custom fields:

```
Key: burn_time
Value: 15 hours

Key: wax_type
Value: Soy

Key: wick_type
Value: Wooden

Key: made_in
Value: Macedonia, GA

Key: scent_notes
Value: Pine, Ginger, Orange
```

You can display this metadata on the product page in your storefront.

### Step 6: Publish the Product

1. At the top of the page, change status from **"Draft"** to **"Published"**
2. Click **"Save"** (top right)

Your product is now live on the storefront!

## Product Variants: When to Use Them

**Use variants for:**
- Different sizes (2oz, 4oz, 8oz)
- Different containers (amber glass, tin, ceramic)
- Different scents of the same product line

**Create separate products for:**
- Completely different scents (each scent = separate product)
- Different product types (candles vs. t-shirts)

### Example Structure for Candles

```
Product: "Lavender Dreams Candle"
  Variants:
    - 2oz Amber Glass ($12)
    - 4oz Amber Glass ($18)
    - 8oz Amber Glass ($24)

Product: "Merry Moosemas Candle"
  Variants:
    - 2oz Amber Glass ($12)
    - 8oz Amber Glass ($24)

Product: "Pumpkin Spice Candle"
  Variants:
    - 8oz Amber Glass ($24)
    - 8oz Tin ($22)
```

## Managing Inventory

### Updating Stock Levels

1. Go to **Products** > click on a product
2. Scroll to **Variants** section
3. Click on a variant
4. Update the **Quantity** field
5. Click **Save**

### Low Stock Alerts

Medusa will show a warning icon when inventory is low. You can see this in the products list.

### When a Product Sells Out

When inventory reaches 0:
- Medusa automatically marks it as "out of stock"
- Customers can't purchase it on the storefront
- You'll see "Out of Stock" badge in admin

To restock:
1. Find the product
2. Update variant quantity
3. Save changes
4. Product automatically becomes available again

## Collections and Organization

### Creating Collections

1. Go to **Products** > **Collections**
2. Click **"New Collection"**
3. Fill in details:

```
Title: Holiday Candles
Handle: holiday-candles
Description: Festive scents to warm your home this season
```

4. Add products to collection
5. Click **Save**

### Recommended Collections for Goosed Moose

```
✓ Seasonal Candles - Holiday and limited-time scents
✓ Signature Scents - Your year-round favorites
✓ Best Sellers - Most popular products
✓ New Arrivals - Latest additions
✓ Small Candles - 2oz and 4oz sizes
✓ Large Candles - 8oz and bigger
```

Collections appear on your storefront, making it easy for customers to browse.

## Product Categories

Categories are different from collections - they're for organizing your admin view.

### Setting Up Categories

1. Go to **Products** > **Categories**
2. Click **"New Category"**
3. Create categories:

```
Candles
  └── Seasonal
  └── Signature
  └── Limited Edition

Crafts (for future expansion)
  └── T-Shirts
  └── Laser Engraved
  └── Vinyl Work
```

Categories can be nested (subcategories).

## Pricing Strategies

### Recommended Pricing for Candles

Based on market research for artisan candles:

```
2oz Sampler: $10-12
4oz Candle: $16-20
8oz Candle: $22-28
16oz Candle: $35-45
```

### Setting Sale Prices

To run a sale:

1. Edit product variant
2. Add a second price:
   - Original: $24.00
   - Sale: $19.00
3. Set start/end dates (if time-limited)
4. Storefront will show strikethrough pricing

## Product Photography Tips

Great photos sell products! For candles:

1. **Main Image**: Clean, well-lit product shot
   - White or natural background
   - Candle front and center
   - Show the label clearly

2. **Lifestyle Image**: Candle in use
   - Lit in a cozy setting
   - Shows scale (next to a book, on a table)
   - Creates emotional connection

3. **Detail Shot**: Close-up of unique features
   - Texture of wax
   - Wooden wick
   - Label design

4. **Top-Down**: Looking into the candle
   - Shows color of wax
   - Professional aesthetic

**Photography Setup:**
- Natural light from a window (best time: morning)
- Use your phone camera (modern phones are excellent)
- Simple backgrounds (white poster board, wood table)
- Edit for consistency (brightness, contrast)

## Bulk Operations

### Importing Multiple Products

If you have many products to add:

1. Create a CSV file with product data
2. Use Medusa Admin's import feature
3. Template available in admin dashboard

### Exporting Products

To back up or edit products:

1. Go to Products
2. Click **"Export products"**
3. Downloads a CSV file
4. Edit in Excel/Google Sheets
5. Re-import if needed

## Writing Product Descriptions

Good descriptions help customers and SEO:

### Formula for Candle Descriptions

```
[Opening Hook] - Create atmosphere
[Scent Profile] - Describe the smell
[Unique Features] - What makes it special
[Technical Details] - Wax, wick, burn time
[Made with Love] - Personal touch

Example:

Transform your space into a winter wonderland with our Merry Moosemas
candle. This festive blend combines crisp pine needles, warm ginger,
and sweet orange for the perfect holiday ambiance.

Hand-poured in small batches using 100% natural soy wax and wooden
wicks that crackle like a cozy fireplace. Each candle burns for
approximately 40+ hours, filling your home with holiday cheer.

Made with love in Macedonia, GA by the Goosed Moose family.
```

### SEO Tips

- Use descriptive titles (include key words like "soy candle", "wooden wick")
- Add scent names to titles
- Write detailed descriptions (helps Google understand your products)
- Use the handle wisely: "lavender-soy-candle" is better than "product-1"

## Shipping Configuration

Since you offer both shipping and local pickup:

### Setting Up Shipping Profiles

1. Go to **Settings** > **Shipping**
2. Create shipping profiles:

#### Standard Shipping

```
Name: USPS Shipping
Regions: United States

Shipping Options:
  - USPS Priority Mail
    Price: Calculated by weight
    Estimated delivery: 2-3 business days
```

#### Local Pickup

```
Name: Local Pickup
Regions: Georgia (or custom)

Shipping Options:
  - Pickup in Canton, GA
    Price: FREE
    Instructions: "We'll email you when ready for pickup at..."
```

### Assigning Products to Shipping Profiles

All products need a shipping profile:

1. Edit product
2. Scroll to **"Shipping"** section
3. Select appropriate profile
4. Add weight (for shipping calculations)

## Product Launch Checklist

Before publishing a new product:

- [ ] High-quality images uploaded (at least 3)
- [ ] Title is descriptive and SEO-friendly
- [ ] Description is complete and engaging
- [ ] All variants have prices set
- [ ] SKUs are unique and meaningful
- [ ] Inventory quantities are accurate
- [ ] Shipping profile assigned
- [ ] Added to relevant collection(s)
- [ ] Metadata filled in (burn time, wax type, etc.)
- [ ] Product status set to "Published"
- [ ] Test purchase on storefront

## Seasonal Product Management

### For Holiday/Limited Edition Candles

1. Create the product normally
2. Add to "Seasonal" collection
3. When season ends:
   - Don't delete the product (keeps order history)
   - Set status to "Draft" (hides from storefront)
   - Or set inventory to 0
4. Next year:
   - Set back to "Published"
   - Update inventory

### Managing Pre-Orders

For products not yet in stock:

1. Create product with 0 inventory
2. Check "Allow backorders" on variant
3. Add to description: "Pre-order now, ships [date]"
4. Customers can order even without stock

## Expanding to Other Crafts

When you add t-shirts, laser engraved items, etc.:

### Create New Categories

```
T-Shirts
  - Add variants for sizes (S, M, L, XL)
  - Add variants for colors if applicable
  - Different pricing than candles

Laser Engraved Items
  - Each unique item = separate product
  - Option for custom engraving (use product options feature)
```

### Product Options

For customizable products:

1. Edit product
2. Scroll to **"Options"**
3. Add options:
   - Size (S, M, L, XL)
   - Color (Red, Blue, Green)
   - Engraving Text (custom input)

## Troubleshooting

### Product Not Showing on Storefront

Check:
1. Product status is "Published" (not Draft)
2. At least one variant exists
3. Variant has a price
4. Refresh the storefront

### Inventory Not Updating After Sale

Check:
1. "Manage Inventory" is checked on variant
2. Inventory was set > 0
3. Look in Orders - inventory decreases when order is placed

### Images Not Uploading

Check:
1. File size under 10MB
2. File type is JPG or PNG
3. Try uploading one at a time
4. Check backend/uploads folder permissions

## Advanced Tips

### Gift Products / Bundles

Create a bundle (e.g., "3-Pack Sampler"):

1. Create new product: "Candle Sampler Pack"
2. Set special bundle pricing
3. In description, mention which candles are included
4. Manage inventory separately from individual candles

### Customer Reviews (Future Enhancement)

Medusa doesn't include reviews by default, but you can:
- Add a review app/plugin
- Or manually add testimonials to product descriptions

## Regular Maintenance

**Weekly:**
- Check inventory levels
- Fulfill orders
- Update stock for sold items

**Monthly:**
- Review best sellers
- Analyze which products need better photos/descriptions
- Plan seasonal products
- Remove sold-out limited editions

**Quarterly:**
- Review pricing
- Update product photos
- Reorganize collections
- Plan new product launches

---

**You now know how to manage products like a pro!** Start by adding your first candle, then expand from there.

Next: Read [DEPLOYMENT.md](./DEPLOYMENT.md) when you're ready to launch your store!
