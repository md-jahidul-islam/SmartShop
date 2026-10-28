# SmartShop — CSE-3532 Mid-Project

[![Course](https://img.shields.io/badge/Course-CSE--3532%3A%20Web%20Technologies-indigo.svg)](https://fakestoreapi.com)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20Tailwind%20CSS%20%7C%20Vanilla%20JS-blue.svg)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/Academic-Mid--Project%20Demo-emerald.svg)](#)

SmartShop is a modern, responsive single-page e-commerce web application developed as the mid-term academic project for **CSE-3532: Web Technologies**. Built strictly with **HTML5**, **Tailwind CSS utility classes**, and **Vanilla JavaScript DOM manipulation**, the application adheres to strict academic specifications: **zero** third-party JavaScript UI frameworks (no React, Vue, Angular), no Bootstrap, and **no custom CSS stylesheets or style tags**.

---

## 👥 Group Members & Contribution Matrix

| # | Student Name | Student ID | Academic Role | Key Contributions |
|---|--------------|------------|---------------|-------------------|
| 1 | **[Student 1 Full Name]** | `[2023-XX-001]` | Project Lead & UI/UX | Semantic HTML5 structure, sticky navbar, mobile drawer, Tailwind utility integration |
| 2 | **[Student 2 Full Name]** | `[2023-XX-002]` | Cart & Balance Engineer | Cart CRUD, quantity mutations, balance validation, SMART10 coupon, localStorage persistence |
| 3 | **[Student 3 Full Name]** | `[2023-XX-003]` | API & Carousels Developer | FakeStore REST API integration, 4-slide promo hero carousel, `data/reviews.json` carousel |
| 4 | **[Student 4 Full Name]** | `[2023-XX-004]` | QA & Validation Specialist | Live search, category filtering, price sorting, contact form validation, test verification |

> *Note for Instructors: Replace the bracketed placeholders `[Student Name]` and `[Student ID]` with the respective team member credentials prior to final report submission.*

---

## 🌟 Core Features & Requirements Implementation

### 1. Responsive Sticky Navbar
- **Navigation Links**: Smooth anchor scrolling to **Home**, **Products**, **Reviews**, **About**, and **Contact**.
- **Sticky Glassmorphism**: `sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200` with shadow transition on scroll.
- **Demo Balance Display**: Real-time balance counter (`৳ 1,000.00`) and quick `+ Add Money` button.
- **Cart Button & Badge**: Shopping bag icon featuring a dynamic badge indicator updating with item counts.
- **Mobile Drawer Menu**: Fully responsive hamburger menu with nav links, balance counter, and top-up action.

### 2. 4-Slide Promotional Image Carousel
- **Hero Banners**: 4 curated high-resolution e-commerce visual slides (Tech, Apparel, Jewelry, and Special Offers).
- **Automatic Controls**: Cycles slides every 4.5 seconds; automatically pauses on mouse hover and resumes on mouse leave.
- **Manual Controls**: Intuitive previous (`<`) and next (`>`) buttons alongside 4 clickable bottom dot indicators.

### 3. Dynamic Products & FakeStore API Integration
- **REST API Data**: Asynchronously fetched from `https://fakestoreapi.com/products`.
- **Card Design**: Displays product image, line-clamped title, category pill badge, star rating icons, total rating count, simulated BDT price (`৳`), and Add to Cart action.
- **Quick View Modal**: Interactive modal displaying full-resolution image, detailed description, rating breakdown, quantity stepper, and direct cart addition.
- **Resilient States**:
  - **Loading Skeletons**: 8 animated shimmering skeleton cards while data is fetching.
  - **API Error State**: Informative error notification with a "Retry Connection" button and an "Offline Catalog" fallback dataset.
  - **Empty State**: Friendly visual placeholder with a "Reset All Filters" button when search/filter yields zero results.

### 4. Search, Category Filtering & Price Sorting
- **Real-Time Live Search**: Debounced instant keyword matching across titles, descriptions, and categories.
- **Dynamic Category Filter**: Buttons for *All Categories*, *Men's Clothing*, *Women's Clothing*, *Jewelery*, and *Electronics*.
- **Multi-Criteria Sorting**:
  - Featured (Default order)
  - Price: Low to High
  - Price: High to Low
  - Rating: Highest First
  - Title: A to Z

### 5. Shopping Cart, Calculations & SMART10 Coupon
- **Slide-Over Drawer**: Clean sliding panel with backdrop blur and item management.
- **Item Controls**: Thumbnail preview, unit price, quantity increment (`+`), decrement (`-`), and remove button.
- **Financial Calculations**:
  - **Subtotal**: Dynamic summation of item totals.
  - **Coupon Discount**: Voucher code `SMART10` grants an instant **10% discount** on subtotal.
  - **Delivery Fee**: Standard delivery of ৳ 60.00; automatically becomes **FREE** for orders over ৳ 500.00.
  - **Payable Total**: `Math.max(0, Subtotal - Discount + Delivery)`.

### 6. Demo Balance & Checkout Guard
- **Initial Demo Balance**: Default wallet of **1,000.00 BDT**.
- **Add Money**: `+ Add Money` button adds **1,000.00 BDT** to the wallet on each click with instant toast feedback.
- **Checkout Prevention**: If Payable Total exceeds Demo Balance:
  - Checkout is blocked.
  - An inline red warning alert is displayed in the cart drawer.
  - A toast notification prompts the user: *"Insufficient Demo Balance! Short by ৳ X. Click '+ Add Money' to proceed."*
- **Order Confirmation**: When balance is sufficient:
  - Total is deducted from Demo Balance.
  - Cart is cleared.
  - An **Order Confirmation Modal** pops up with simulated Order ID (`#ORD-XXXXXX`), itemized summary, total paid, and remaining balance.

### 7. Browser LocalStorage Persistence
- Cart items (`smartshop_cart`), demo balance (`smartshop_balance`), and coupon state (`smartshop_coupon`) are stored in `localStorage`.
- State persists across page refreshes, tab closures, and browser reboots.

### 8. Customer Reviews & `data/reviews.json` Carousel
- **Asynchronous Fetch**: Loaded via relative path `data/reviews.json`, fully compatible with VS Code Live Server.
- **Carousel Controls**: Features automatic cycling (5-second intervals with pause-on-hover) and manual controls (Prev/Next buttons, active indicator dots).
- **Review Cards**: Reviewer avatars, names, academic/student roles, verified purchase badges, star ratings, review timestamps, and purchased product tags.

### 9. Contact Form with Client-Side Validation
- **Validated Fields**: Full Name (min 2 chars), Email Address (standard RFC regex validation), Subject (min 3 chars), Message (min 10 chars).
- **Interactive Feedback**: Instant red border and descriptive error text on invalid inputs; green borders on valid input.
- **Submission Feedback**: Inline success banner and animated toast notification upon valid submission.

### 10. Global Polish & Utilities
- **Floating Back-to-Top Button**: Smoothly scrolls to the top of the page when scrolled past 300px.
- **Toast Notification Stack**: Dynamic contextual notifications for cart events, balance top-ups, coupon validation, and checkout.
- **Simulated Economy Notices**: Explicit disclaimers highlighting simulated BDT prices and educational demonstration.

---

## 🛠️ Technology Stack & Compliance

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
├── README.md             # Comprehensive setup & project documentation
├── data/
│   └── reviews.json      # Verified customer reviews dataset
└── js/
    ├── app.js            # App coordinator, sticky nav, mobile menu & toasts
    ├── cart.js           # Cart state, calculations, coupon, balance & checkout
    ├── carousel.js       # 4-slide promo hero & reviews.json carousel logic
    ├── contact.js        # Contact form validation & submission handling
    └── products.js       # FakeStore fetch, search, filter, sort & quick view
```

---

## 🚀 Setup & Execution Instructions

To test `data/reviews.json` and FakeStore API fetches properly, run the project through a local web server (to prevent browser `file://` CORS restrictions on local JSON files):

### Method 1: VS Code Live Server (Recommended)
1. Open the `SmartShop` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by *Ritwick Dey*) if not already installed.
3. Right-click on [`index.html`](file:///c:/Users/hp/Desktop/SmartShop/index.html) in the file explorer and click **"Open with Live Server"**.
4. The application will launch automatically in your browser at `http://127.0.0.1:5500/index.html`.

### Method 2: Python Built-In HTTP Server
If Python is installed on your machine:
```bash
# Navigate to the SmartShop project directory
cd c:\Users\hp\Desktop\SmartShop

# Start the local HTTP server
python -m http.server 5500
```
Open your browser and navigate to: **`http://localhost:5500`**.

### Method 3: Node.js `npx serve`
If Node.js is installed:
```bash
# Navigate to the SmartShop project directory
cd c:\Users\hp\Desktop\SmartShop

# Run via npx
npx serve .
```

---

## 🧪 Verification & Grading Checklist

- [x] **Strict Tech Stack**: Pure HTML5, Tailwind CSS utilities, Vanilla JavaScript DOM. No React, Vue, Bootstrap, or custom CSS.
- [x] **FakeStore API**: Products fetched dynamically from `https://fakestoreapi.com/products`.
- [x] **Simulated BDT Currency**: All prices formatted as `৳` with explicit *(Simulated BDT)* labels.
- [x] **Sticky Navbar**: Responsive header with Home, Products, Reviews, About, Contact, Live Balance, and Cart badge.
- [x] **4-Slide Promo Carousel**: Auto-play (4.5s), pause on hover, next/previous buttons, and 4 indicator dots.
- [x] **Product Cards**: Responsive grid, image zoom, ratings, reviews count, category tag, and Quick View modal.
- [x] **Filtering & Sorting**: Real-time search, category filter pills, price/rating sorting, and empty state.
- [x] **Cart Drawer**: Quantity increment/decrement, item removal, subtotal, delivery fee, and empty cart placeholder.
- [x] **SMART10 Coupon**: 10% subtotal deduction upon code application.
- [x] **Demo Balance (1,000 BDT)**: Initial ৳1,000 balance with `+ Add Money` adding ৳1,000.
- [x] **Checkout Guard**: Blocks checkout when payable total exceeds balance with clear user warning.
- [x] **Receipt Modal**: Generates order receipt with Order ID, itemized totals, and remaining balance.
- [x] **LocalStorage Persistence**: Cart items, balance, and coupon persist across browser reloads.
- [x] **Reviews Carousel**: Fetches `data/reviews.json` with auto-play and manual controls.
- [x] **Contact Validation**: Inline validation for name, email, subject, message with success feedback.
- [x] **Back to Top**: Floating button with smooth scroll behavior.

---

## ⚠️ Academic Disclaimer

*SmartShop is an educational demonstration developed solely for the CSE-3532 mid-term evaluation. All BDT prices, demo balances, wallet top-ups, and checkout receipts are completely simulated. No real financial or payment processing takes place.*
# SmartShop
