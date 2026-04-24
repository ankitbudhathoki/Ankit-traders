// Initialize GSAP & ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
    // 1. Initial Load Animations (Hero Section)
    const tl = gsap.timeline();

    // Navbar drops down
    tl.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Hero Text Stagger - Smooth slide in from left
    tl.from('.hero-content .badge, .hero-content h1, .hero-content p, .hero-content .hero-buttons', {
        x: -50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'expo.out'
    }, '-=0.4');

    // Background Blobs Floating Animation
    gsap.to('.blob-1', {
        y: 40,
        x: -30,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
    });

    gsap.to('.blob-2', {
        y: -40,
        x: 30,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
    });

    // 2. Scroll Animations with ScrollTrigger
    // Products Grid Stagger - Smooth slide up and scale
    gsap.fromTo('.product-card', 
        { y: 80, x: -30, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.products',
                start: 'top 80%',
            },
            y: 0,
            x: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'expo.out',
            clearProps: 'all'
        }
    );

    // Features Grid Stagger - Smooth diagonal slide
    gsap.fromTo('.feature-card', 
        { y: 50, x: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.why-us',
                start: 'top 80%',
            },
            y: 0,
            x: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: 'expo.out',
            clearProps: 'all'
        }
    );

    // Brands Stagger
    gsap.fromTo('.brand-tag', 
        { scale: 0.8, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.brands',
                start: 'top 85%',
            },
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.5)',
            clearProps: 'all'
        }
    );

    // Contact Section
    gsap.fromTo('.contact-info', 
        { x: -80, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 80%',
            },
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            clearProps: 'all'
        }
    );

    gsap.fromTo('.contact-form-container', 
        { x: 80, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 80%',
            },
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            clearProps: 'all'
        }
    );
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Sticky Navbar & Back to Top Button
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    // Navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Back to top click
if (backToTop) {
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// WhatsApp and Email Integration
const BUSINESS_PHONE = '9779852027536'; // Replace with actual number
const BUSINESS_EMAIL = 'info@ankittraders.com.np';

function openWhatsApp(productName) {
    let message = `Hello Ankit Traders, I am interested in ordering ${productName}. Could you please provide more details?`;
    let whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function scrollToContact(productName) {
    // Pre-select the product in the dropdown if it matches
    const productSelect = document.getElementById('product');
    if (productSelect) {
        // Try to match value or text
        let found = false;
        for (let i = 0; i < productSelect.options.length; i++) {
            if (productSelect.options[i].value.includes(productName) || productName.includes(productSelect.options[i].value)) {
                productSelect.selectedIndex = i;
                found = true;
                break;
            }
        }
        if (!found) {
            productSelect.value = 'General Enquiry';
        }
    }

    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form Submission
function submitForm(method) {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const product = document.getElementById('product').value;
    const message = document.getElementById('message').value.trim();
    const feedback = document.getElementById('formFeedback');

    // Validation
    if (!name || !phone) {
        showFeedback('Please fill in your Name and Phone Number.', 'error');
        return;
    }

    const formattedMessage = `Hello, I want to order/enquire about ${product}.\n\nMy Details:\nName: ${name}\nPhone: ${phone}\n\nMessage: ${message ? message : 'Please provide more information.'}`;

    if (method === 'whatsapp') {
        let whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(formattedMessage)}`;
        window.open(whatsappUrl, '_blank');
        showFeedback('Redirecting to WhatsApp...', 'success');
        document.getElementById('enquiryForm').reset();
    } else if (method === 'email') {
        let subject = `Website Enquiry: ${product} from ${name}`;
        let mailtoUrl = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedMessage)}`;
        window.location.href = mailtoUrl;
        showFeedback('Opening default email client...', 'success');
        document.getElementById('enquiryForm').reset();
    }
}

function showFeedback(msg, type) {
    const feedback = document.getElementById('formFeedback');
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;

    // Hide feedback after 5 seconds
    setTimeout(() => {
        feedback.className = 'form-feedback';
        feedback.textContent = '';
    }, 5000);
}
