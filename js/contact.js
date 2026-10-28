/**
 * SmartShop
 * Contact Form Validation & Submission
 * Strictly Vanilla JavaScript DOM & Tailwind Utility Classes
 */

const Contact = {
  formId: 'contact-form',

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const form = document.getElementById(this.formId);
    if (!form) return;

    const fields = ['contact-name', 'contact-email', 'contact-subject', 'contact-message'];

    // Real-time blur and input listeners
    fields.forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('blur', () => this.validateField(id));
        input.addEventListener('input', () => {
          // If already marked invalid, clear error as soon as user types valid content
          const errorEl = document.getElementById(`${id}-error`);
          if (errorEl && !errorEl.classList.contains('hidden')) {
            this.validateField(id);
          }
        });
      }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  },

  /**
   * Validate a single input field
   * @param {string} fieldId
   * @returns {boolean}
   */
  validateField(fieldId) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (!input || !errorEl) return true;

    const val = input.value.trim();
    let isValid = true;
    let message = '';

    switch (fieldId) {
      case 'contact-name':
        if (!val) {
          isValid = false;
          message = 'Please enter your full name.';
        } else if (val.length < 2) {
          isValid = false;
          message = 'Name must be at least 2 characters long.';
        }
        break;

      case 'contact-email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) {
          isValid = false;
          message = 'Please enter your email address.';
        } else if (!emailRegex.test(val)) {
          isValid = false;
          message = 'Please enter a valid email address (e.g., name@example.com).';
        }
        break;

      case 'contact-subject':
        if (!val) {
          isValid = false;
          message = 'Please specify a subject for your message.';
        } else if (val.length < 3) {
          isValid = false;
          message = 'Subject must be at least 3 characters.';
        }
        break;

      case 'contact-message':
        if (!val) {
          isValid = false;
          message = 'Please write your message.';
        } else if (val.length < 10) {
          isValid = false;
          message = 'Message must be at least 10 characters long.';
        }
        break;
    }

    if (!isValid) {
      input.classList.remove('border-slate-300', 'border-emerald-500', 'focus:border-indigo-600');
      input.classList.add('border-red-500', 'focus:border-red-500');
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    } else {
      input.classList.remove('border-red-500', 'focus:border-red-500');
      input.classList.add('border-emerald-500');
      errorEl.classList.add('hidden');
      errorEl.textContent = '';
    }

    return isValid;
  },

  /**
   * Validate full form and submit
   */
  handleSubmit() {
    const fields = ['contact-name', 'contact-email', 'contact-subject', 'contact-message'];
    let isAllValid = true;
    let firstInvalidInput = null;

    fields.forEach(id => {
      const valid = this.validateField(id);
      if (!valid) {
        isAllValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = document.getElementById(id);
        }
      }
    });

    if (!isAllValid) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      if (window.App && typeof window.App.showToast === 'function') {
        window.App.showToast('Please fix the errors in the contact form.', 'warning');
      }
      return;
    }

    // Capture valid form data
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    // Show success feedback
    const successContainer = document.getElementById('contact-success-alert');
    if (successContainer) {
      const summaryText = document.getElementById('contact-success-text');
      if (summaryText) {
        summaryText.textContent = `Thank you, ${name}! Your inquiry regarding "${subject}" has been sent. We will reply to ${email} shortly.`;
      }
      successContainer.classList.remove('hidden');
      setTimeout(() => {
        successContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }

    if (window.App && typeof window.App.showToast === 'function') {
      window.App.showToast(`Message from ${name} sent successfully!`, 'success');
    }

    // Reset Form
    const form = document.getElementById(this.formId);
    if (form) form.reset();

    // Remove green validation borders
    fields.forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.classList.remove('border-emerald-500', 'border-red-500');
        input.classList.add('border-slate-300');
      }
    });
  }
};

window.Contact = Contact;
