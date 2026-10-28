/**
 * SmartShop
 * Products Management: Fetching, Search, Category Filters, Price Sorting & Quick View Modal
 * Strictly Vanilla JavaScript DOM & Tailwind Utility Classes
 */

const Products = {
  API_URL: 'https://fakestoreapi.com/products',
  products: [],
  categories: [],
  activeCategory: 'all',
  searchQuery: '',
  sortOrder: 'default',
  selectedProduct: null,

  // Backup catalog in case of external network downtime
  fallbackProducts: [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday gear in the main compartment.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9, count: 120 }
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.30,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: { rate: 4.1, count: 259 }
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: { rate: 4.7, count: 500 }
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description: "The color could be slightly different between on the screen and in practice. Please note that body builds vary by person, therefore detailed size information should be reviewed.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      rating: { rate: 2.1, count: 430 }
    },
    {
      id: 5,
      title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695.00,
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 4.6, count: 400 }
    },
    {
      id: 6,
      title: "Solid Gold Petite Micropave",
      price: 168.00,
      description: "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States. Fine luxury finish.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 3.9, count: 70 }
    },
    {
      id: 9,
      title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
      price: 64.00,
      description: "USB 3.0 and USB 2.0 compatibility. Fast data transfers. Improve PC Performance. High Capacity; Compatibility Formatted NTFS for Windows 10, 8.1, 7.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      rating: { rate: 3.3, count: 203 }
    },
    {
      id: 10,
      title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
      price: 109.00,
      description: "Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance, making it ideal for typical PC workloads.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      rating: { rate: 2.9, count: 470 }
    },
    {
      id: 13,
      title: "Acer SB220Q bi 21.5 inches Full HD IPS Ultra-Thin Monitor",
      price: 599.00,
      description: "21.5 inches Full HD (1920 x 1080) widescreen IPS display. AMD Radeon FreeSync technology. No compatibility for VESA Mount. Refresh Rate: 75Hz.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
      rating: { rate: 2.9, count: 250 }
    },
    {
      id: 14,
      title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
      price: 999.99,
      description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side. Quantum Dot (QLED) technology, HDR support and factory calibration.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
      rating: { rate: 2.2, count: 140 }
    },
    {
      id: 15,
      title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coat",
      price: 56.99,
      description: "Note: The Jackets is US standard size, Please choose size as your usual wear. Material: 100% Polyester; Detachable Fleece Liner, Warm and Windproof.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
      rating: { rate: 2.6, count: 235 }
    },
    {
      id: 16,
      title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      price: 29.95,
      description: "100% POLYURETHANE(shell) 100% POLYESTER(lining). Detail stitching at sides. HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
      rating: { rate: 2.9, count: 340 }
    }
  ],

  /**
   * Initialize products module
   */
  init() {
    this.bindEvents();
    this.fetchProducts();
  },

  /**
   * Fetch products from FakeStore API with timeout and error fallback
   */
  async fetchProducts() {
    const grid = document.getElementById('products-grid');
    const errorContainer = document.getElementById('products-error-container');
    const emptyContainer = document.getElementById('products-empty-container');

    if (errorContainer) errorContainer.classList.add('hidden');
    if (emptyContainer) emptyContainer.classList.add('hidden');

    this.renderSkeletons(8);

    try {
      // 10 second timeout for fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(this.API_URL, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No products returned from catalog server');
      }

      this.products = data;
      this.extractCategories();
      this.renderCategoryFilters();
      this.applyFilterAndSort();

      if (window.App && typeof window.App.showToast === 'function') {
        window.App.showToast(`Loaded ${data.length} products across departments`, 'info');
      }
    } catch (err) {
      console.warn('FakeStore API fetch failed or timed out:', err);
      this.handleFetchError(err.message);
    }
  },

  /**
   * Handle API fetch error and provide fallback option
   * @param {string} errorMsg
   */
  handleFetchError(errorMsg) {
    const grid = document.getElementById('products-grid');
    const errorContainer = document.getElementById('products-error-container');
    const errorText = document.getElementById('products-error-message');

    if (grid) grid.innerHTML = '';
    if (errorContainer) {
      errorContainer.classList.remove('hidden');
      if (errorText) {
        errorText.textContent = `Unable to retrieve real-time inventory (${errorMsg}). You can retry the connection or switch to our backup catalog.`;
      }
    }
  },

  /**
   * Use fallback catalog dataset
   */
  loadFallbackProducts() {
    const errorContainer = document.getElementById('products-error-container');
    if (errorContainer) errorContainer.classList.add('hidden');

    this.products = [...this.fallbackProducts];
    this.extractCategories();
    this.renderCategoryFilters();
    this.applyFilterAndSort();

    if (window.App && typeof window.App.showToast === 'function') {
      window.App.showToast('Loaded backup product catalog successfully.', 'success');
    }
  },

  /**
   * Extract unique categories from loaded products
   */
  extractCategories() {
    const catSet = new Set(this.products.map(p => p.category));
    this.categories = ['all', ...Array.from(catSet)];

    // Populate header category select if present
    const headerCatSelect = document.getElementById('header-category-select');
    if (headerCatSelect) {
      headerCatSelect.innerHTML = this.categories.map(cat => {
        const label = cat === 'all' ? 'All Departments' : cat.charAt(0).toUpperCase() + cat.slice(1);
        return `<option value="${cat}">${label}</option>`;
      }).join('');
    }
  },

  /**
   * Render category filter buttons
   */
  renderCategoryFilters() {
    const container = document.getElementById('category-filters');
    if (!container) return;

    const formatCategoryName = (cat) => {
      if (cat === 'all') return 'All Departments';
      return cat.charAt(0).toUpperCase() + cat.slice(1);
    };

    container.innerHTML = this.categories.map(cat => {
      const isActive = this.activeCategory.toLowerCase() === cat.toLowerCase();
      const activeClasses = 'bg-slate-900 text-white shadow-sm border-slate-900';
      const inactiveClasses = 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300';

      return `
        <button 
          type="button" 
          class="px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 shrink-0 ${isActive ? activeClasses : inactiveClasses}"
          onclick="Products.setCategory('${cat}')"
        >
          ${formatCategoryName(cat)}
        </button>
      `;
    }).join('');
  },

  /**
   * Filter and sort products based on active filters
   */
  applyFilterAndSort() {
    let result = [...this.products];

    // Filter by Category
    if (this.activeCategory !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === this.activeCategory.toLowerCase());
    }

    // Filter by Search Query
    if (this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Sort products
    switch (this.sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'default':
      default:
        // maintain original catalog order
        break;
    }

    this.renderProducts(result);
  },

  /**
   * Set active category filter
   * @param {string} cat
   */
  setCategory(cat) {
    this.activeCategory = cat;
    
    // Sync header dropdown if available
    const headerCatSelect = document.getElementById('header-category-select');
    if (headerCatSelect) headerCatSelect.value = cat;

    this.renderCategoryFilters();
    this.applyFilterAndSort();
  },

  /**
   * Set search query
   * @param {string} query
   */
  setSearch(query) {
    this.searchQuery = query;

    // Sync input fields
    const productSearchInput = document.getElementById('product-search-input');
    const headerSearchInput = document.getElementById('header-search-input');

    if (productSearchInput && productSearchInput.value !== query) {
      productSearchInput.value = query;
    }
    if (headerSearchInput && headerSearchInput.value !== query) {
      headerSearchInput.value = query;
    }

    this.applyFilterAndSort();
  },

  /**
   * Set sort order
   * @param {string} order
   */
  setSort(order) {
    this.sortOrder = order;
    this.applyFilterAndSort();
  },

  /**
   * Reset all filters to default
   */
  resetFilters() {
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.sortOrder = 'default';

    const searchInput = document.getElementById('product-search-input');
    if (searchInput) searchInput.value = '';

    const headerSearchInput = document.getElementById('header-search-input');
    if (headerSearchInput) headerSearchInput.value = '';

    const headerCatSelect = document.getElementById('header-category-select');
    if (headerCatSelect) headerCatSelect.value = 'all';

    const sortSelect = document.getElementById('product-sort-select');
    if (sortSelect) sortSelect.value = 'default';

    this.renderCategoryFilters();
    this.applyFilterAndSort();
  },

  /**
   * Render loading skeleton placeholders
   * @param {number} count
   */
  renderSkeletons(count = 8) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let skeletons = '';
    for (let i = 0; i < count; i++) {
      skeletons += `
        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm animate-pulse flex flex-col h-full">
          <div class="w-full h-48 bg-slate-200 rounded-xl mb-4"></div>
          <div class="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
          <div class="h-5 bg-slate-200 rounded w-5/6 mb-2"></div>
          <div class="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
          <div class="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
            <div class="h-6 bg-slate-200 rounded w-1/3"></div>
            <div class="h-9 bg-slate-200 rounded w-24"></div>
          </div>
        </div>
      `;
    }
    grid.innerHTML = skeletons;
  },

  /**
   * Generate SVG Star rating HTML
   * @param {number} rate
   * @returns {string}
   */
  generateStars(rate = 0) {
    let stars = '';
    const roundedRate = Math.round(rate);
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRate) {
        stars += `
          <svg class="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        `;
      } else {
        stars += `
          <svg class="w-3.5 h-3.5 text-slate-200 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        `;
      }
    }
    return stars;
  },

  /**
   * Render filtered products in grid
   * @param {Array} items
   */
  renderProducts(items) {
    const grid = document.getElementById('products-grid');
    const emptyContainer = document.getElementById('products-empty-container');
    const countEl = document.getElementById('products-count');

    if (!grid) return;

    if (countEl) {
      countEl.textContent = `Showing ${items.length} of ${this.products.length} products`;
    }

    if (items.length === 0) {
      grid.innerHTML = '';
      if (emptyContainer) emptyContainer.classList.remove('hidden');
      return;
    }

    if (emptyContainer) emptyContainer.classList.add('hidden');

    grid.innerHTML = items.map(product => {
      const priceFormatted = parseFloat(product.price).toFixed(2);
      const ratingRate = product.rating?.rate || 0;
      const ratingCount = product.rating?.count || 0;
      const starsHtml = this.generateStars(ratingRate);
      const isTopRated = ratingRate >= 4.0;

      return `
        <div class="group bg-white rounded-2xl p-4 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
          <!-- Card Header Badges -->
          <div class="flex items-center justify-between mb-3">
            <span class="inline-block text-[11px] font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              ${product.category}
            </span>
            ${isTopRated ? `
              <span class="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                ★ Popular
              </span>
            ` : ''}
          </div>

          <!-- Product Image Container -->
          <div 
            class="relative w-full h-48 bg-slate-50/80 rounded-xl p-4 flex items-center justify-center overflow-hidden mb-4 cursor-pointer"
            onclick="Products.openQuickView(${product.id})"
          >
            <img 
              src="${product.image}" 
              alt="${product.title}" 
              loading="lazy" 
              class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- Product Details -->
          <div class="flex-1 flex flex-col">
            <h3 
              class="text-sm font-bold text-slate-800 line-clamp-2 hover:text-indigo-600 transition-colors mb-2 cursor-pointer"
              title="${product.title}"
              onclick="Products.openQuickView(${product.id})"
            >
              ${product.title}
            </h3>

            <!-- Rating Stars -->
            <div class="flex items-center gap-1.5 mb-2 mt-auto">
              <div class="flex items-center">
                ${starsHtml}
              </div>
              <span class="text-xs font-semibold text-slate-700">${ratingRate}</span>
              <span class="text-xs text-slate-400">(${ratingCount})</span>
            </div>

            <!-- Delivery Feature Note -->
            <div class="mb-3">
              <span class="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Express Delivery Eligible
              </span>
            </div>

            <!-- Price and Action Buttons -->
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <span class="text-base font-extrabold text-slate-900">৳ ${priceFormatted}</span>
                <span class="text-[10px] font-medium text-slate-400 block">BDT • In Stock</span>
              </div>

              <div class="flex items-center gap-1.5">
                <button 
                  type="button" 
                  class="p-2 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 rounded-xl transition-colors"
                  onclick="Products.openQuickView(${product.id})"
                  title="Quick View Details"
                  aria-label="Quick View ${product.title}"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>

                <button 
                  type="button" 
                  class="inline-flex items-center gap-1 px-3 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
                  onclick="Cart.addItem(Products.getProductById(${product.id}))"
                  aria-label="Add ${product.title} to cart"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  /**
   * Helper to retrieve product by ID
   * @param {number} id
   * @returns {Object|null}
   */
  getProductById(id) {
    return this.products.find(p => p.id === id) || null;
  },

  /**
   * Open Quick View product modal
   * @param {number} id
   */
  openQuickView(id) {
    const product = this.getProductById(id);
    if (!product) return;

    this.selectedProduct = product;
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    // Populate modal fields
    const modalImg = document.getElementById('modal-product-image');
    const modalTitle = document.getElementById('modal-product-title');
    const modalCategory = document.getElementById('modal-product-category');
    const modalPrice = document.getElementById('modal-product-price');
    const modalRatingStars = document.getElementById('modal-product-stars');
    const modalRatingScore = document.getElementById('modal-product-rating-score');
    const modalRatingCount = document.getElementById('modal-product-rating-count');
    const modalDescription = document.getElementById('modal-product-description');
    const modalQty = document.getElementById('modal-product-qty');

    if (modalImg) modalImg.src = product.image;
    if (modalImg) modalImg.alt = product.title;
    if (modalTitle) modalTitle.textContent = product.title;
    if (modalCategory) modalCategory.textContent = product.category;
    if (modalPrice) modalPrice.textContent = `৳ ${parseFloat(product.price).toFixed(2)}`;
    if (modalRatingStars) modalRatingStars.innerHTML = this.generateStars(product.rating?.rate || 0);
    if (modalRatingScore) modalRatingScore.textContent = product.rating?.rate || '0.0';
    if (modalRatingCount) modalRatingCount.textContent = `(${product.rating?.count || 0} reviews)`;
    if (modalDescription) modalDescription.textContent = product.description;
    if (modalQty) modalQty.value = '1';

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  },

  /**
   * Close Quick View product modal
   */
  closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    this.selectedProduct = null;
  },

  /**
   * Add currently selected product from modal into Cart
   */
  addCurrentModalProductToCart() {
    if (!this.selectedProduct) return;
    const qtyInput = document.getElementById('modal-product-qty');
    const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value) || 1) : 1;

    Cart.addItem(this.selectedProduct, qty);
    this.closeQuickView();
  },

  /**
   * Buy Now action from modal: adds product and proceeds directly to checkout
   */
  buyNowFromModal() {
    if (!this.selectedProduct) return;
    const qtyInput = document.getElementById('modal-product-qty');
    const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value) || 1) : 1;

    Cart.addItem(this.selectedProduct, qty);
    this.closeQuickView();
    Cart.startCheckout();
  },

  /**
   * Bind event listeners for search, sort, and modal
   */
  bindEvents() {
    // Section Search input handler
    const searchInput = document.getElementById('product-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.setSearch(e.target.value);
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) {
          if (e.target.value.length > 0) {
            clearBtn.classList.remove('hidden');
          } else {
            clearBtn.classList.add('hidden');
          }
        }
      });
    }

    // Header global search bar
    const headerSearchInput = document.getElementById('header-search-input');
    const headerSearchBtn = document.getElementById('header-search-btn');
    const headerCatSelect = document.getElementById('header-category-select');

    if (headerSearchInput) {
      headerSearchInput.addEventListener('input', (e) => {
        this.setSearch(e.target.value);
      });

      headerSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.setSearch(headerSearchInput.value);
          const productsSection = document.getElementById('products');
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }

    if (headerSearchBtn) {
      headerSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (headerSearchInput) {
          this.setSearch(headerSearchInput.value);
        }
        const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (headerCatSelect) {
      headerCatSelect.addEventListener('change', (e) => {
        this.setCategory(e.target.value);
      });
    }

    // Clear search button
    const clearSearchBtn = document.getElementById('search-clear-btn');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          clearSearchBtn.classList.add('hidden');
          this.setSearch('');
        }
      });
    }

    // Sort dropdown change
    const sortSelect = document.getElementById('product-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.setSort(e.target.value);
      });
    }

    // Reset filters button
    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => this.resetFilters());
    }

    // Retry fetch button in error state
    const retryBtn = document.getElementById('products-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.fetchProducts());
    }

    // Backup catalog button in error state
    const fallbackBtn = document.getElementById('products-fallback-btn');
    if (fallbackBtn) {
      fallbackBtn.addEventListener('click', () => this.loadFallbackProducts());
    }

    // Modal close button
    const modalCloseBtn = document.getElementById('modal-close-btn');
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => this.closeQuickView());
    }

    // Modal backdrop click
    const modalBackdrop = document.getElementById('modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', () => this.closeQuickView());
    }

    // Modal Add To Cart
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
    if (modalAddToCartBtn) {
      modalAddToCartBtn.addEventListener('click', () => this.addCurrentModalProductToCart());
    }

    // Modal Buy Now
    const modalBuyNowBtn = document.getElementById('modal-buy-now-btn');
    if (modalBuyNowBtn) {
      modalBuyNowBtn.addEventListener('click', () => this.buyNowFromModal());
    }

    // Modal Qty buttons (+/-)
    const modalQtyMinus = document.getElementById('modal-qty-minus');
    const modalQtyPlus = document.getElementById('modal-qty-plus');
    const modalQtyInput = document.getElementById('modal-product-qty');

    if (modalQtyMinus && modalQtyInput) {
      modalQtyMinus.addEventListener('click', () => {
        const val = parseInt(modalQtyInput.value) || 1;
        if (val > 1) modalQtyInput.value = (val - 1).toString();
      });
    }

    if (modalQtyPlus && modalQtyInput) {
      modalQtyPlus.addEventListener('click', () => {
        const val = parseInt(modalQtyInput.value) || 1;
        modalQtyInput.value = (val + 1).toString();
      });
    }

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeQuickView();
        if (window.Cart) {
          window.Cart.closeCheckoutModal();
          window.Cart.closeOrderHistoryModal();
        }
        if (window.App) {
          window.App.closeOrderConfirmation();
        }
      }
    });
  }
};

window.Products = Products;
