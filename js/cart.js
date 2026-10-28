/**
 * SmartShop
 * Cart, Demo Balance, Coupon, and Checkout Management
 * Strictly Vanilla JavaScript DOM & LocalStorage
 */

const Cart = {
  // Constants
  STORAGE_CART_KEY: 'smartshop_cart',
  STORAGE_BALANCE_KEY: 'smartshop_balance',
  STORAGE_COUPON_KEY: 'smartshop_coupon',
  INITIAL_BALANCE: 1000.0,
  ADD_MONEY_AMOUNT: 1000.0,
  COUPON_CODE: 'SMART10',
  COUPON_DISCOUNT_PERCENT: 10,
  SHIPPING_THRESHOLD: 500.0,
  SHIPPING_FLAT_RATE: 60.0,

  // State
  items: [],
  balance: 1000.0,
  appliedCoupon: null,

  /**
   * Initialize Cart state from LocalStorage
   */
  init() {
    this.loadState();
    this.bindEvents();
    this.render();
  },

  /**
   * Load state from localStorage
   */
  loadState() {
    // Load Cart
    try {
      const storedCart = localStorage.getItem(this.STORAGE_CART_KEY);
      this.items = storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      this.items = [];
    }

    // Load Balance
    try {
      const storedBalance = localStorage.getItem(this.STORAGE_BALANCE_KEY);
      if (storedBalance !== null && !isNaN(parseFloat(storedBalance))) {
        this.balance = parseFloat(storedBalance);
      } else {
        this.balance = this.INITIAL_BALANCE;
        this.saveBalance();
      }
    } catch (e) {
      console.error('Failed to load balance from localStorage:', e);
      this.balance = this.INITIAL_BALANCE;
    }

    // Load Coupon
    try {
      const storedCoupon = localStorage.getItem(this.STORAGE_COUPON_KEY);
      if (storedCoupon && storedCoupon.toUpperCase() === this.COUPON_CODE) {
        this.appliedCoupon = this.COUPON_CODE;
      } else {
        this.appliedCoupon = null;
      }
    } catch (e) {
      this.appliedCoupon = null;
    }
  },

  /**
   * Save items to localStorage
   */
  saveCart() {
    try {
      localStorage.setItem(this.STORAGE_CART_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  },

  /**
   * Save balance to localStorage
   */
  saveBalance() {
    try {
      localStorage.setItem(this.STORAGE_BALANCE_KEY, this.balance.toFixed(2));
    } catch (e) {
      console.error('Error saving balance to localStorage:', e);
    }
  },

  /**
   * Save coupon to localStorage
   */
  saveCoupon() {
    try {
      if (this.appliedCoupon) {
        localStorage.setItem(this.STORAGE_COUPON_KEY, this.appliedCoupon);
      } else {
        localStorage.removeItem(this.STORAGE_COUPON_KEY);
      }
    } catch (e) {
      console.error('Error saving coupon to localStorage:', e);
    }
  },

  /**
   * Add a product to the cart
   * @param {Object} product
   * @param {number} quantity
   */
  addItem(product, quantity = 1) {
    if (!product || !product.id) return;

    const existingIndex = this.items.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: parseFloat(product.price),
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }

    this.saveCart();
    this.render();

    if (window.App && typeof window.App.showToast === 'function') {
      window.App.showToast(`"${product.title.slice(0, 24)}..." added to cart!`, 'success');
    }
  },

  /**
   * Update quantity of an existing item in the cart
   * @param {number} productId
   * @param {number} delta - (+1 or -1)
   */
  updateQuantity(productId, delta) {
    const itemIndex = this.items.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    const newQty = this.items[itemIndex].quantity + delta;
    if (newQty <= 0) {
      this.removeItem(productId);
    } else {
      this.items[itemIndex].quantity = newQty;
      this.saveCart();
      this.render();
    }
  },

  /**
   * Remove item entirely from cart
   * @param {number} productId
   */
  removeItem(productId) {
    const itemIndex = this.items.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      const removed = this.items.splice(itemIndex, 1)[0];
      this.saveCart();
      this.render();

      if (window.App && typeof window.App.showToast === 'function') {
        window.App.showToast(`Removed "${removed.title.slice(0, 20)}..." from cart`, 'info');
      }
    }
  },

  /**
   * Clear all items from the cart
   */
  clearCart() {
    this.items = [];
    this.appliedCoupon = null;
    this.saveCart();
    this.saveCoupon();
    this.render();
  },

  /**
   * Add money to demo balance (+1000 BDT)
   * @param {number} amount
   */
  addMoney(amount = this.ADD_MONEY_AMOUNT) {
    this.balance += amount;
    this.saveBalance();
    this.render();

    if (window.App && typeof window.App.showToast === 'function') {
      window.App.showToast(`Added ৳ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} to Demo Balance! New Balance: ৳ ${this.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'success');
    }
  },

  /**
   * Reset balance for testing if requested
   */
  resetBalance() {
    this.balance = this.INITIAL_BALANCE;
    this.saveBalance();
    this.render();
    if (window.App && typeof window.App.showToast === 'function') {
      window.App.showToast(`Demo balance reset to initial ৳ ${this.INITIAL_BALANCE.toFixed(2)}`, 'info');
    }
  },

  /**
   * Apply discount coupon code
   * @param {string} code
   */
  applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();

    if (!cleanCode) {
      if (window.App && typeof window.App.showToast === 'function') {
        window.App.showToast('Please enter a coupon code.', 'warning');
      }
      return false;
    }

    if (cleanCode === this.COUPON_CODE) {
      this.appliedCoupon = this.COUPON_CODE;
      this.saveCoupon();
      this.render();
      if (window.App && typeof window.App.showToast === 'function') {
        window.App.showToast(`Coupon SMART10 applied! 10% discount deducted.`, 'success');
      }
      return true;
    } else {
      if (window.App && typeof window.App.showToast === 'function') {
        window.App.showToast(`Invalid coupon "${cleanCode}". Use coupon SMART10.`, 'error');
      }
      return false;
    }
  },

  /**
   * Remove applied coupon
   */
  removeCoupon() {
    this.appliedCoupon = null;
    this.saveCoupon();
    this.render();
    if (window.App && typeof window.App.showToast === 'function') {
      window.App.showToast('Coupon removed.', 'info');
    }
  },

  /**
   * Calculate subtotal, delivery fee, shipping fee, discount, and final payable amount
   * @returns {Object}
   */
  getCalculations() {
    const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const hasItems = this.items.length > 0;

    let discount = 0;
    if (this.appliedCoupon === this.COUPON_CODE && hasItems) {
      discount = subtotal * (this.COUPON_DISCOUNT_PERCENT / 100);
    }

    let deliveryFee = 0;
    if (hasItems) {
      // Free delivery if subtotal after discount >= 500, else 60 BDT
      deliveryFee = (subtotal - discount) >= this.SHIPPING_THRESHOLD ? 0 : this.SHIPPING_FLAT_RATE;
    }

    const payableTotal = Math.max(0, subtotal - discount + deliveryFee);
    const totalItemCount = this.items.reduce((count, item) => count + item.quantity, 0);

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      delivery: parseFloat(deliveryFee.toFixed(2)),
      payableTotal: parseFloat(payableTotal.toFixed(2)),
      itemCount: totalItemCount,
      isFreeShipping: hasItems && deliveryFee === 0,
      balanceDifference: parseFloat((payableTotal - this.balance).toFixed(2))
    };
  },

  /**
   * Perform checkout with balance validation
   */
  checkout() {
    const calc = this.getCalculations();

    if (this.items.length === 0) {
      if (window.App && typeof window.App.showToast === 'function') {
        window.App.showToast('Your cart is empty. Add products before checking out!', 'warning');
      }
      return false;
    }

    // Check if final payable amount exceeds demo balance
    if (calc.payableTotal > this.balance) {
      const shortage = (calc.payableTotal - this.balance).toLocaleString('en-US', { minimumFractionDigits: 2 });
      if (window.App && typeof window.App.showToast === 'function') {
        window.App.showToast(`Insufficient Demo Balance! Short by ৳ ${shortage}. Click "+ Add Money" to proceed.`, 'error');
      }

      // Highlight the balance error element in the cart drawer
      const warningBanner = document.getElementById('cart-balance-warning');
      if (warningBanner) {
        warningBanner.classList.remove('hidden');
        warningBanner.classList.add('flex');
        setTimeout(() => {
          warningBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
      return false;
    }

    // Checkout successful: Deduct balance and capture order details
    const orderItems = [...this.items];
    const orderSummary = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString(),
      items: orderItems,
      subtotal: calc.subtotal,
      discount: calc.discount,
      delivery: calc.delivery,
      totalPaid: calc.payableTotal,
      paidFromBalance: calc.payableTotal,
      previousBalance: this.balance,
      remainingBalance: parseFloat((this.balance - calc.payableTotal).toFixed(2))
    };

    // Deduct balance
    this.balance = orderSummary.remainingBalance;
    this.saveBalance();

    // Clear cart and coupon
    this.clearCart();

    // Close cart drawer
    this.closeCartDrawer();

    // Show order confirmation receipt modal
    if (window.App && typeof window.App.showOrderReceiptModal === 'function') {
      window.App.showOrderReceiptModal(orderSummary);
    }

    if (window.App && typeof window.App.showToast === 'function') {
      window.App.showToast(`Order #${orderSummary.orderId} placed successfully! ৳ ${calc.payableTotal.toFixed(2)} deducted.`, 'success');
    }

    return true;
  },

  /**
   * Bind DOM event listeners for cart interactions
   */
  bindEvents() {
    // Open cart drawer buttons
    const cartToggles = document.querySelectorAll('[data-action="toggle-cart"]');
    cartToggles.forEach(btn => {
      btn.addEventListener('click', () => this.toggleCartDrawer());
    });

    // Close cart drawer button
    const closeBtn = document.getElementById('cart-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCartDrawer());
    }

    // Backdrop click
    const backdrop = document.getElementById('cart-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeCartDrawer());
    }

    // Add Money buttons
    const addMoneyButtons = document.querySelectorAll('[data-action="add-money"]');
    addMoneyButtons.forEach(btn => {
      btn.addEventListener('click', () => this.addMoney(this.ADD_MONEY_AMOUNT));
    });

    // Reset balance button (if present)
    const resetBalanceBtn = document.getElementById('reset-balance-btn');
    if (resetBalanceBtn) {
      resetBalanceBtn.addEventListener('click', () => this.resetBalance());
    }

    // Coupon form submission
    const couponForm = document.getElementById('coupon-form');
    if (couponForm) {
      couponForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('coupon-input');
        if (input) {
          this.applyCoupon(input.value);
        }
      });
    }

    // Remove coupon button
    const removeCouponBtn = document.getElementById('coupon-remove-btn');
    if (removeCouponBtn) {
      removeCouponBtn.addEventListener('click', () => this.removeCoupon());
    }

    // Checkout button
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.checkout());
    }

    // Clear cart button
    const clearCartBtn = document.getElementById('cart-clear-all-btn');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => {
        if (this.items.length === 0) return;
        if (confirm('Are you sure you want to clear your cart?')) {
          this.clearCart();
          if (window.App && typeof window.App.showToast === 'function') {
            window.App.showToast('Cart cleared.', 'info');
          }
        }
      });
    }
  },

  /**
   * Toggle cart drawer visibility
   */
  toggleCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (!drawer || !backdrop) return;

    const isHidden = drawer.classList.contains('translate-x-full');
    if (isHidden) {
      this.openCartDrawer();
    } else {
      this.closeCartDrawer();
    }
  },

  /**
   * Open cart drawer
   */
  openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (!drawer || !backdrop) return;

    backdrop.classList.remove('hidden', 'opacity-0');
    backdrop.classList.add('opacity-100');

    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    document.body.classList.add('overflow-hidden');
  },

  /**
   * Close cart drawer
   */
  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (!drawer || !backdrop) return;

    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');

    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
    document.body.classList.remove('overflow-hidden');

    setTimeout(() => {
      if (backdrop.classList.contains('opacity-0')) {
        backdrop.classList.add('hidden');
      }
    }, 300);
  },

  /**
   * Render all cart-related UI components
   */
  render() {
    const calc = this.getCalculations();

    // 1. Update Balance displays everywhere
    const balanceDisplays = document.querySelectorAll('[data-bind="demo-balance"]');
    const formattedBalance = `৳ ${this.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    balanceDisplays.forEach(el => {
      el.textContent = formattedBalance;
    });

    // 2. Update Cart Count Badges
    const countBadges = document.querySelectorAll('[data-bind="cart-count"]');
    countBadges.forEach(badge => {
      badge.textContent = calc.itemCount;
      if (calc.itemCount > 0) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    });

    // 3. Render Cart Items List
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty-state');
    const cartFooter = document.getElementById('cart-footer');

    if (cartItemsContainer && emptyState && cartFooter) {
      if (this.items.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        cartFooter.classList.add('hidden');
      } else {
        emptyState.classList.add('hidden');
        cartFooter.classList.remove('hidden');

        cartItemsContainer.innerHTML = this.items.map(item => {
          const itemTotal = (item.price * item.quantity).toFixed(2);
          return `
            <div class="flex items-center gap-4 py-4 border-b border-slate-100 group">
              <div class="w-16 h-16 shrink-0 bg-slate-50 border border-slate-200 rounded-lg p-1 flex items-center justify-center overflow-hidden">
                <img src="${item.image}" alt="${item.title}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200">
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-xs font-semibold text-slate-800 line-clamp-1" title="${item.title}">${item.title}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-xs text-indigo-600 font-bold">৳ ${item.price.toFixed(2)}</span>
                  <span class="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">${item.category}</span>
                </div>
                <!-- Quantity & Total -->
                <div class="flex items-center justify-between mt-2">
                  <div class="flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50">
                    <button type="button" class="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors" onclick="Cart.updateQuantity(${item.id}, -1)" aria-label="Decrease quantity">-</button>
                    <span class="w-8 text-center text-xs font-semibold text-slate-800 bg-white py-0.5">${item.quantity}</span>
                    <button type="button" class="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors" onclick="Cart.updateQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-xs font-bold text-slate-900">৳ ${itemTotal}</span>
                    <button type="button" class="text-slate-400 hover:text-red-500 transition-colors p-1" onclick="Cart.removeItem(${item.id})" aria-label="Remove item">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // 4. Update Financial Calculations in Cart Footer
    const subtotalEl = document.getElementById('cart-subtotal');
    if (subtotalEl) subtotalEl.textContent = `৳ ${calc.subtotal.toFixed(2)}`;

    const discountRow = document.getElementById('cart-discount-row');
    const discountEl = document.getElementById('cart-discount');
    if (discountRow && discountEl) {
      if (calc.discount > 0) {
        discountRow.classList.remove('hidden');
        discountRow.classList.add('flex');
        discountEl.textContent = `-৳ ${calc.discount.toFixed(2)}`;
      } else {
        discountRow.classList.add('hidden');
        discountRow.classList.remove('flex');
      }
    }

    const deliveryEl = document.getElementById('cart-delivery');
    const deliveryBadge = document.getElementById('cart-delivery-badge');
    if (deliveryEl) {
      if (calc.delivery === 0 && this.items.length > 0) {
        deliveryEl.textContent = 'FREE';
        if (deliveryBadge) {
          deliveryBadge.textContent = 'Free Delivery applied!';
          deliveryBadge.classList.remove('hidden');
        }
      } else {
        deliveryEl.textContent = `৳ ${calc.delivery.toFixed(2)}`;
        if (deliveryBadge) {
          deliveryBadge.classList.add('hidden');
        }
      }
    }

    const payableTotalEl = document.getElementById('cart-payable-total');
    if (payableTotalEl) payableTotalEl.textContent = `৳ ${calc.payableTotal.toFixed(2)}`;

    // 5. Update Coupon UI State
    const couponInput = document.getElementById('coupon-input');
    const couponAppliedBadge = document.getElementById('coupon-applied-badge');
    const couponAppliedCode = document.getElementById('coupon-applied-code');
    const couponForm = document.getElementById('coupon-form');

    if (this.appliedCoupon) {
      if (couponAppliedBadge) couponAppliedBadge.classList.remove('hidden');
      if (couponAppliedCode) couponAppliedCode.textContent = this.appliedCoupon;
      if (couponForm) couponForm.classList.add('hidden');
    } else {
      if (couponAppliedBadge) couponAppliedBadge.classList.add('hidden');
      if (couponForm) couponForm.classList.remove('hidden');
      if (couponInput) couponInput.value = '';
    }

    // 6. Update Demo Balance Sufficiency Warning
    const warningBanner = document.getElementById('cart-balance-warning');
    const warningText = document.getElementById('cart-balance-warning-text');
    const checkoutBtn = document.getElementById('cart-checkout-btn');

    if (warningBanner && warningText && checkoutBtn) {
      if (this.items.length > 0 && calc.payableTotal > this.balance) {
        const shortage = (calc.payableTotal - this.balance).toLocaleString('en-US', { minimumFractionDigits: 2 });
        warningBanner.classList.remove('hidden');
        warningBanner.classList.add('flex');
        warningText.textContent = `Insufficient demo balance! Need ৳ ${shortage} more.`;
        checkoutBtn.classList.add('opacity-75');
      } else {
        warningBanner.classList.add('hidden');
        warningBanner.classList.remove('flex');
        checkoutBtn.classList.remove('opacity-75');
      }
    }
  }
};

window.Cart = Cart;
