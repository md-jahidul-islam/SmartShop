/**
 * SmartShop
 * Carousel Modules: 4-Image Promotional Banner Carousel & Customer Reviews Carousel
 * Strictly Vanilla JavaScript DOM & Tailwind Utility Classes
 */

const PromoCarousel = {
  slides: [
    {
      id: 1,
      badge: "Featured Electronics",
      title: "Next-Gen Tech & Accessories",
      subtitle: "Elevate your productivity with high-performance displays, external storage, and accessories with clear BDT pricing.",
      ctaText: "Shop Tech Collection",
      ctaHref: "#products",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&auto=format&fit=crop&q=80",
      accent: "from-blue-900/90 via-slate-900/80 to-transparent"
    },
    {
      id: 2,
      badge: "Seasonal Wardrobe 2026",
      title: "Premium Casual & Outerwear",
      subtitle: "Handpicked cotton jackets, tailored slim-fit tees, and everyday essentials curated for style and comfort.",
      ctaText: "Explore Clothing",
      ctaHref: "#products",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80",
      accent: "from-emerald-950/90 via-slate-900/80 to-transparent"
    },
    {
      id: 3,
      badge: "Artisanal Elegance",
      title: "Handcrafted Luxury Jewelry",
      subtitle: "Discover pure gold micropave bands, station bracelets, and timeless pieces designed to shine.",
      ctaText: "Discover Jewelry",
      ctaHref: "#products",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&auto=format&fit=crop&q=80",
      accent: "from-amber-950/90 via-slate-900/80 to-transparent"
    },
    {
      id: 4,
      badge: "Special Offer: 10% OFF",
      title: "Get 10% Discount with SMART10",
      subtitle: "Apply voucher code SMART10 at checkout and enjoy instant subtotal savings on your order.",
      ctaText: "Claim 10% Voucher",
      ctaHref: "#products",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop&q=80",
      accent: "from-purple-950/90 via-slate-900/80 to-transparent"
    }
  ],

  currentIndex: 0,
  autoInterval: null,
  INTERVAL_TIME: 4500,

  init() {
    this.renderSlides();
    this.renderIndicators();
    this.bindEvents();
    this.goToSlide(0);
    this.startAutoPlay();
  },

  renderSlides() {
    const container = document.getElementById('promo-carousel-slides');
    if (!container) return;

    container.innerHTML = this.slides.map((slide, index) => {
      return `
        <div 
          data-slide-index="${index}" 
          class="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}"
        >
          <!-- Background Image -->
          <img 
            src="${slide.image}" 
            alt="${slide.title}" 
            class="absolute inset-0 w-full h-full object-cover object-center"
          />
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-r ${slide.accent}"></div>
          <div class="absolute inset-0 bg-black/20"></div>

          <!-- Slide Content -->
          <div class="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center items-start z-20">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-wide uppercase border border-white/30 mb-4">
              <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              ${slide.badge}
            </span>
            <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-2xl leading-tight mb-4 drop-shadow-sm">
              ${slide.title}
            </h2>
            <p class="text-base sm:text-lg text-slate-200 max-w-xl mb-8 leading-relaxed font-normal">
              ${slide.subtitle}
            </p>
            <div class="flex flex-wrap items-center gap-4">
              <a 
                href="${slide.ctaHref}" 
                class="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base flex items-center gap-2"
              >
                <span>${slide.ctaText}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </a>
              <button 
                type="button" 
                onclick="Cart.toggleCartDrawer()" 
                class="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-semibold rounded-xl transition-all duration-200 text-sm sm:text-base flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                <span>Open Cart</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderIndicators() {
    const indicatorsContainer = document.getElementById('promo-carousel-indicators');
    if (!indicatorsContainer) return;

    indicatorsContainer.innerHTML = this.slides.map((_, index) => {
      return `
        <button 
          type="button" 
          class="h-2.5 rounded-full transition-all duration-300 ${index === 0 ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'}"
          data-indicator-index="${index}"
          aria-label="Go to slide ${index + 1}"
        ></button>
      `;
    }).join('');
  },

  goToSlide(index) {
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;
    this.currentIndex = index;

    // Update slides visibility
    const slideElements = document.querySelectorAll('#promo-carousel-slides [data-slide-index]');
    slideElements.forEach((el, i) => {
      if (i === index) {
        el.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
        el.classList.add('opacity-100', 'z-10');
      } else {
        el.classList.remove('opacity-100', 'z-10');
        el.classList.add('opacity-0', 'pointer-events-none', 'z-0');
      }
    });

    // Update indicators
    const indicatorButtons = document.querySelectorAll('#promo-carousel-indicators [data-indicator-index]');
    indicatorButtons.forEach((btn, i) => {
      if (i === index) {
        btn.classList.remove('w-2.5', 'bg-white/50');
        btn.classList.add('w-8', 'bg-white');
      } else {
        btn.classList.remove('w-8', 'bg-white');
        btn.classList.add('w-2.5', 'bg-white/50');
      }
    });
  },

  next() {
    this.goToSlide(this.currentIndex + 1);
  },

  prev() {
    this.goToSlide(this.currentIndex - 1);
  },

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoInterval = setInterval(() => {
      this.next();
    }, this.INTERVAL_TIME);
  },

  stopAutoPlay() {
    if (this.autoInterval) {
      clearInterval(this.autoInterval);
      this.autoInterval = null;
    }
  },

  bindEvents() {
    const prevBtn = document.getElementById('promo-prev-btn');
    const nextBtn = document.getElementById('promo-next-btn');
    const carouselWrapper = document.getElementById('promo-carousel');
    const indicatorsContainer = document.getElementById('promo-carousel-indicators');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.prev();
        this.startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.next();
        this.startAutoPlay();
      });
    }

    if (indicatorsContainer) {
      indicatorsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-indicator-index]');
        if (btn) {
          const idx = parseInt(btn.dataset.indicatorIndex, 10);
          this.goToSlide(idx);
          this.startAutoPlay();
        }
      });
    }

    // Pause on hover
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', () => this.stopAutoPlay());
      carouselWrapper.addEventListener('mouseleave', () => this.startAutoPlay());
    }
  }
};

/**
 * Reviews Carousel - Loads dynamically from data/reviews.json
 */
const ReviewsCarousel = {
  DATA_URL: 'data/reviews.json',
  reviews: [],
  currentIndex: 0,
  autoInterval: null,
  INTERVAL_TIME: 5000,

  async init() {
    this.bindEvents();
    await this.loadReviews();
  },

  async loadReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    try {
      // Relative path fetch compatible with local dev servers
      const response = await fetch(this.DATA_URL);
      if (!response.ok) {
        throw new Error(`Failed to load reviews.json: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No reviews found in data/reviews.json');
      }

      this.reviews = data;
      this.render();
      this.renderIndicators();
      this.goToReview(0);
      this.startAutoPlay();
    } catch (err) {
      console.warn('Reviews loading fallback:', err);
      // Fallback reviews if network restriction occurs
      this.reviews = [
        {
          id: 1,
          name: "Verified Buyer",
          role: "SmartShop Member",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
          rating: 5,
          date: "October 18, 2026",
          title: "Super fast express delivery & great backpack!",
          comment: "Ordered the Fjallraven backpack using my wallet balance and the SMART10 discount code. The UI is exceptionally responsive and smooth.",
          verifiedPurchase: true,
          product: "Fjallraven - Foldsack No. 1 Backpack"
        },
        {
          id: 2,
          name: "Frequent Shopper",
          role: "Verified Customer",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
          rating: 5,
          date: "October 20, 2026",
          title: "Stunning jewelry collection and transparent BDT pricing",
          comment: "Having prices clearly labeled in BDT makes shopping so convenient and predictable.",
          verifiedPurchase: true,
          product: "Solid Gold Petite Micropave"
        }
      ];
      this.render();
      this.renderIndicators();
      this.goToReview(0);
    }
  },

  generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += `
        <svg class="w-4 h-4 ${i <= rating ? 'text-amber-400' : 'text-slate-200'} fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      `;
    }
    return stars;
  },

  render() {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    container.innerHTML = this.reviews.map((rev, index) => {
      const stars = this.generateStars(rev.rating);
      return `
        <div 
          data-review-index="${index}"
          class="transition-opacity duration-500 ease-in-out ${index === 0 ? 'block opacity-100' : 'hidden opacity-0'}"
        >
          <div class="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-100 max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            <div class="shrink-0 text-center md:text-left flex flex-col items-center">
              <img 
                src="${rev.avatar}" 
                alt="${rev.name}" 
                class="w-20 h-20 rounded-full object-cover border-4 border-indigo-100 shadow-md mb-3"
              />
              <h4 class="text-sm font-bold text-slate-900">${rev.name}</h4>
              <p class="text-xs text-slate-500">${rev.role}</p>
              ${rev.verifiedPurchase ? `
                <span class="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <svg class="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Verified Buyer
                </span>
              ` : ''}
            </div>

            <div class="flex-1 text-center md:text-left">
              <div class="flex items-center justify-center md:justify-between flex-wrap gap-2 mb-3">
                <div class="flex items-center gap-1">
                  ${stars}
                </div>
                <span class="text-xs text-slate-400 font-medium">${rev.date}</span>
              </div>
              <h3 class="text-lg font-bold text-slate-800 mb-2">"${rev.title}"</h3>
              <p class="text-sm text-slate-600 leading-relaxed italic mb-4">
                "${rev.comment}"
              </p>
              <div class="pt-3 border-t border-slate-100 flex items-center justify-center md:justify-start gap-2">
                <span class="text-xs text-slate-400">Purchased:</span>
                <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">${rev.product}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderIndicators() {
    const indicatorsContainer = document.getElementById('reviews-indicators');
    if (!indicatorsContainer) return;

    indicatorsContainer.innerHTML = this.reviews.map((_, index) => {
      return `
        <button 
          type="button" 
          class="h-2.5 rounded-full transition-all duration-300 ${index === 0 ? 'w-8 bg-indigo-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}"
          data-review-indicator="${index}"
          aria-label="Go to review ${index + 1}"
        ></button>
      `;
    }).join('');
  },

  goToReview(index) {
    if (this.reviews.length === 0) return;
    if (index < 0) index = this.reviews.length - 1;
    if (index >= this.reviews.length) index = 0;
    this.currentIndex = index;

    const reviewCards = document.querySelectorAll('#reviews-container [data-review-index]');
    reviewCards.forEach((card, i) => {
      if (i === index) {
        card.classList.remove('hidden', 'opacity-0');
        card.classList.add('block', 'opacity-100');
      } else {
        card.classList.remove('block', 'opacity-100');
        card.classList.add('hidden', 'opacity-0');
      }
    });

    const indicators = document.querySelectorAll('#reviews-indicators [data-review-indicator]');
    indicators.forEach((btn, i) => {
      if (i === index) {
        btn.classList.remove('w-2.5', 'bg-slate-300');
        btn.classList.add('w-8', 'bg-indigo-600');
      } else {
        btn.classList.remove('w-8', 'bg-indigo-600');
        btn.classList.add('w-2.5', 'bg-slate-300');
      }
    });
  },

  next() {
    this.goToReview(this.currentIndex + 1);
  },

  prev() {
    this.goToReview(this.currentIndex - 1);
  },

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoInterval = setInterval(() => {
      this.next();
    }, this.INTERVAL_TIME);
  },

  stopAutoPlay() {
    if (this.autoInterval) {
      clearInterval(this.autoInterval);
      this.autoInterval = null;
    }
  },

  bindEvents() {
    const prevBtn = document.getElementById('reviews-prev-btn');
    const nextBtn = document.getElementById('reviews-next-btn');
    const section = document.getElementById('reviews-section');
    const indicatorsContainer = document.getElementById('reviews-indicators');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.prev();
        this.startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.next();
        this.startAutoPlay();
      });
    }

    if (indicatorsContainer) {
      indicatorsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-review-indicator]');
        if (btn) {
          const idx = parseInt(btn.dataset.reviewIndicator, 10);
          this.goToReview(idx);
          this.startAutoPlay();
        }
      });
    }

    if (section) {
      section.addEventListener('mouseenter', () => this.stopAutoPlay());
      section.addEventListener('mouseleave', () => this.startAutoPlay());
    }
  }
};

window.PromoCarousel = PromoCarousel;
window.ReviewsCarousel = ReviewsCarousel;
