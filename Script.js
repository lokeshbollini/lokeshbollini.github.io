// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Typing Animation
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    if (typedTextSpan) {
        const textArray = ['Data Analyst','Problem Solver', 'BI Specialist', 'SQL Expert','ETL Developer','Machine Learning Enthusiast'];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 1000; // Delay between current and next text
        let textArrayIndex = 0;
        let charIndex = 0;
        
        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } 
            else {
                cursorSpan.classList.remove('typing');
                setTimeout(erase, newTextDelay);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } 
            else {
                cursorSpan.classList.remove('typing');
                textArrayIndex++;
                if(textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }
        
        if(textArray.length) setTimeout(type, newTextDelay + 250);
    }
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it to the console
            console.log({
                name,
                email,
                subject,
                message
            });
            
            // Show success message
            alert('Your message has been sent successfully!');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Scroll to top button
    const scrollToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Active Navigation based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = (windowTopPosition + windowHeight);
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = (elementTopPosition + elementHeight);
            
            // Check if element is in view
            if ((elementBottomPosition >= windowTopPosition) && 
                (elementTopPosition <= windowBottomPosition)) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('load', checkIfInView);
});

// Add CSS for the cursor animation
document.head.insertAdjacentHTML('beforeend', `
<style>
.cursor {
    display: inline-block;
    width: 3px;
    background-color: var(--primary-color);
    margin-left: 5px;
    animation: blink 1s infinite;
}

.cursor.typing {
    animation: none;
}

@keyframes blink {
    0%, 49% {
        background-color: var(--primary-color);
    }
    50%, 100% {
        background-color: transparent;
    }
}

.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
}

.back-to-top.show {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    background-color: #3a57d7;
    transform: translateY(-5px);
}

/* Mobile Navigation Styles */
@media (max-width: 768px) {
    .hamburger {
        display: flex;
        z-index: 1001;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
    
    .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 70%;
        height: 100vh;
        background-color: white;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all 0.5s ease;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }
    
    .nav-links.active {
        right: 0;
    }
    
    .nav-links li {
        margin: 20px 0;
    }
    
    .hero .container,
    .about-content,
    .resume-content,
    .contact-content {
        flex-direction: column;
    }
    
    .hero-image {
        order: -1;
        margin-bottom: 30px;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
</style>
`);
