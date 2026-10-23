// JavaScript Document
/* =================================
   LabPath - Main Site JavaScript
   For standard vertical-layout pages
   ================================= */

document.addEventListener("DOMContentLoaded", () => {

// ===============================
    // Mobile & Tablet Navigation
    // ===============================

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        const navLinks = navMenu.querySelectorAll("a");

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

        // Set the initial accessibility state
        menuToggle.setAttribute("aria-expanded", "false");

        // Open and close the menu
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            if (navMenu.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close the menu after selecting a navigation link
        navLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when Escape is pressed
        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                navMenu.classList.contains("active")
            ) {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Close the menu if the screen returns to desktop width
        const mobileLayout = window.matchMedia("(max-width: 1023px)");

        mobileLayout.addEventListener("change", (event) => {
            if (!event.matches) {
                closeMenu();
            }
        });

    }


    // ===============================
    // Values Cards Animation
    // ===============================

    const cards = document.querySelectorAll(".values-card, .leadership-card");

    if (cards.length > 0) {

        // Show cards if IntersectionObserver
        // is unavailable.
        if (!("IntersectionObserver" in window)) {

            cards.forEach(card => {
                card.classList.add("is-visible");
            });

        } else {

            const observer = new IntersectionObserver(
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

            cards.forEach(card => {
                observer.observe(card);
            });

        }

    }
	

	const serviceItems = document.querySelectorAll(".service-item");

if ("IntersectionObserver" in window) {
    const serviceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    serviceItems.forEach((item) => {
        serviceObserver.observe(item);
    });
} else {
    serviceItems.forEach((item) => {
        item.classList.add("is-visible");
    });
}
	
  // ===============================
    // Pathology Rows Animation
    // ===============================

    const pathologyRows = document.querySelectorAll(".pathology-row");

    if (pathologyRows.length > 0) {

        if (!("IntersectionObserver" in window)) {

            pathologyRows.forEach(row => {
                row.classList.add("is-visible");
            });

        } else {

            const pathologyObserver = new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }

                    });

                },
                {
                    threshold: 0.05
                }
            );

            pathologyRows.forEach(row => {
                pathologyObserver.observe(row);
            });

        }

    }
	
	/* Resources Cards Animation */

const resourceCards = document.querySelectorAll(".resource-card");

if (resourceCards.length > 0) {
    if (!("IntersectionObserver" in window)) {
        resourceCards.forEach(card => card.classList.add("is-visible"));
    } else {
        const resourceObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        resourceCards.forEach(card => resourceObserver.observe(card));
    }
}
	

});