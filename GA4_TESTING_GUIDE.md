# Google Analytics 4 Testing Guide for Vevantae Labs

## 🎯 **Quick Test (5 minutes)**

### 1. Start Your Website
```bash
cd /Users/aryannijhawan/vevantae-labs
npm run dev
```
Website will be available at: `http://localhost:3007`

### 2. Open Google Analytics
- Go to [analytics.google.com](https://analytics.google.com)
- Select your property with ID: `G-VDMQ3FND7S`

### 3. Check Real-time Data
- Navigate to **Reports** → **Realtime**
- Visit your website in another tab
- Within 30 seconds, you should see:
  - Active users count increase
  - Page views in "Users by page title"
  - Events in "Event count by Event name"

---

## 📊 **Detailed Testing Steps**

### **A. Real-time Reports Testing**

1. **Go to Real-time Reports**
   - In GA4: **Reports** → **Realtime**

2. **Test Page Views**
   - Visit: `http://localhost:3007`
   - Visit: `http://localhost:3007/about`
   - Visit: `http://localhost:3007/products`
   - Visit: `http://localhost:3007/contact`
   
   **Expected Result:** You should see page views appearing in real-time

3. **Test Custom Events**
   - Visit: `http://localhost:3007/ga4-test`
   - Click the test buttons on this page
   - Check GA4 for custom events like:
     - `test_button_click`
     - `view_item`
     - `form_submit`

### **B. DebugView Testing (Advanced)**

1. **Enable DebugView**
   - In GA4: **Admin** → **DebugView**
   - Or **Configure** → **DebugView**

2. **Install Google Analytics Debugger** (Optional)
   - Chrome Extension: "Google Analytics Debugger"
   - Enable it and refresh your website

3. **View Debug Events**
   - Visit your website
   - See detailed event parameters in DebugView

### **C. Event Testing Checklist**

Visit these pages and perform these actions:

#### ✅ **Homepage** (`http://localhost:3007`)
- **Expected Events:** `page_view`

#### ✅ **Contact Page** (`http://localhost:3007/contact`)
- Fill out and submit the contact form
- **Expected Events:** `page_view`, `form_submit`

#### ✅ **Products Page** (`http://localhost:3007/products`)
- Click on any product
- **Expected Events:** `page_view`, `view_item` (when viewing product detail)

#### ✅ **Newsletter Signup**
- Find newsletter form (usually in footer)
- Submit email
- **Expected Events:** `newsletter_signup`

#### ✅ **GA4 Test Page** (`http://localhost:3007/ga4-test`)
- Click all test buttons
- **Expected Events:** `test_button_click`, `view_item`, `form_submit`

---

## 📈 **What You Should See in GA4**

### **Real-time Reports:**
- **Users**: 1 (you)
- **Page views**: Multiple as you navigate
- **Events**: Various events as you interact

### **Event Types You Should See:**
- `page_view` - Automatic page tracking
- `form_submit` - Contact form submissions
- `newsletter_signup` - Newsletter form submissions
- `view_item` - Product page views
- `test_button_click` - Test page interactions

### **User Properties:**
- Country, City (your location)
- Device type (Desktop/Mobile)
- Browser information

---

## 🔍 **Troubleshooting**

### **Not Seeing Data?**

1. **Check Browser Console**
   - Press F12 → Console tab
   - Look for GA4 related errors
   - Should see gtag commands being sent

2. **Check Network Tab**
   - Press F12 → Network tab
   - Filter by "google-analytics.com"
   - Should see requests being sent

3. **Verify Measurement ID**
   - Check `.env.local` file has: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-VDMQ3FND7S`
   - Restart development server after any changes

4. **Wait Time**
   - Real-time: Instant to 30 seconds
   - Regular reports: 24-48 hours

### **Browser Blockers**
- Disable ad blockers temporarily
- Try incognito/private browsing mode
- Try different browser

---

## 🎯 **Production Testing**

Once you deploy to production:

1. **Test on Live Site**
   - Replace `localhost:3007` with your actual domain
   - Repeat all tests above

2. **Check Standard Reports** (After 24-48 hours)
   - **Reports** → **Life cycle** → **Acquisition**
   - **Reports** → **Life cycle** → **Engagement**
   - **Reports** → **Monetization** (for e-commerce events)

3. **Set Up Conversions**
   - **Admin** → **Conversions**
   - Mark important events as conversions:
     - `form_submit` (Contact form)
     - `newsletter_signup`
     - Any purchase events (when implemented)

---

## 📱 **Mobile Testing**

Don't forget to test on mobile devices:
- Visit site on your phone
- Check if mobile events appear in GA4
- Test touch interactions

---

## 🚀 **Next Steps After Successful Testing**

1. **Set Up Goals & Conversions**
2. **Create Custom Audiences**
3. **Set Up Enhanced E-commerce** (for product sales)
4. **Create Custom Reports**
5. **Set Up Alerts** for important metrics

---

## 📞 **Need Help?**

If you don't see data after following these steps:
1. Check the troubleshooting section above
2. Verify all code changes were saved
3. Restart the development server
4. Try testing in incognito mode

The integration should work immediately for real-time data!