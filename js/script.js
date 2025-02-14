// Main initialization
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initBurgerMenu();
    initScrollAnimations();
    initScrollToTop();
    initCopyAddress();
});

// Burger Menu
function initBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (!burgerMenu || !mobileNav) return;

    // Burger menu click
    burgerMenu.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent event bubbling
        toggleMenu();
    });

    // Close menu when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (mobileNav.classList.contains('active') && !mobileNav.contains(e.target)) {
            closeMenu();
        }
    });

    // Prevent clicks inside mobile nav from closing menu
    mobileNav.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    function toggleMenu() {
        burgerMenu.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    function closeMenu() {
        burgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });

    // Select all elements that need animations
    const elements = document.querySelectorAll(
        '.investment-card, ' +
        '.card-icon, ' +
        '.roadmap-card, ' +
        '.chart-container, ' +
        '.cta-container, ' +
        '.contract-card, ' +
        '.step-card, ' + // Added step-card for How to Buy section
        '.footer-content > *, ' +
        '.portfolio-link'
    );

    elements.forEach(el => observer.observe(el));
}

// Scroll to Top
function initScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');

    if (!scrollButton) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Copy Contract Address
function initCopyAddress() {
    const copyBtn = document.querySelector('.copy-btn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', copyContractAddress);
}

function copyContractAddress() {
    const contractAddress = document.querySelector('.contract-address');
    if (!contractAddress) return;

    navigator.clipboard.writeText(contractAddress.textContent)
        .then(() => {
            // Visual feedback
            const copyBtn = document.querySelector('.copy-btn');
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';

            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy text:', err);
        });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});