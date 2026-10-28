# SmartShop

[![Project](https://img.shields.io/badge/Project-SmartShop-indigo.svg)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20Tailwind%20CSS%20%7C%20Vanilla%20JS-blue.svg)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/Status-Complete%20Demo-emerald.svg)](#)

SmartShop is a modern, responsive single-page e-commerce web application. Built strictly with **HTML5**, **Tailwind CSS utility classes**, and **Vanilla JavaScript DOM manipulation**, the application adheres to standard web development practices with zero third-party UI framework dependencies (no React, Vue, Angular), no Bootstrap, and no custom CSS stylesheets or style tags.

---

## 🌟 Core Features

### 1. Responsive Sticky Navbar with Active Highlighting
- **Navigation Links**: Smooth scrolling to **Home**, **Products**, **Reviews**, **About**, and **Contact** sections.
- **Active Section Highlighting**: Dynamically indicates the currently viewed section during scroll.
- **Sticky Glassmorphism**: Translucent backdrop with subtle border and elevation on scroll.
- **Demo Balance Display**: Real-time balance counter (`৳ 1,000.00`) and quick `+ Add Money` button.
- **Cart Button & Badge**: Shopping bag icon featuring a dynamic badge indicator updating with item counts.
- **Mobile Drawer Menu**: Fully responsive navigation drawer with nav links and balance controls.

### 2. 4-Image Promotional Slider
- **Hero Banners**: 4 curated high-resolution visual slides (Tech, Apparel, Jewelry, and Special Offers).
- **Automatic Controls**: Cycles slides automatically every 4.5 seconds; pauses on mouse hover and resumes on mouse leave.
- **Manual Controls**: Previous (`<`) and next (`>`) navigation buttons alongside 4 clickable indicator dots.

### 3. Dynamic Products & FakeStore API Integration
- **REST API Data**: Asynchronously fetched from `https://fakestoreapi.com/products`.
- **Product Cards**: Displays product image, line-clamped title, category badge, star rating icons, total rating count, simulated BDT price (`৳`), and Add to Cart action.
- **Quick View Modal**: Interactive modal displaying full-resolution image, detailed description, rating breakdown, quantity selector, and direct cart addition.
- **Graceful States**:
  - **Loading Skeletons**: 8 animated shimmering skeleton cards while data is fetching.
  - **API Error State**: Informative error notification with a "Retry Connection" button and an "Offline Catalog" fallback dataset.
  - **Empty State**: Visual placeholder with a "Reset All Filters" button when search/filter yields zero results.

### 4. Search, Category Filtering & Price Sorting
- **Real-Time Live Search**: Instant keyword matching across titles, descriptions, and categories.
- **Dynamic Category Filter**: Filter buttons for *All Categories*, *Men's Clothing*, *Women's Clothing*, *Jewelery*, and *Electronics*.
- **Multi-Criteria Sorting**:
  - Featured (Default order)
  - Price: Low to High
  - Price: High to Low
  - Rating: Highest First
  - Title: A to Z

### 5. Shopping Cart, Calculations & SMART10 Coupon
- **Slide-Over Drawer**: Sliding panel with backdrop blur and item management.
- **Item Controls**: Thumbnail preview, unit price, quantity increment (`+`), decrement (`-`), and remove button.
- **Financial Calculations**:
  - **Subtotal**: Dynamic summation of item totals.
  - **Coupon Discount**: Voucher code `SMART10` grants an instant **10% discount** on subtotal.
  - **Delivery Fee / Shipping Fee**: Standard delivery of ৳ 60.00; automatically becomes **FREE** for orders over ৳ 500.00.
  - **Final Payable Amount**: `Math.max(0, Subtotal - Discount + Delivery)`.

### 6. Demo Balance & Checkout Guard
- **Initial Demo Balance**: Default wallet of **1,000.00 BDT**.
- **Add Money**: `+ Add Money` button adds **1,000.00 BDT** to the wallet on each click with instant toast feedback.
- **Checkout Prevention**: If the Final Payable Amount exceeds the Demo Balance:
  - Checkout is blocked.
  - An inline warning alert is displayed in the cart drawer.
  - A toast notification informs the user of the insufficient balance and shortage amount.
- **Order Confirmation**: When balance is sufficient:
  - Total is deducted from Demo Balance.
  - Cart is cleared.
  - An **Order Confirmation Modal** displays the simulated Order ID, itemized summary, total paid, and remaining balance.

### 7. Browser LocalStorage Persistence
- Cart items (`smartshop_cart`), demo balance (`smartshop_balance`), and coupon state (`smartshop_coupon`) are stored in `localStorage`.
- State persists across page refreshes, tab closures, and browser restarts.

### 8. Customer Reviews Carousel
- **Asynchronous Fetch**: Loaded via relative path `data/reviews.json`, fully compatible with local development servers.
- **Carousel Controls**: Features automatic cycling (5-second intervals with pause-on-hover) and manual controls (Prev/Next buttons, active indicator dots).
- **Review Cards**: Display avatars, customer designations, verified buyer tags, star ratings, timestamps, and purchased product tags.

### 9. Contact Form with Client-Side Validation
- **Validated Fields**: Full Name (min 2 chars), Email Address (standard regex format), Subject (min 3 chars), Message (min 10 chars).
- **Interactive Feedback**: Real-time error alerts and red borders on invalid inputs; green borders on valid input.
- **Submission Feedback**: Inline success banner and animated toast notification upon valid submission.

### 10. Global Polish & Utilities
- **Floating Back-to-Top Button**: Smoothly scrolls to the top of the page when scrolled past 300px.
- **Toast Notification Stack**: Dynamic contextual notifications for cart events, balance top-ups, coupon validation, and checkout.
- **Simulated Economy Notices**: Clear labels highlighting simulated BDT prices and demo functionality.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Structure** | HTML5 | Semantic elements (`header`, `nav`, `section`, `article`, `footer`) |
| **Styling** | Tailwind CSS CDN | Pure utility classes (`bg-*`, `text-*`, `flex`, `grid`, `rounded-*`, etc.) |
| **Styling Rule** | Zero Custom CSS | No `.css` files, no `<style>` blocks, no external Bootstrap |
| **Logic** | Vanilla JavaScript | Pure ES6+ DOM manipulation, `fetch()` API, event delegation |
| **Frameworks** | None | No React, Vue, Angular, jQuery, or Bootstrap |
| **Persistence**| LocalStorage API | Stores cart, balance, and coupon state |
| **Data Sources**| REST & JSON | FakeStore REST API + local `data/reviews.json` |

---

## 📁 Project Directory Structure

```
SmartShop/
├── index.html            # Main single-page application document
├── README.md             # Project documentation and setup guide
├── data/
│   └── reviews.json      # Customer reviews dataset
└── js/
    ├── app.js            # App orchestrator, sticky nav, active highlighting & toasts
    ├── cart.js           # Cart state, calculations, coupon, balance & checkout
    ├── carousel.js       # 4-image promo slider & reviews carousel logic
    ├── contact.js        # Contact form validation & submission handling
    └── products.js       # FakeStore fetch, search, filter, sort & quick view
```

---

## 🚀 Setup & Execution Instructions

To test `data/reviews.json` and FakeStore API fetches properly, run the project through a local web server (to prevent browser `file://` CORS restrictions on local JSON files):

### Method 1: VS Code Live Server (Recommended)
1. Open the `SmartShop` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by *Ritwick Dey*) from the VS Code Marketplace if not already installed.
3. Right-click on [`index.html`](file:///c:/Users/hp/Desktop/SmartShop/index.html) in the file explorer and select **"Open with Live Server"**.
4. The application will launch automatically in your browser at `http://127.0.0.1:5500/index.html`.

### Method 2: Python Built-In HTTP Server
If Python is installed on your system:
```bash
# Navigate to the SmartShop project directory
cd c:\Users\hp\Desktop\SmartShop

# Start the local HTTP server
python -m http.server 5500
```
Open your browser and navigate to: **`http://localhost:5500`**.

### Method 3: Node.js `npx serve`
If Node.js is installed on your system:
```bash
# Navigate to the SmartShop project directory
cd c:\Users\hp\Desktop\SmartShop

# Run via npx
npx serve .
```

---

## ⚠️ Demo Notice

*SmartShop is an e-commerce demonstration website. All BDT prices, demo balances, wallet top-ups, and checkout receipts are completely simulated. No real payment processing takes place.*
