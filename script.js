// Initialize Lucide icons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#mobile-menu a');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Update menu icon
            const menuIcon = mobileMenuButton.querySelector('i');
            if (menuIcon) {
                if (mobileMenu.classList.contains('hidden')) {
                    menuIcon.setAttribute('data-lucide', 'menu');
                } else {
                    menuIcon.setAttribute('data-lucide', 'x');
                }
                lucide.createIcons();
            }
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                // Reset menu icon
                const menuIcon = mobileMenuButton.querySelector('i');
                if (menuIcon) {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    });

    // Gallery filtering functionality
    initializeGalleryFilter();

    // Contact form handling
    initializeContactForm();

    // Smooth scrolling for anchor links
    initializeSmoothScrolling();

    // Add fade-in animations to elements
    initializeAnimations();

    // Update active navigation link
    updateActiveNav();
});

// Gallery Filtering Functionality
function initializeGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('gallerySearch');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0 || galleryItems.length === 0) return;

    let currentFilter = 'all';
    let currentSearchTerm = '';

    // Filter button functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active', 'bg-secondary', 'text-primary'));
            
            // Add active class to clicked button
            this.classList.add('active', 'bg-secondary', 'text-primary');
            
            // Update current filter
            currentFilter = this.dataset.category;
            
            // Apply filters
            applyGalleryFilters();
        });
    });

    // Search input functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            applyGalleryFilters();
        });
    }

    function applyGalleryFilters() {
        galleryItems.forEach(item => {
            const category = item.dataset.category;
            const title = item.querySelector('h4').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            const matchesCategory = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = currentSearchTerm === '' || 
                                title.includes(currentSearchTerm) || 
                                description.includes(currentSearchTerm);
            
            if (matchesCategory && matchesSearch) {
                item.style.display = 'block';
                // Add fade-in animation
                item.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                item.style.display = 'none';
            }
        });

        // Show message if no results
        showNoResultsMessage();
    }

    function showNoResultsMessage() {
        const visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
        const galleryGrid = document.getElementById('galleryGrid');
        
        // Remove existing no results message
        const existingMessage = galleryGrid.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        if (visibleItems.length === 0) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results-message col-span-full text-center py-12';
            noResultsMessage.innerHTML = `
                <i data-lucide="search" class="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                <h3 class="text-xl font-heading font-bold text-gray-300 mb-2">No products found</h3>
                <p class="text-gray-400">Try adjusting your search terms or filter criteria</p>
            `;
            galleryGrid.appendChild(noResultsMessage);
            lucide.createIcons();
        }
    }
}

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#EF4444';
            } else {
                field.style.borderColor = '';
            }
        });

        if (!isValid) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.innerHTML = '<i data-lucide="loader" class="w-5 h-5 animate-spin mr-2"></i>Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for your message! We will get back to you within 2 hours.', 'success');
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            lucide.createIcons();
        }, 2000);
    });

    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#EF4444';
            } else {
                this.style.borderColor = '';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '';
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 p-4 rounded-lg z-50 transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 
        'bg-blue-600'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i data-lucide="${
                type === 'success' ? 'check-circle' : 
                type === 'error' ? 'alert-circle' : 
                'info'
            }" class="w-5 h-5 mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Update Active Navigation
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('text-secondary');
            link.classList.remove('text-gray-300', 'hover:text-secondary');
        } else {
            link.classList.remove('text-secondary');
            if (!link.classList.contains('cta-button')) {
                link.classList.add('text-gray-300', 'hover:text-secondary');
            }
        }
    });
}

// Image lazy loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize when page loads
window.addEventListener('load', function() {
    initializeLazyLoading();
    
    // Add loaded class to body for any post-load animations
    document.body.classList.add('loaded');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Update any layout-dependent functionality here
    }, 250);
});

// Export functions for global access (if needed)
window.JadulaTrading = {
    showNotification,
    initializeGalleryFilter,
    initializeContactForm
};