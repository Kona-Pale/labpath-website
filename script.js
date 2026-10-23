// JavaScript Document

document.addEventListener("DOMContentLoaded", () => {

// ===============================
    // Homepage Slide Navigation
    // ===============================

    const contentSection = document.querySelector(".content-section");
    const pageSlides = document.querySelectorAll(".page-slide");
    const desktopLayout = window.matchMedia("(min-width: 1081px)");

    if (contentSection && pageSlides.length > 0) {

        let currentPage = 0;

        currentPage = Math.max(
            0,
            Math.min(currentPage, pageSlides.length - 1)
        );

        function showPage(index) {

            if (index < 0 || index >= pageSlides.length) {
                return;
            }

            currentPage = index;

            pageSlides.forEach(slide => {
                slide.classList.remove("active");
            });

            pageSlides[currentPage].classList.add("active");
			
			pageSlides[currentPage]
    		.querySelectorAll(".why-card")
    		.forEach(card => card.classList.add("is-visible"));

            if (desktopLayout.matches) {


                contentSection.style.transform =
                    `translateX(-${currentPage * 100}vw)`;

            } else {

                contentSection.style.transform = "none";

                pageSlides[currentPage].scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }

        function syncLayout() {

            if (desktopLayout.matches) {

                contentSection.style.transform =
                    `translateX(-${currentPage * 100}vw)`;

            } else {

                contentSection.style.transform = "none";
            }
        }

        syncLayout();

        desktopLayout.addEventListener("change", syncLayout);

        // Next buttons

        document.querySelectorAll(".slide-next").forEach(button => {

            button.addEventListener("click", event => {

                event.preventDefault();

                if (currentPage < pageSlides.length - 1) {
                    showPage(currentPage + 1);
                }
            });
        });

        // Previous buttons

        document.querySelectorAll(".slide-previous").forEach(button => {

            button.addEventListener("click", event => {

                event.preventDefault();

                if (currentPage > 0) {
                    showPage(currentPage - 1);
                }
            });
        });

        // Mouse wheel navigation: desktop only

        let scrollLocked = false;

        contentSection.addEventListener("wheel", event => {

            if (!desktopLayout.matches) {
                return;
            }

            event.preventDefault();

            if (scrollLocked) {
                return;
            }

            scrollLocked = true;

            if (event.deltaY > 0) {

                if (currentPage < pageSlides.length - 1) {
                    showPage(currentPage + 1);
                }

            } else if (event.deltaY < 0) {

                if (currentPage > 0) {
                    showPage(currentPage - 1);
                }
            }

            setTimeout(() => {
                scrollLocked = false;
            }, 700);

        }, { passive: false });
    }


// ===============================
    // Mobile & Tablet Navigation
    // ===============================

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = navMenu
        ? navMenu.querySelectorAll("a")
        : [];

    if (menuToggle && navMenu) {

        function openMenu() {
            navMenu.classList.add("active");
            menuToggle.classList.add("active");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close Menu");

            document.body.style.overflow = "hidden";
        }

        function closeMenu() {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open Menu");

            document.body.style.overflow = "";
        }

        // Toggle menu

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", event => {
            event.stopPropagation();

            if (navMenu.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close after selecting a navigation link

        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Close with Escape

        document.addEventListener("keydown", event => {
            if (
                event.key === "Escape" &&
                navMenu.classList.contains("active")
            ) {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Reset menu when returning to desktop layout

        const mobileLayout = window.matchMedia("(max-width: 1023px)");

        mobileLayout.addEventListener("change", event => {
            if (!event.matches) {
                closeMenu();
            }
        });
    }

 // ===============================
    // Why Choose Cards Animation
    // ===============================

    const whyChooseCards = document.querySelectorAll(".why-card");

    if (whyChooseCards.length > 0) {

        if (!("IntersectionObserver" in window)) {

            whyChooseCards.forEach(card => {
                card.classList.add("is-visible");
            });

        } else {

            const whyChooseObserver = new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

            whyChooseCards.forEach(card => {
                whyChooseObserver.observe(card);
            });

        }

    }
	
});