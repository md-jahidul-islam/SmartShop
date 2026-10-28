/**
 * SmartShop
 * Application Orchestrator & Global Utilities
 * Strictly Vanilla JavaScript DOM & Tailwind Utility Classes
 */

const App = {
  toastContainerId: 'toast-container',

  /**
   * Main App Initialization
   */
  init() {
    this.setupStickyNavbar();
    this.setupActiveNavHighlight();
    this.setupMobileMenu();
    this.setupBackToTop();
    this.setupSmoothScroll();

    // Initialize submodules
    if (window.Cart) window.Cart.init();
    if (window.Products) window.Products.init();
    if (window.PromoCarousel) window.PromoCarousel.init();
    if (window.ReviewsCarousel) window.ReviewsCarousel.init();
    if (window.Contact) window.Contact.init();

    console.log('%cSmartShop Storefront Initialized Successfully', 'color: #f59e0b; font-size: 14px; font-weight: bold;');
  },

  /**
   * Sticky Navbar scroll behavior
   */
  setupStickyNavbar() {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('shadow-lg');
      } else {
        navbar.classList.remove('shadow-lg');
      }
    }, { passive: true });
  },

  /**
   * Active Section Highlighting in Navigation
   */
  setupActiveNavHighlight() {
    const sectionIds = ['home', 'products', 'reviews', 'about', 'contact'];
    const desktopLinks = document.querySelectorAll('.desktop-nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const navHeight = 110;

      let currentSectionId = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - navHeight;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            currentSectionId = id;
            break;
          }
        }
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        currentSectionId = 'contact';
      }

      // Update Desktop Sub-navbar Links
      desktopLinks.forEach(link => {
        const href = link.getAttribute('href')?.replace('#', '');
        if (href === currentSectionId) {
          link.classList.add('text-amber-400', 'font-bold', 'border-b-2', 'border-amber-400');
          link.classList.remove('text-slate-200', 'font-medium', 'border-transparent');
        } else {
          link.classList.remove('text-amber-400', 'font-bold', 'border-b-2', 'border-amber-400');
          link.classList.add('text-slate-200', 'font-medium', 'border-transparent');
        }
      });

      // Update Mobile Links
      mobileLinks.forEach(link => {
        const href = link.getAttribute('href')?.replace('#', '');
        if (href === currentSectionId) {
          link.classList.add('text-amber-600', 'font-bold', 'bg-amber-50', 'pl-3');
          link.classList.remove('text-slate-800', 'font-semibold');
        } else {
          link.classList.remove('text-amber-600', 'font-bold', 'bg-amber-50', 'pl-3');
          link.classList.add('text-slate-800', 'font-semibold');
        }
      });
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
  },

  /**
   * Mobile menu toggle and backdrop
   */
  setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !mobileMenu) return;

    const toggleMenu = () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    };

    menuBtn.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  },

  /**
   * Floating Back to Top Button
   */
  setupBackToTop() {
    const btn = document.getElementById('back-to-top-btn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        btn.classList.add('opacity-100', 'translate-y-0');
      } else {
        btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        btn.classList.remove('opacity-100', 'translate-y-0');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  },

  /**
   * Smooth internal anchor scrolling
   */
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  },

  /**
   * Show animated Toast Notification
   * @param {string} message
   * @param {'success'|'error'|'warning'|'info'} type
   * @param {number} duration
   */
  showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById(this.toastContainerId);
    if (!container) return;

    const toastId = 'toast-' + Date.now();
    let bgClasses = 'bg-slate-900 text-white border-slate-700';
    let iconSvg = '';

    switch (type) {
      case 'success':
        bgClasses = 'bg-slate-900 text-white border-emerald-500 shadow-xl shadow-slate-950/20';
        iconSvg = `
          <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `;
        break;
      case 'error':
        bgClasses = 'bg-slate-900 text-white border-rose-500 shadow-xl shadow-slate-950/20';
        iconSvg = `
          <svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `;
        break;
      case 'warning':
        bgClasses = 'bg-slate-900 text-white border-amber-500 shadow-xl shadow-slate-950/20';
        iconSvg = `
          <svg class="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        `;
        break;
      case 'info':
      default:
        bgClasses = 'bg-slate-900 text-white border-indigo-500 shadow-xl shadow-slate-950/20';
        iconSvg = `
          <svg class="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `;
        break;
    }

    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-2 opacity-0 max-w-sm pointer-events-auto ${bgClasses}`;
    toast.innerHTML = `
      ${iconSvg}
      <p class="text-xs sm:text-sm font-medium leading-tight flex-1">${message}</p>
      <button type="button" class="text-white/60 hover:text-white transition-colors p-1" onclick="document.getElementById('${toastId}')?.remove()">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  },

  /**
   * Display Order Confirmation Screen / Modal
   * @param {Object} order
   */
  showOrderConfirmation(order) {
    const modal = document.getElementById('order-receipt-modal');
    if (!modal) return;

    const orderIdEl = document.getElementById('receipt-order-id');
    const dateEl = document.getElementById('receipt-date');
    const customerEl = document.getElementById('receipt-customer-info');
    const itemsTable = document.getElementById('receipt-items-table');
    const subtotalEl = document.getElementById('receipt-subtotal');
    const discountRow = document.getElementById('receipt-discount-row');
    const discountEl = document.getElementById('receipt-discount');
    const deliveryEl = document.getElementById('receipt-delivery');
    const totalEl = document.getElementById('receipt-total');
    const balanceRemainingEl = document.getElementById('receipt-balance-remaining');

    if (orderIdEl) orderIdEl.textContent = '#' + order.orderId;
    if (dateEl) dateEl.textContent = order.date;
    if (customerEl) {
      customerEl.textContent = `${order.customerName} • ${order.address}, ${order.city} (Phone: ${order.phone})`;
    }

    if (itemsTable) {
      itemsTable.innerHTML = order.items.map(item => `
        <tr class="border-b border-slate-100 text-xs">
          <td class="py-2.5 font-medium text-slate-800 flex items-center gap-2">
            <img src="${item.image}" alt="${item.title}" class="w-8 h-8 object-contain rounded p-0.5 border border-slate-100">
            <span class="truncate max-w-[200px]">${item.title}</span>
          </td>
          <td class="py-2.5 text-center text-slate-600">${item.quantity}</td>
          <td class="py-2.5 text-right font-semibold text-slate-900">৳ ${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `).join('');
    }

    if (subtotalEl) subtotalEl.textContent = `৳ ${order.subtotal.toFixed(2)}`;

    if (discountRow && discountEl) {
      if (order.discount > 0) {
        discountRow.classList.remove('hidden');
        discountRow.classList.add('flex');
        discountEl.textContent = `-৳ ${order.discount.toFixed(2)}`;
      } else {
        discountRow.classList.add('hidden');
        discountRow.classList.remove('flex');
      }
    }

    if (deliveryEl) {
      deliveryEl.textContent = order.delivery === 0 ? 'FREE' : `৳ ${order.delivery.toFixed(2)}`;
    }

    if (totalEl) totalEl.textContent = `৳ ${order.totalPaid.toFixed(2)}`;
    if (balanceRemainingEl) balanceRemainingEl.textContent = `৳ ${order.remainingBalance.toFixed(2)}`;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  },

  /**
   * Close Order Confirmation Modal
   */
  closeOrderConfirmation() {
    const modal = document.getElementById('order-receipt-modal');
    if (!modal) return;

    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
};

window.App = App;

// Bootstrap once DOM content is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
