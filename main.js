document.addEventListener('DOMContentLoaded', () => {
    // 0. Language Switcher + translations
    const langButtons = document.querySelectorAll('.lang-btn');
    const defaultLang = 'fr';
    const savedLang = localStorage.getItem('site-language');
    const isValidLang = (lang) => typeof translations !== 'undefined' && Object.prototype.hasOwnProperty.call(translations, lang);

    const applyLanguage = (lang) => {
        const nextLang = isValidLang(lang) ? lang : defaultLang;
        const dictionary = translations[nextLang];

        document.documentElement.lang = nextLang;

        document.querySelectorAll('[data-i18n]').forEach((node) => {
            const key = node.getAttribute('data-i18n');
            if (dictionary[key] !== undefined) {
                node.innerHTML = dictionary[key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
            const key = node.getAttribute('data-i18n-placeholder');
            if (dictionary[key] !== undefined) {
                node.setAttribute('placeholder', dictionary[key]);
            }
        });

        document.querySelectorAll('[data-i18n-alt]').forEach((node) => {
            const key = node.getAttribute('data-i18n-alt');
            if (dictionary[key] !== undefined) {
                node.setAttribute('alt', dictionary[key]);
            }
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach((node) => {
            const key = node.getAttribute('data-i18n-aria-label');
            if (dictionary[key] !== undefined) {
                node.setAttribute('aria-label', dictionary[key]);
            }
        });

        document.querySelectorAll('[data-i18n-rotator]').forEach((node) => {
            const key = node.getAttribute('data-i18n-rotator');
            if (dictionary[key] !== undefined) {
                node.setAttribute('data-words', dictionary[key]);
                const words = dictionary[key].split(',');
                if (words.length) node.textContent = words[0];
            }
        });

        langButtons.forEach((btn) => {
            const isActive = btn.getAttribute('data-lang') === nextLang;
            btn.classList.toggle('active', isActive);
        });

        localStorage.setItem('site-language', nextLang);
    };

    langButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            applyLanguage(btn.getAttribute('data-lang'));
        });
    });

    applyLanguage(savedLang || defaultLang);
    
    // 0. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 0.5 Word Rotator
    const rotators = document.querySelectorAll('.word-rotator');
    rotators.forEach(rotator => {
        let currentIndex = 0;
        
        setInterval(() => {
            const words = (rotator.getAttribute('data-words') || '').split(',').filter(Boolean);
            if (!words.length) return;
            currentIndex = currentIndex % words.length;

            rotator.classList.add('rotate-out');
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % words.length;
                rotator.textContent = words[currentIndex];
                rotator.classList.remove('rotate-out');
                rotator.classList.add('rotate-in');
                
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        rotator.classList.remove('rotate-in');
                    });
                });
            }, 850);
        }, 3500);
    });

    // 0.6 Animated Counters
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                const prefix = target.getAttribute('data-prefix') || '';
                
                // Very fast for small numbers, normal speed for larger
                const duration = endValue < 10 ? 1000 : 2500; 
                let startTime = null;

                const animate = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    // Ease-out cubic: starts fast, slows down smoothly
                    const easedProgress = 1 - Math.pow(1 - progress, 3);
                    
                    const currentValue = Math.floor(easedProgress * endValue);
                    target.textContent = prefix + currentValue;

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        target.textContent = prefix + endValue;
                    }
                };

                target.textContent = prefix + '0';
                requestAnimationFrame(animate);
                
                observer.unobserve(target); // Only animate once
            }
        });
    }, { threshold: 0.1 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // 1. Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    revealElements.forEach(el => observer.observe(el));

    // 2.5 Product carousels (autoplay on hover only)
    const productCarousels = document.querySelectorAll('.product-carousel');
    productCarousels.forEach((carousel) => {
        const slides = carousel.querySelectorAll('.product-slide');
        if (!slides.length) return;
        const block = carousel.closest('.product-carousel-block');
        const dotsContainer = block ? block.querySelector('.product-carousel-dots') : null;
        let dots = [];

        let currentIndex = 0;
        let autoplayId = null;
        const delay = Number(carousel.getAttribute('data-autoplay-delay')) || 2400;

        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = 'product-carousel-dot';
                dot.setAttribute('role', 'button');
                dot.setAttribute('tabindex', '0');
                dot.setAttribute('aria-label', `Aller au visuel ${index + 1}`);
                if (index === 0) dot.classList.add('is-active');
                dot.addEventListener('click', () => {
                    stopAutoplay();
                    showSlide(index);
                });
                dot.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        stopAutoplay();
                        showSlide(index);
                    }
                });
                dotsContainer.appendChild(dot);
                dots.push(dot);
            });
        }

        const showSlide = (nextIndex) => {
            slides.forEach((slide, index) => {
                slide.classList.toggle('is-active', index === nextIndex);
            });
            dots.forEach((dot, index) => {
                dot.classList.toggle('is-active', index === nextIndex);
            });
            currentIndex = nextIndex;
        };

        const goToNextSlide = () => {
            const next = (currentIndex + 1) % slides.length;
            showSlide(next);
        };

        const stopAutoplay = () => {
            if (autoplayId) {
                clearInterval(autoplayId);
                autoplayId = null;
            }
        };

        const startAutoplay = () => {
            if (slides.length < 2 || autoplayId) return;
            autoplayId = setInterval(goToNextSlide, delay);
        };

        showSlide(0);

        const triggerElement = block || carousel;
        
        triggerElement.addEventListener('mouseenter', startAutoplay);
        triggerElement.addEventListener('mouseleave', () => {
            stopAutoplay();
            showSlide(0);
        });
    });


    // 3. Contact Form Submission Mock
    const contactForm = document.getElementById('main-contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Get button to show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            // Fetch API Call to FormSubmit
            fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                contactForm.reset();
                formSuccess.classList.remove('hidden');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 5000);
            }).catch(error => {
                console.error(error);
                submitBtn.textContent = "Erreur, réessayer";
                submitBtn.disabled = false;
            });
        });
    }

    // 4. Custom Cursor
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('custom-cursor-dot');
        document.body.appendChild(cursorDot);

        const cursorRing = document.createElement('div');
        cursorRing.classList.add('custom-cursor-ring');
        document.body.appendChild(cursorRing);

        let mouseX = -100, mouseY = -100;
        let ringX = -100, ringY = -100;
        let isInitialized = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!isInitialized) {
                ringX = mouseX;
                ringY = mouseY;
                cursorDot.style.opacity = '1';
                cursorRing.style.opacity = '0.5';
                isInitialized = true;
            }

            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });

        const animateRing = () => {
            if (isInitialized) {
                ringX += (mouseX - ringX) * 0.15;
                ringY += (mouseY - ringY) * 0.15;
                cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
            }
            requestAnimationFrame(animateRing);
        };
        requestAnimationFrame(animateRing);

        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, input, textarea, select, .product-carousel-block')) {
                cursorDot.classList.add('hover');
                cursorRing.classList.add('hover');
                cursorRing.style.opacity = '1';
            } else {
                cursorDot.classList.remove('hover');
                cursorRing.classList.remove('hover');
                cursorRing.style.opacity = '0.5';
            }
        });
        
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorRing.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            if (isInitialized) {
                cursorDot.style.opacity = '1';
                cursorRing.style.opacity = cursorRing.classList.contains('hover') ? '1' : '0.5';
            }
        });
    }

});
