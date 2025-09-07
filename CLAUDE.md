# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Core Commands:**
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

**Setup Commands:**
- `npm install` - Install dependencies
- `node setup-project.js` - Generate complete project structure (if needed)

## Architecture Overview

**Framework:** Next.js 14 with App Router
**Styling:** TailwindCSS with custom component classes
**Database:** Supabase (PostgreSQL with Row Level Security)
**State Management:** React Context (AuthContext, CartContext, WishlistContext)
**Authentication:** Supabase Auth with admin role checking

### Key Architecture Patterns

**Context Providers Hierarchy:**
```
AuthProvider > WishlistProvider > CartProvider > App
```

**Data Flow:**
- Server components fetch data directly from Supabase
- Client components use custom hooks (useAuth, useCart, useProducts)
- Context providers handle global state (cart, auth, wishlist)

**Database Schema:**
- `products` - Main product catalog with JSONB for images/features
- `orders` - Customer orders with JSONB for items/addresses  
- `categories` - Product categorization with hierarchical support
- `admins` - Admin user management separate from auth.users

## Required Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key  
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Critical Setup Requirements

**Database Setup:**
1. Run `supabase-schema.sql` in Supabase SQL Editor
2. Ensure Row Level Security policies are active
3. Categories and sample products are pre-populated

**Image Configuration:**
- Uses Unsplash images by default via `next.config.js`
- Supports Supabase storage with wildcard pattern
- See `ADD_IMAGES_GUIDE.md` for image setup options

## Custom Utilities & Patterns

**Utility Classes (TailwindCSS):**
- `.btn-primary` - Gradient button with hover effects
- `.btn-secondary` - Outlined button
- `.card` - Standard card with hover shadow
- `.input` - Form input with focus states

**Helper Functions:**
- `formatPrice()` - Currency formatting
- `calculateCartTotal()` - Cart calculations with tax/shipping
- `generateOrderNumber()` - Unique order ID generation

**Context Usage:**
- `useAuth()` - User state and admin checking
- `useCart()` - Cart operations and persistence
- `useProducts()` - Product fetching with filters

## Development Notes

**Cart Persistence:** Uses localStorage for cart state
**Admin Access:** Checked via `admins` table, not Supabase roles
**Image Fallbacks:** Defaults to placeholder if image fails
**Error Handling:** Uses react-hot-toast for user feedback

**File Structure:**
- `/app` - Next.js 14 app router pages
- `/components` - Reusable UI components organized by feature
- `/contexts` - React context providers  
- `/hooks` - Custom React hooks
- `/lib` - Utilities and Supabase client
- Root-level `.js` files are utility scripts for setup/fixes