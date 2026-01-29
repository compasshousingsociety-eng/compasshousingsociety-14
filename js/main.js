/* ==========================================
   PAGE LOADER
   ========================================== */

window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(function() {
            loader.classList.add('fade-out');
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    }
});

/* ==========================================
   THEME TOGGLE (DARK/LIGHT MODE)
   ========================================== */

const themeToggle = document.getElementById('themeToggle');
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon visibility based on current theme
if (currentTheme === 'dark') {
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
} else {
    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
}

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Toggle icons
        if (newTheme === 'dark') {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }
    });
}

/* ==========================================
   NAVBAR SCROLL EFFECT
   ========================================== */

const header = document.querySelector('.main-header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

/* ==========================================
   DROPDOWN HOVER FOR DESKTOP
   ========================================== */

// if (window.innerWidth >= 992) {
//     const dropdowns = document.querySelectorAll('.dropdown');
    
//     dropdowns.forEach(function(dropdown) {
//         dropdown.addEventListener('mouseenter', function() {
//             const menu = this.querySelector('.dropdown-menu');
//             if (menu) {
//                 menu.classList.add('show');
//             }
//         });
        
//         dropdown.addEventListener('mouseleave', function() {
//             const menu = this.querySelector('.dropdown-menu');
//             if (menu) {
//                 menu.classList.remove('show');
//             }
//         });
//     });
// }

/* ==========================================
   STATISTICS COUNTER ANIMATION
   ========================================== */

const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    
    statNumbers.forEach(function(stat) {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = function() {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
    
    countersAnimated = true;
}

// Trigger counter animation when stats section is in view
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

/* ==========================================
   WISHLIST FUNCTIONALITY
   ========================================== */

const wishlistButtons = document.querySelectorAll('.action-icon');

wishlistButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const icon = this.querySelector('i');
        
        if (icon.classList.contains('fa-regular')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            this.style.backgroundColor = '#DC2626';
            this.style.color = '#fff';
            
            // Show notification
            showNotification('Added to wishlist!');
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            this.style.backgroundColor = '#fff';
            this.style.color = '';
            
            showNotification('Removed from wishlist!');
        }
    });
});

/* ==========================================
   NOTIFICATION SYSTEM
   ========================================== */

function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background-color: var(--primary-color);
        color: white;
        padding: 16px 24px;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        font-weight: 600;
        font-size: 15px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(function() {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ==========================================
   SEARCH FORM HANDLING
   ========================================== */

const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const location = this.querySelector('input[type="text"]').value;
        const propertyType = this.querySelector('select:nth-of-type(1)').value;
        const priceRange = this.querySelector('select:nth-of-type(2)').value;
        
        console.log('Search Parameters:', {
            location: location,
            propertyType: propertyType,
            priceRange: priceRange
        });
        
        // In real application, redirect to properties page with search params
        // window.location.href = `services.html?location=${location}&type=${propertyType}&price=${priceRange}`;
        
        showNotification('Searching for properties...');
    });
}

/* ==========================================
   NEWSLETTER FORM HANDLING
   ========================================== */

const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            console.log('Newsletter subscription:', email);
            showNotification('Successfully subscribed to newsletter!');
            emailInput.value = '';
        }
    });
});

/* ==========================================
   SMOOTH SCROLL TO SECTIONS
   ========================================== */

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/* ==========================================
   ACTIVE NAV LINK ON SCROLL
   ========================================== */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

/* ==========================================
   MOBILE MENU CLOSE ON LINK CLICK
   ========================================== */

// const navbarToggler = document.querySelector('.navbar-toggler');
// const navbarCollapse = document.querySelector('.navbar-collapse');
// const navItems = document.querySelectorAll('.nav-link');

// navItems.forEach(function(item) {
//     item.addEventListener('click', function() {
//         if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
//             navbarToggler.click();
//         }
//     });
// });

/* ==========================================
   CAROUSEL AUTO PLAY CONTROL
   ========================================== */

const heroCarousel = document.getElementById('heroCarousel');
if (heroCarousel) {
    const carousel = new bootstrap.Carousel(heroCarousel, {
        interval: 5000,
        ride: 'carousel',
        pause: 'hover'
    });
}

/* ==========================================
   LAZY LOADING FOR IMAGES
   ========================================== */

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(function(img) {
    imageObserver.observe(img);
});

/* ==========================================
   FORM VALIDATION ENHANCEMENT
   ========================================== */

const forms = document.querySelectorAll('form');

forms.forEach(function(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(function(input) {
        // Real-time validation feedback
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#DC2626';
            } else if (this.type === 'email' && this.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(this.value)) {
                    this.style.borderColor = '#DC2626';
                } else {
                    this.style.borderColor = 'var(--border-color)';
                }
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        });
        
        // Clear error on focus
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
    });
});

/* ==========================================
   BACK TO TOP BUTTON
   ========================================== */

// Create back to top button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTop.className = 'back-to-top';
backToTop.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--secondary-color);
    border: none;
    border-radius: 50%;
    color: var(--dark-color);
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(131, 205, 32, 0.3);
`;

document.body.appendChild(backToTop);

// Show/hide back to top button
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

// Scroll to top on click
backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTop.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

backToTop.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

/* ==========================================
   PROPERTY CARD INTERACTIONS
   ========================================== */

const propertyCards = document.querySelectorAll('.property-card-modern');

propertyCards.forEach(function(card) {
    // Add tilt effect on mouse move
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

/* ==========================================
   SEARCH BAR ANIMATION
   ========================================== */

const searchFields = document.querySelectorAll('.search-field input, .search-field select');

searchFields.forEach(function(field) {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

/* ==========================================
   FEATURE BOX SEQUENTIAL ANIMATION
   ========================================== */

const featureBoxes = document.querySelectorAll('.feature-box');
const featureSection = document.querySelector('.features-section');

if (featureSection) {
    const featureObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                featureBoxes.forEach(function(box, index) {
                    setTimeout(function() {
                        box.style.opacity = '0';
                        box.style.transform = 'translateY(30px)';
                        box.style.transition = 'all 0.5s ease';
                        
                        setTimeout(function() {
                            box.style.opacity = '1';
                            box.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 150);
                });
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    featureObserver.observe(featureSection);
}

/* ==========================================
   CONSOLE INFO
   ========================================== */

console.log('%c Compass Housing Society Website ', 'background: #034833; color: #83CD20; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Developed by ohm using DM Sans font family ', 'background: #83CD20; color: #1A1A1A; font-size: 14px; padding: 5px;');
console.log('%c Theme: Dark/Light Mode Supported ', 'color: #034833; font-size: 12px;');

/* ==========================================
   PERFORMANCE MONITORING
   ========================================== */

window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`%c Page loaded in ${loadTime}ms`, 'color: #83CD20; font-weight: bold;');
});

/* ==========================================
   PREVENT CONTEXT MENU (OPTIONAL - COMMENT OUT IF NOT NEEDED)
   ========================================== */

// Uncomment below to disable right-click on images
/*
document.querySelectorAll('img').forEach(function(img) {
    img.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
});
*/
