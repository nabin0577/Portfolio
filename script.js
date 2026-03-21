/* ============================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   ============================================
   Interactive functionality for the portfolio
   ============================================ */

// ============================================
// DOCUMENT READY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initLoader();
    initThemeToggle();
    initTypingEffect();
    initSmoothScrolling();
    initActiveNavLink();
    initScrollToTop();
    initMobileMenu();
    initScrollAnimations();
    initFormValidation();
    
});


// ============================================
// LOADER ANIMATION
// ============================================
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 500);
    });
}


// ============================================
// DARK/LIGHT MODE TOGGLE
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    // Apply saved theme or default to light
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save preference
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}


// ============================================
// TYPING EFFECT (HERO SECTION)
// ============================================
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    
    // EDIT HERE: Change your typing text array
    const textArray = [
        'Aspiring SWE',
        'Student',
        'Developer',
        'Learner'
    ];
    
    // Configuration
    const typingSpeed = 100;    // milliseconds per character
    const deletingSpeed = 50;    // milliseconds per character (deleting)
    const pauseTime = 2000;     // milliseconds to pause between words
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            // Remove character
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add character
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;
        
        if (!isDeleting && charIndex === currentText.length) {
            // Word complete - pause before deleting
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted - move to next word
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    type();
}


// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .scroll-down a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                navMenu.classList.remove('active');
            }
        });
    });
}


// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        // Navbar background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link highlighting
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}


// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const icon = mobileToggle.querySelector('i');
    
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Toggle icon
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}


// ============================================
// SCROLL ANIMATIONS (FADE IN)
// ============================================
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.timeline-item, .achievement-card, .skills-category');
    
    // Add fade-in class to elements
    fadeElements.forEach(el => el.classList.add('fade-in'));
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade elements
    fadeElements.forEach(el => observer.observe(el));
    
    // Trigger skill bars animation when skills section is visible
    const skillsSection = document.getElementById('skills');
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset and animate skill bars
                skillProgress.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}


// ============================================
// CONTACT FORM VALIDATION
// ============================================
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation flags
        let isValid = true;
        
        // Validate Name
        if (name === '') {
            showError('nameError', 'Please enter your name');
            isValid = false;
        } else if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate Email
        if (email === '') {
            showError('emailError', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate Subject
        if (subject === '') {
            showError('subjectError', 'Please enter a subject');
            isValid = false;
        }
        
        // Validate Message
        if (message === '') {
            showError('messageError', 'Please enter your message');
            isValid = false;
        } else if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If valid, submit to Formspree
        if (isValid) {
            // Prepare form data for Formspree
            const formData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                if (response.ok) {
                    showFormMessage('success', 'Thank you! Your message has been sent successfully. I will get back to you soon!');
                    form.reset();
                } else {
                    return response.json().then(function(data) {
                        var errorText = (data && (data.errors && data.errors[0] && data.errors[0].message)) || 'An error occurred while sending the message.';
                        throw new Error(errorText);
                    }).catch(function() {
                        throw new Error('An error occurred while sending the message.');
                    });
                }
            })
            .catch(function(err) {
                showFormMessage('error', err.message || 'There was a problem sending your message. Please try again later.');
            });
        }
    });
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show error
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    // Helper function to clear all errors
    function clearErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(el => el.textContent = '');
        
        // Hide form message
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }
    
    // Helper function to show form message
    function showFormMessage(type, message) {
        formMessage.className = 'form-message ' + type;
        formMessage.textContent = message;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }
}


// ============================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================

// Format current year in footer (optional)
function updateFooterYear() {
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = `© ${currentYear} Himesh Kumar Kashyap. All Rights Reserved.`;
    }
}

// Initialize year update
updateFooterYear();


/* ============================================
   HOW TO USE & CUSTOMIZE
   ============================================
   
   1. EDIT PERSONAL INFO:
      - Open index.html
      - Look for "EDIT HERE" comments
      - Replace placeholder text with your details
      
   2. ADD YOUR PHOTOS:
      - Replace src="https://via.placeholder.com/..." 
        with your actual image paths
      - Recommended: Use 400x400px for profile images
      
   3. RESUME PDF:
      - Add your resume.pdf to the same folder
      - Or update the href in the Download Resume button
      
   4. SOCIAL LINKS:
      - Update href attributes with your actual URLs
      
   5. FOR EMAIL FUNCTIONALITY:
      - Option A: Use a service like Formspree
      - Option B: Use mailto: link (uncomment in script.js)
      - Option C: Use a backend service
      
   6. TO RUN LOCALLY:
      - Simply open index.html in a browser
      - Or use a local server like Live Server in VS Code
      
   ============================================ */
