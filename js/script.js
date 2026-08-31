document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       GSAP ANIMATIONS (Premium Reveal Transitions)
       ========================================== */
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // 1. HERO LOAD ANIMATION
        const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });
        
        // Hide elements initially via GSAP for progressive enhancement
        gsap.set(".header-container", { y: -50, opacity: 0 });
        gsap.set(".hero-tagline", { y: 30, opacity: 0 });
        gsap.set(".hero-title", { y: 40, opacity: 0 });
        gsap.set(".hero-description", { y: 30, opacity: 0 });
        gsap.set(".hero-actions-group", { y: 20, opacity: 0 });
        gsap.set(".hero-help-btn", { opacity: 0, y: 10 });
        gsap.set(".hero-scroll-down", { opacity: 0 });

        heroTimeline
            .to(".header-container", { y: 0, opacity: 1, duration: 1 })
            .to(".hero-tagline", { y: 0, opacity: 1 }, "-=0.6")
            .to(".hero-title", { y: 0, opacity: 1 }, "-=1")
            .to(".hero-description", { y: 0, opacity: 1 }, "-=0.9")
            .to(".hero-actions-group", { y: 0, opacity: 1 }, "-=0.8")
            .to(".hero-help-btn", { y: 0, opacity: 1, duration: 0.8 }, "-=0.7")
            .to(".hero-scroll-down", { opacity: 1, duration: 0.8 }, "-=0.5");

        // 2. SCROLL TRIGGER ANIMATIONS
        
        // Institutional Section Content
        gsap.from(".about-content", {
            scrollTrigger: {
                trigger: ".institutional",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            x: -60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });

        // Institutional Section Visual Panel
        gsap.from(".about-visual", {
            scrollTrigger: {
                trigger: ".institutional",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            x: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });

        // New Gallery Section Carrusel
        gsap.from(".slider-wrapper", {
            scrollTrigger: {
                trigger: ".new-gallery-section",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            scale: 0.98,
            duration: 1.2,
            ease: "power3.out"
        });

        // Publications Grid Items (formerly Gallery items)
        gsap.from(".gallery-item", {
            scrollTrigger: {
                trigger: ".gallery-section",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out"
        });

        // Contact Section Info Panel
        gsap.from(".contact-info-panel", {
            scrollTrigger: {
                trigger: ".contact",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            x: -50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });

        // Contact Section Form Panel
        gsap.from(".contact-form-panel", {
            scrollTrigger: {
                trigger: ".contact",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            x: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    }
    
    /* ==========================================
       HEADER SCROLL EFFECT
       ========================================== */
    const header = document.getElementById("header");
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once

    /* ==========================================
       MOBILE MENU TOGGLE
       ========================================== */
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("open");
            navMenu.classList.toggle("open");
            document.body.classList.toggle("no-scroll");
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("open");
                navMenu.classList.remove("open");
                document.body.classList.remove("no-scroll");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains("open")) {
                navToggle.classList.remove("open");
                navMenu.classList.remove("open");
                document.body.classList.remove("no-scroll");
            }
        });
    }

    /* ==========================================
       ACTIVE LINK HIGHLIGHT ON SCROLL (Observer)
       ========================================== */
    const sections = document.querySelectorAll("section[id]");
    const navLinksList = document.querySelectorAll(".nav-list a");

    const observerOptions = {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinksList.forEach(link => {
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active-link");
                    } else {
                        link.classList.remove("active-link");
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    /* ==========================================
       VALUES SLIDER (Institutional Section)
       ========================================== */
    const slides = document.querySelectorAll(".value-slide");
    const dots = document.querySelectorAll(".slider-dots .dot");
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        slides[index].classList.add("active");
        dots[index].classList.add("active");
        currentSlide = index;
    };

    const nextSlide = () => {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    };

    const startSlideShow = () => {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, 5000);
    };

    const stopSlideShow = () => {
        if (slideInterval) clearInterval(slideInterval);
    };

    if (slides.length > 0 && dots.length > 0) {
        showSlide(0);
        startSlideShow();

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => {
                showSlide(idx);
                startSlideShow();
            });
        });
    }

    /* ==========================================
       NEW GALLERY SLIDER / CARRUSEL LOGIC
       ========================================== */
    const sliderTrack = document.getElementById("slider-track");
    const sliderDotsContainer = document.getElementById("slider-dots");
    const sliderPrev = document.getElementById("slider-prev");
    const sliderNext = document.getElementById("slider-next");
    const sliderWrapper = document.querySelector(".new-gallery-section .slider-wrapper");

    let activeSlideIndex = 0;
    let sliderAutoplayInterval;
    let sliderSlides = [];
    let sliderDots = [];

    const showSliderSlide = (index) => {
        if (sliderSlides.length === 0) return;
        sliderSlides.forEach(slide => slide.classList.remove("active"));
        sliderDots.forEach(dot => dot.classList.remove("active"));
        
        sliderSlides[index].classList.add("active");
        sliderDots[index].classList.add("active");
        activeSlideIndex = index;
    };

    const nextSliderSlide = () => {
        if (sliderSlides.length === 0) return;
        let nextIndex = (activeSlideIndex + 1) % sliderSlides.length;
        showSliderSlide(nextIndex);
    };

    const prevSliderSlide = () => {
        if (sliderSlides.length === 0) return;
        let prevIndex = (activeSlideIndex - 1 + sliderSlides.length) % sliderSlides.length;
        showSliderSlide(prevIndex);
    };

    const startSliderAutoplay = () => {
        stopSliderAutoplay();
        sliderAutoplayInterval = setInterval(nextSliderSlide, 6000); // 6 seconds
    };

    const stopSliderAutoplay = () => {
        if (sliderAutoplayInterval) clearInterval(sliderAutoplayInterval);
    };

    const initSlider = (photos) => {
        if (!sliderTrack || !sliderDotsContainer) return;
        
        sliderTrack.innerHTML = "";
        sliderDotsContainer.innerHTML = "";
        
        if (!photos || photos.length === 0) {
            sliderTrack.innerHTML = '<div class="slider-empty" style="text-align: center; color: var(--color-secondary-light); padding: 40px; font-family: var(--font-body); display: flex; align-items: center; justify-content: center; height: 100%;">No hay fotos en la carpeta galeria.</div>';
            return;
        }

        photos.forEach((photo, idx) => {
            const slide = document.createElement("div");
            slide.className = `slider-slide ${idx === 0 ? "active" : ""}`;
            slide.setAttribute("data-slide-index", idx);

            // Generate professional captions completely avoiding raw file names
            const titles = [
                "Línea Modena Premium",
                "Doble Vidriado Hermético (DVH)",
                "Puerta Corrediza de Alta Gama",
                "Frente Integrado Templado",
                "Aislamiento Termoacústico",
                "Perfilería Anodizada",
                "Ventanal Panorámico",
                "Herrajes de Precisión",
                "Aberturas de Alta Prestación",
                "Detalles de Hermeticidad"
            ];
            const descriptions = [
                "Carpintería de aluminio de alta gama integrada en fachadas residenciales modernas.",
                "Instalación de cristales con doble vidriado hermético para máximo aislamiento.",
                "Sistemas corredizos de deslizamiento suave y perfiles de alta resistencia.",
                "Vidrios de seguridad templados y laminados colocados bajo estrictas normas de ingeniería.",
                "Uso de burletes de EPDM y felpa de alta densidad que garantizan estanqueidad al viento y agua.",
                "Perfilería con tratamiento anodizado que resiste agentes corrosivos y paso del tiempo.",
                "Hojas de gran tamaño que maximizan la luminosidad y vista de tus ambientes.",
                "Accesorios importados que garantizan un funcionamiento suave y duradero en el uso cotidiano.",
                "Tipologías diseñadas a medida que combinan confort acústico, hermeticidad y sofisticación.",
                "Montaje técnico y calibración precisa de marcos y hojas en obra."
            ];

            const title = titles[idx % titles.length];
            const description = descriptions[idx % descriptions.length];

            slide.innerHTML = `
                <div class="slide-media">
                    <img src="galeria/${photo}" alt="${title}" loading="${idx === 0 ? "eager" : "lazy"}">
                </div>
                <div class="slide-caption">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            `;
            sliderTrack.appendChild(slide);

            const dot = document.createElement("button");
            dot.className = `slider-dot ${idx === 0 ? "active" : ""}`;
            dot.setAttribute("aria-label", `Ir a slide ${idx + 1}`);
            dot.addEventListener("click", () => {
                showSliderSlide(idx);
                startSliderAutoplay();
            });
            sliderDotsContainer.appendChild(dot);
        });

        sliderSlides = document.querySelectorAll(".new-gallery-section .slider-slide");
        sliderDots = document.querySelectorAll(".new-gallery-section .slider-dot");

        showSliderSlide(0);
        startSliderAutoplay();
    };

    // Load dynamic photos
    fetch("galeria/photos.json")
        .then(res => res.json())
        .then(photos => {
            initSlider(photos);
        })
        .catch(err => {
            console.warn("No se pudo cargar galeria/photos.json. Cargando fallback de fotos.", err);
            const fallback = [
                "gallery-real-1.jpg", "gallery-real-2.jpg", "gallery-real-3.jpg",
                "gallery-real-4.jpg", "gallery-real-5.jpg", "gallery-real-6.jpg",
                "gallery-real-7.jpg", "gallery-real-8.jpg", "gallery-real-9.jpg",
                "gallery-real-10.jpg"
            ];
            initSlider(fallback);
        });

    if (sliderPrev && sliderNext) {
        sliderPrev.addEventListener("click", () => {
            prevSliderSlide();
            startSliderAutoplay();
        });
        sliderNext.addEventListener("click", () => {
            nextSliderSlide();
            startSliderAutoplay();
        });
    }

    if (sliderWrapper) {
        sliderWrapper.addEventListener("mouseenter", stopSliderAutoplay);
        sliderWrapper.addEventListener("mouseleave", startSliderAutoplay);

        let touchStartX = 0;
        let touchEndX = 0;
        sliderWrapper.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        sliderWrapper.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) {
                nextSliderSlide();
                startSliderAutoplay();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                prevSliderSlide();
                startSliderAutoplay();
            }
        }, { passive: true });
    }

    /* ==========================================
       3D BACKGROUND PARALLAX (MOUSE & KEYBOARD)
       ========================================== */
    const bgImage = document.getElementById("hero-bg-image");
    const heroSection = document.getElementById("inicio");
    const activeKeys = { left: false, right: false, up: false, down: false };
    let isMouseOverHero = false;
    let mouseXNorm = 0;
    let mouseYNorm = 0;

    const updateBgTransform = () => {
        if (!bgImage) return;

        let targetX = 0;
        let targetY = 0;
        let targetRotX = 0;
        let targetRotY = 0;

        // 1. Keyboard influence
        if (activeKeys.left) { targetX += 40; targetRotY += 8; }
        if (activeKeys.right) { targetX -= 40; targetRotY -= 8; }
        if (activeKeys.up) { targetY += 30; targetRotX -= 8; }
        if (activeKeys.down) { targetY -= 30; targetRotX += 8; }

        // 2. Mouse move influence (only when mouse is over Hero)
        if (isMouseOverHero) {
            targetX += -mouseXNorm * 50;
            targetY += -mouseYNorm * 35;
            targetRotY += -mouseXNorm * 10;
            targetRotX += mouseYNorm * 10;
        }

        // Cancel out conflicting presses
        if (activeKeys.left && activeKeys.right) { targetX = 0; targetRotY = 0; }
        if (activeKeys.up && activeKeys.down) { targetY = 0; targetRotX = 0; }

        bgImage.style.transform = `scale(1.15) translate3d(${targetX}px, ${targetY}px, 0) rotateX(${targetRotX}deg) rotateY(${targetRotY}deg)`;
    };

    // Keyboard events
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" || e.code === "KeyA") activeKeys.left = true;
        if (e.key === "ArrowRight" || e.code === "KeyD") activeKeys.right = true;
        if (e.key === "ArrowUp" || e.code === "KeyW") activeKeys.up = true;
        if (e.key === "ArrowDown" || e.code === "KeyS") activeKeys.down = true;

        updateBgTransform();
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowLeft" || e.code === "KeyA") activeKeys.left = false;
        if (e.key === "ArrowRight" || e.code === "KeyD") activeKeys.right = false;
        if (e.key === "ArrowUp" || e.code === "KeyW") activeKeys.up = false;
        if (e.key === "ArrowDown" || e.code === "KeyS") activeKeys.down = false;

        updateBgTransform();
    });

    // Mouse events on Hero section
    if (heroSection) {
        heroSection.addEventListener("mousemove", (e) => {
            isMouseOverHero = true;
            const width = window.innerWidth;
            const height = window.innerHeight;
            mouseXNorm = (e.clientX / width) - 0.5;
            mouseYNorm = (e.clientY / height) - 0.5;
            updateBgTransform();
        });

        heroSection.addEventListener("mouseleave", () => {
            isMouseOverHero = false;
            mouseXNorm = 0;
            mouseYNorm = 0;
            updateBgTransform();
        });
    }
    /* ==========================================
       HERO BACKGROUND ROTATION (SLIDESHOW)
       ========================================== */
    const bgImages = ["img/hero-bg-1.jpg", "img/hero-bg-2.jpg", "img/hero-bg-3.jpg"];
    let currentBgIdx = 0;

    if (bgImage) {
        setInterval(() => {
            bgImage.classList.add("fade-out");
            setTimeout(() => {
                currentBgIdx = (currentBgIdx + 1) % bgImages.length;
                bgImage.src = bgImages[currentBgIdx];
                
                // Remove fade-out class once image loads (or if load fails)
                let isLoaded = false;
                bgImage.onload = () => {
                    if (!isLoaded) {
                        bgImage.classList.remove("fade-out");
                        isLoaded = true;
                    }
                };
                bgImage.onerror = () => {
                    if (!isLoaded) {
                        bgImage.classList.remove("fade-out");
                        isLoaded = true;
                    }
                };
                // Fallback in case onload/onerror do not fire (Cached)
                setTimeout(() => {
                    if (!isLoaded) {
                        bgImage.classList.remove("fade-out");
                        isLoaded = true;
                    }
                }, 200);
            }, 1000);
        }, 5000);
    }

    /* ==========================================
       HELP MODAL LOGIC (GUÍA DE INTERACCIÓN)
       ========================================== */
    const helpBtn = document.getElementById("hero-help-btn");
    const helpModal = document.getElementById("help-modal");
    const helpModalClose = document.getElementById("help-modal-close");

    if (helpBtn && helpModal && helpModalClose) {
        helpBtn.addEventListener("click", () => {
            helpModal.classList.add("open");
            document.body.classList.add("no-scroll");
        });

        const closeHelpModal = () => {
            helpModal.classList.remove("open");
            document.body.classList.remove("no-scroll");
        };

        helpModalClose.addEventListener("click", closeHelpModal);

        helpModal.addEventListener("click", (e) => {
            if (e.target === helpModal) {
                closeHelpModal();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && helpModal.classList.contains("open")) {
                closeHelpModal();
            }
        });
    }

    /* ==========================================
       NATIVE PORTFOLIO LIGHTBOX (Publicaciones Section)
       ========================================== */
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    
    let activeImageIndex = 0;
    const galleryImagesData = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector("img");
        const title = item.querySelector(".gallery-item-title").textContent;
        const tag = item.querySelector(".gallery-tag").textContent;
        
        galleryImagesData.push({
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt"),
            caption: `${tag} - ${title}`
        });

        item.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    const openLightbox = (index) => {
        activeImageIndex = index;
        updateLightboxContent();
        lightbox.classList.add("open");
        document.body.classList.add("no-scroll");
    };

    const closeLightbox = () => {
        lightbox.classList.remove("open");
        document.body.classList.remove("no-scroll");
    };

    const updateLightboxContent = () => {
        const currentImgData = galleryImagesData[activeImageIndex];
        lightboxImg.src = currentImgData.src;
        lightboxImg.alt = currentImgData.alt;
        lightboxCaption.textContent = currentImgData.caption;
    };

    const navigateLightbox = (direction) => {
        if (direction === "next") {
            activeImageIndex = (activeImageIndex + 1) % galleryImagesData.length;
        } else if (direction === "prev") {
            activeImageIndex = (activeImageIndex - 1 + galleryImagesData.length) % galleryImagesData.length;
        }
        updateLightboxContent();
    };

    if (lightbox) {
        lightboxClose.addEventListener("click", closeLightbox);
        lightboxNext.addEventListener("click", () => navigateLightbox("next"));
        lightboxPrev.addEventListener("click", () => navigateLightbox("prev"));

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("open")) return;
            
            if (e.key === "Escape") {
                closeLightbox();
            } else if (e.key === "ArrowRight") {
                navigateLightbox("next");
            } else if (e.key === "ArrowLeft") {
                navigateLightbox("prev");
            }
        });
    }

    /* ==========================================
       FORM VALIDATION & TOAST SYSTEM
       ========================================== */
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9\s\-\+\(\)]{7,20}$/;

    const setInvalid = (input, errorMsgId, message) => {
        const group = input.parentElement;
        const errorSpan = document.getElementById(errorMsgId);
        
        input.classList.remove("valid");
        input.classList.add("invalid");
        group.classList.add("has-error");
        
        if (errorSpan && message) {
            errorSpan.textContent = message;
        }
    };

    const setValid = (input, errorMsgId) => {
        const group = input.parentElement;
        
        input.classList.remove("invalid");
        input.classList.add("valid");
        group.classList.remove("has-error");
    };

    const validateName = () => {
        const val = nameInput.value.trim();
        if (val === "") {
            setInvalid(nameInput, "name-error", "El nombre es obligatorio");
            return false;
        } else if (val.length < 3) {
            setInvalid(nameInput, "name-error", "El nombre debe tener al menos 3 caracteres");
            return false;
        }
        setValid(nameInput, "name-error");
        return true;
    };

    const validateEmail = () => {
        const val = emailInput.value.trim();
        if (val === "") {
            setInvalid(emailInput, "email-error", "El correo es obligatorio");
            return false;
        } else if (!emailRegex.test(val)) {
            setInvalid(emailInput, "email-error", "Ingresa un correo electrónico válido");
            return false;
        }
        setValid(emailInput, "email-error");
        return true;
    };

    const validatePhone = () => {
        const val = phoneInput.value.trim();
        if (val === "") {
            setInvalid(phoneInput, "phone-error", "El teléfono es obligatorio");
            return false;
        } else if (!phoneRegex.test(val)) {
            setInvalid(phoneInput, "phone-error", "Ingresa un formato de teléfono válido");
            return false;
        }
        setValid(phoneInput, "phone-error");
        return true;
    };

    const validateMessage = () => {
        const val = messageInput.value.trim();
        if (val === "") {
            setInvalid(messageInput, "message-error", "La consulta es obligatoria");
            return false;
        } else if (val.length < 10) {
            setInvalid(messageInput, "message-error", "Tu mensaje debe tener al menos 10 caracteres");
            return false;
        }
        setValid(messageInput, "message-error");
        return true;
    };

    if (form) {
        nameInput.addEventListener("input", validateName);
        emailInput.addEventListener("input", validateEmail);
        phoneInput.addEventListener("input", validatePhone);
        messageInput.addEventListener("input", validateMessage);
        
        nameInput.addEventListener("blur", validateName);
        emailInput.addEventListener("blur", validateEmail);
        phoneInput.addEventListener("blur", validatePhone);
        messageInput.addEventListener("blur", validateMessage);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
                submitBtn.classList.add("loading");
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.classList.remove("loading");
                    submitBtn.disabled = false;
                    
                    showToast("¡Mensaje enviado con éxito! Nos contactaremos a la brevedad.", "success");
                    
                    form.reset();
                    
                    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
                        input.classList.remove("valid");
                        input.classList.remove("invalid");
                        input.parentElement.classList.remove("has-error");
                    });
                    
                }, 1800);
                
            } else {
                showToast("Por favor, corrige los errores en el formulario.", "error");
                
                const firstInvalid = form.querySelector(".invalid");
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });
    }

    /* ==========================================
       TOAST SYSTEM CREATION
       ========================================== */
    const toastContainer = document.getElementById("toast-container");

    const showToast = (message, type = "success") => {
        if (!toastContainer) return;
        
        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        
        let iconSvg = "";
        if (type === "success") {
            iconSvg = `
                <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                </svg>
            `;
        } else {
            iconSvg = `
                <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
            `;
        }

        toast.innerHTML = `
            ${iconSvg}
            <div class="toast-text">${message}</div>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add("show");
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove("show");
            toast.addEventListener("transitionend", () => {
                toast.remove();
            });
        }, 4000);
    };

});
