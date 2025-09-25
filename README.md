This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Setup

Copy `.env.example` to `.env.local` and update with your credentials:

```bash
cp .env.example .env.local
```

## Payment Integration Testing

This project includes both Stripe and PayPal payment integrations with demo credentials for immediate testing:

### Test Stripe Credit Card Payments
1. Go to checkout page and select "Credit Card" payment method
2. Use Stripe's test mode (already configured)
3. Test with these credit cards:
   - **Visa**: `4242 4242 4242 4242`, Exp: any future date, CVV: any 3 digits
   - **Mastercard**: `5555 5555 5555 4444`, Exp: any future date, CVV: any 3 digits
   - **Declined Card**: `4000 0000 0000 0002`, Exp: any future date, CVV: any 3 digits

### Test PayPal Payments
1. Go to checkout page and select "PayPal" payment method
2. Use the PayPal sandbox environment (already configured)
3. Test with these credentials:
   - **Email**: `sb-buyer@example.com`
   - **Password**: `testpassword123`
   - Or use test credit card: `4111 1111 1111 1111`, Exp: `01/30`, CVV: `123`

### Demo Features
- ✅ **Stripe Test Mode**: Official Stripe demo keys for safe testing
- ✅ **PayPal Sandbox**: Sandbox environment for safe testing
- ✅ **Demo credentials included** in `.env.example`
- ✅ **Full payment flows** with order creation and tracking
- ✅ **Payment verification** and comprehensive error handling
- ✅ **Dual payment options**: Credit Card (Stripe) and PayPal

### For Production
Replace the demo credentials in `.env.local` with your own:
- **Stripe**: Get keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- **PayPal**: Get keys from [PayPal Developer Portal](https://developer.paypal.com/developer/applications/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
