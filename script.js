// JavaScript Document

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // Company Values Slider
    // ===============================

    const slides = document.querySelectorAll(".value-slide");

    if (slides.length > 0) {

        let current = 0;

        function showSlide(index) {

            slides.forEach(slide => {
                slide.classList.remove("active");
            });

            slides[index].classList.add("active");

        }

        setInterval(() => {

            current++;

            if (current >= slides.length) {
                current = 0;
            }

            showSlide(current);

        }, 2000);

    }


    // ===============================
    // Doctor Slider
    // ===============================

    const doctorSlides = document.querySelectorAll(".doctor-slide");

    if (doctorSlides.length > 0) {

        const nextButtons = document.querySelectorAll(".doctor-next");
        const prevButtons = document.querySelectorAll(".doctor-prev");

        let currentDoctor = 0;

        function showDoctor(index) {

            doctorSlides.forEach(slide => {
                slide.classList.remove("active");
            });

            doctorSlides[index].classList.add("active");

        }

        nextButtons.forEach(button => {

            button.addEventListener("click", () => {

                currentDoctor++;

                if (currentDoctor >= doctorSlides.length) {
                    currentDoctor = 0;
                }

                showDoctor(currentDoctor);

            });

        });

        prevButtons.forEach(button => {

            button.addEventListener("click", () => {

                currentDoctor--;

                if (currentDoctor < 0) {
                    currentDoctor = doctorSlides.length - 1;
                }

                showDoctor(currentDoctor);

            });

        });

    }


    // ===============================
    // Mobile Navigation
    // ===============================

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        // Open / Close menu
        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();
            navMenu.classList.toggle("active");

        });

        // Prevent closing when clicking inside the menu
        navMenu.addEventListener("click", (event) => {

            event.stopPropagation();

        });

        // Close when clicking anywhere else
        document.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    }

});