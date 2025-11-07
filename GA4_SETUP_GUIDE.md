# Google Analytics 4 (GA4) Integration Guide

This guide explains how to set up Google Analytics 4 on your Vevantae Labs website.

## 1. Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create a new account or use an existing one
5. Set up a new property:
   - Property name: "Vevantae Labs Website"
   - Reporting time zone: Asia/Kolkata (or your preferred timezone)
   - Currency: Indian Rupee (INR)
6. Choose "Web" as your platform
7. Enter your website details:
   - Website URL: https://your-domain.com
   - Stream name: "Vevantae Labs Web Stream"
8. Copy your **Measurement ID** (format: G-XXXXXXXXXX)

## 2. Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your GA4 Measurement ID:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID from step 1.

## 3. Features Implemented

### Automatic Page View Tracking

- Tracks all page views automatically
- Includes page location and title
- Works with Next.js App Router navigation

### Event Tracking

The following events are automatically tracked:

#### Contact Form Submissions

- Event: `form_submit`
- Triggered when contact form is submitted
- Parameters: `form_name: 'contact_page'`

#### Newsletter Signups

- Event: `newsletter_signup`
- Triggered when newsletter form is submitted
- Parameters: `method: 'newsletter_widget'`

#### Product Views

- Event: `view_item`
- Triggered when a product detail page is viewed
- Parameters: item details, price, category

### Available Tracking Functions

You can use these functions throughout your app to track custom events:

```typescript
import {
  trackEvent,
  trackPurchase,
  trackAddToCart,
  trackSearch,
} from '@/components/GoogleAnalytics';

// Custom event
trackEvent('button_click', { button_name: 'header_cta' });

// E-commerce events
trackPurchase('12345', 899, 'INR', [{ item_id: 'prod_1', item_name: 'Ashwagandha', price: 899 }]);
trackAddToCart('INR', 899, [{ item_id: 'prod_1', item_name: 'Ashwagandha', price: 899 }]);

// Search tracking
trackSearch('ashwagandha benefits');
```

## 4. Verify Installation

1. Deploy your website with the GA4 code
2. Go to Google Analytics
3. Navigate to Reports > Realtime
4. Visit your website in another tab
5. You should see real-time data appearing in GA4

## 5. Enhanced E-commerce Setup (Optional)

For advanced e-commerce tracking:

1. In GA4, go to Admin > Data Streams
2. Click your web stream
3. Click "Enhanced measurement"
4. Enable the events you want to track
5. Set up conversion goals in GA4

## 6. Privacy Considerations

### Cookie Consent (Recommended)

Consider implementing a cookie consent banner to comply with GDPR/privacy laws:

```typescript
// Only initialize GA4 after user consent
if (userConsent) {
  // Initialize tracking
}
```

### Data Retention

- Set appropriate data retention periods in GA4 settings
- Review and configure data sharing settings
- Consider implementing IP anonymization if needed

## 7. Common Events to Track

Consider adding tracking for these user interactions:

- **WhatsApp button clicks**: Track when users click the WhatsApp button
- **Product filtering**: Track search/filter usage on product pages
- **Blog interactions**: Track blog post reads and shares
- **Contact method preferences**: Track which contact methods users prefer
- **Product interest**: Track which products get the most attention

## 8. Monitoring and Optimization

### Key Metrics to Monitor

- Page views and user sessions
- Conversion rates (contact form submissions, newsletter signups)
- Product page engagement
- User flow through the website
- Mobile vs desktop usage

### Regular Tasks

- Review GA4 reports weekly
- Set up automated reports for key metrics
- Monitor for any tracking issues
- Optimize based on user behavior data

## 9. Troubleshooting

### Common Issues

- **No data appearing**: Check that the Measurement ID is correct in .env.local
- **Events not firing**: Check browser console for JavaScript errors
- **Development vs Production**: GA4 data only appears in production/deployed sites

### Debug Mode

Add this to enable debug mode in development:

```typescript
gtag('config', GA_MEASUREMENT_ID, {
  debug_mode: true,
});
```

## 10. Advanced Features

### Custom Dimensions

Set up custom dimensions in GA4 for:

- User type (new vs returning)
- Product category preferences
- Geographic region
- Device type

### Audiences

Create audiences for:

- Users interested in specific product categories
- High-value potential customers
- Users who viewed products but didn't convert

This setup provides comprehensive analytics for your Vevantae Labs website while maintaining good performance and user privacy.
