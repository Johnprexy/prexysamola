// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            if (mobileMenu) {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }
    
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Validate name
        if (!validateField(name)) {
            isValid = false;
        }
        
        // Validate email
        if (!validateField(email)) {
            isValid = false;
        }
        
        // Validate subject
        if (!validateField(subject)) {
            isValid = false;
        }
        
        // Validate message
        if (!validateField(message)) {
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(fieldName + 'Error');
        
        switch (fieldName) {
            case 'name':
                if (!value) {
                    showError(field, 'Name is required');
                    return false;
                } else if (value.length < 2) {
                    showError(field, 'Name must be at least 2 characters');
                    return false;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    showError(field, 'Email is required');
                    return false;
                } else if (!emailRegex.test(value)) {
                    showError(field, 'Please enter a valid email address');
                    return false;
                }
                break;
                
            case 'phone':
                if (value && value.length < 10) {
                    showError(field, 'Please enter a valid phone number');
                    return false;
                }
                break;
                
            case 'subject':
                if (!value) {
                    showError(field, 'Please select a subject');
                    return false;
                }
                break;
                
            case 'message':
                if (!value) {
                    showError(field, 'Message is required');
                    return false;
                } else if (value.length < 10) {
                    showError(field, 'Message must be at least 10 characters');
                    return false;
                }
                break;
        }
        
        clearError(field);
        return true;
    }
    
    function showError(field, message) {
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        field.classList.add('error');
    }
    
    function clearError(field) {
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        field.classList.remove('error');
    }
    
    function submitForm() {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form submission logic)
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Reset button state
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Show form again after 5 seconds
            setTimeout(() => {
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
            }, 5000);
        }, 2000);
    }
});

// Newsletter Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = form.querySelector('input[type="email"]');
            const button = form.querySelector('button');
            const email = input.value.trim();
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const originalText = button.textContent;
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            // Simulate subscription
            setTimeout(() => {
                showNotification('Thank you for subscribing!', 'success');
                input.value = '';
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    });
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    const hideTimeout = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(hideTimeout);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Music Player Controls (if applicable)
document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.play-btn');
    const pauseButtons = document.querySelectorAll('.pause-btn');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioId = this.dataset.audio;
            const audio = document.getElementById(audioId);
            
            if (audio) {
                // Pause other audio elements
                document.querySelectorAll('audio').forEach(a => {
                    if (a !== audio) {
                        a.pause();
                    }
                });
                
                audio.play();
                this.style.display = 'none';
                this.nextElementSibling.style.display = 'inline-block';
            }
        });
    });
    
    pauseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioId = this.dataset.audio;
            const audio = document.getElementById(audioId);
            
            if (audio) {
                audio.pause();
                this.style.display = 'none';
                this.previousElementSibling.style.display = 'inline-block';
            }
        });
    });
});

// Event Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Form Auto-Save (for longer forms)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Load saved data
            const savedValue = localStorage.getItem(`form_${input.name}`);
            if (savedValue && input.type !== 'checkbox') {
                input.value = savedValue;
            } else if (savedValue && input.type === 'checkbox') {
                input.checked = savedValue === 'true';
            }
            
            // Save data on input
            input.addEventListener('input', function() {
                if (this.type === 'checkbox') {
                    localStorage.setItem(`form_${this.name}`, this.checked);
                } else {
                    localStorage.setItem(`form_${this.name}`, this.value);
                }
            });
        });
        
        // Clear saved data on successful submission
        contactForm.addEventListener('submit', function() {
            inputs.forEach(input => {
                localStorage.removeItem(`form_${input.name}`);
            });
        });
    }
});

// Keyboard Navigation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for custom elements
    const customButtons = document.querySelectorAll('.btn, .social-link');
    
    customButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Loading Animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// Error Handling for External Resources
window.addEventListener('error', function(e) {
    console.error('Resource loading error:', e);
    // Handle broken images
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
        e.target.alt = 'Image not found';
    }
}, true);