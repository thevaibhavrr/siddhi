// Slider functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Auto slide
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Gallery functionality
const categoryCards = document.querySelectorAll('.category-card');
const modal = document.getElementById('galleryModal');
const modalTitle = document.getElementById('modalTitle');
const modalGallery = document.getElementById('modalGallery');
const closeModal = document.querySelector('.close-modal');

// Gallery images by category
const galleryImages = {
    bridal: [
        './images/bridalimages/birdial_1.jpg',
        './images/bridalimages/birdial_2.jpg',
        './images/bridalimages/birdial_3.jpg',
        './images/bridalimages/birdial_4.jpg',
        './images/bridalimages/birdial_5.jpg',
        './images/bridalimages/birdial_6.jpg',
        './images/bridalimages/birdial_7.jpg',
        './images/bridalimages/birdial_8.jpg',
        './images/bridalimages/birdial_9.jpg',
        './images/bridalimages/birdial_10.jpg',
    ],
    party: [
        './images/partyimages/prty_1.jpg',
        './images/partyimages/prty_2.jpg',
        './images/partyimages/prty_3.jpg',
        './images/partyimages/prty_4.jpg',
        './images/partyimages/prty_5.jpg',
        './images/partyimages/prty_6.jpg',
        './images/partyimages/prty_7.jpg',
        './images/partyimages/prty_8.jpg',
        './images/partyimages/prty_9.jpg',
        './images/partyimages/prty_10.jpg',
        './images/partyimages/prty_11.jpg',
        './images/partyimages/prty_12.jpg',
        './images/partyimages/prty_13.jpg',
        './images/partyimages/prty_14.jpg',
    ],
    HD: [
        './images/hdimages/hd1.jpg',
        './images/hdimages/hd2.jpg',
        './images/hdimages/hd3.jpg',
        './images/hdimages/hd4.jpg',
        './images/hdimages/hd5.jpg',
        './images/hdimages/hd6.jpg',
        './images/hdimages/hd7.jpg',
    ],
    Natural: [
        "./images/natural/natural_1.jpg",
        "./images/natural/natural_2.jpg",
        "./images/natural/natural_3.jpg",
        "./images/natural/natural_4.jpg",
        "./images/natural/natural_5.jpg",
        "./images/natural/natural_6.jpg",
        "./images/natural/natural_7.jpg",
        "./images/natural/natural_8.jpg",
        "./images/natural/natural_9.jpg",
    ],
    Glossy: [
        "./images/Glossy/Glossy_1.jpg",  
        "./images/Glossy/Glossy_2.jpg",  
        "./images/Glossy/Glossy_3.jpg",  
        "./images/Glossy/Glossy_4.jpg",  
        "./images/Glossy/Glossy_5.jpg",  
        "./images/Glossy/Glossy_6.jpg",  
        "./images/Glossy/Glossy_7.jpg",  
    ],
    Softglam: [
        "./images/Soft/Soft_1.jpg",
        "./images/Soft/Soft_2.jpg",
        "./images/Soft/Soft_3.jpg",
        "./images/Soft/Soft_4.jpg",
        "./images/Soft/Soft_5.jpg",
    ],
};

// Add click event to category cards
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        const categoryName = card.querySelector('.category-name').textContent;
        
        // Set modal title
        modalTitle.textContent = `${categoryName} Gallery`;
        
        // Clear previous gallery
        modalGallery.innerHTML = '';
        
        // Add images to gallery
        galleryImages[category].forEach(img => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `<img src="${img}" alt="${categoryName}">`;
            modalGallery.appendChild(galleryItem);
        });
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate gallery items after a short delay
        setTimeout(() => {
            const items = document.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                    item.style.opacity = '1';
                }, index * 100);
            });
        }, 50);
    });
});

// Add click event to footer service links
const footerServiceLinks = document.querySelectorAll('.footer-links a[data-category]');
footerServiceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('data-category');
        const categoryCard = document.querySelector(`.category-card[data-category="${category}"]`);
        
        if (categoryCard) {
            categoryCard.click();
        }
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
function animateOnScroll() {
    // Header scroll effect
    if (window.scrollY > 50) {
        document.querySelector('header').classList.add('scrolled');
    } else {
        document.querySelector('header').classList.remove('scrolled');
    }
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.section-title, .section-subtitle, .category-card, .details-img, .details-content, .map-container, .video-container, .specialty-card, .footer-col, .copyright');
    
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
    
    // Animate features in salon details
    const detailsContent = document.querySelector('.details-content');
    if (detailsContent && detailsContent.classList.contains('animated')) {
        const features = document.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.transform = 'translateY(0)';
                feature.style.opacity = '1';
            }, index * 200);
        });
    }
}

// Initialize animations on load
window.addEventListener('load', () => {
    // Show first slide content immediately
    if (document.querySelector('.slide.active .slide-content')) {
        document.querySelector('.slide.active .slide-content').style.transform = 'translateY(0)';
        document.querySelector('.slide.active .slide-content').style.opacity = '1';
    }
    
    // Run scroll animations once on load
    animateOnScroll();
});

// Run animations on scroll
window.addEventListener('scroll', animateOnScroll);