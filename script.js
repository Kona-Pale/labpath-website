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

			// Allow scrolling inside the Latest News content.
			const target = event.target instanceof Element
			? event.target
			: event.target.parentElement;

			const newsContent = target?.closest(
			"#latest-news-slide .latest-news-content"
			);

    if (newsContent) {

        const canScrollDown =
            newsContent.scrollTop + newsContent.clientHeight <
            newsContent.scrollHeight - 1;

        const canScrollUp = newsContent.scrollTop > 0;

        if (
            (event.deltaY > 0 && canScrollDown) ||
            (event.deltaY < 0 && canScrollUp)
        ) {
            return;
        }
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


// =========================================
// LATEST NEWS
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const root = document.getElementById("latest-news-slide");

    if (!root) return;

    // Keep selectors within the Latest News section.
    const get = id => root.querySelector(`#${id}`);


    // =====================================
    // FEATURED MONTH
    // =====================================

    const FEATURE = {
        year: 2026,
        month: 11,
        headline: "Latest News",
        blurb: "This month we recognise Movember, the global campaign raising awareness on men’s health, from prostate and testicular cancer to mental health and suicide prevention."
    };


    // =====================================
    // UPCOMING HEALTH DATES
    // =====================================

    const EVENTS = [

        {
            date: "2026-11-18",
            title: "World Antimicrobial Resistance Awareness Week begins",
            desc: "A week focused on using antibiotics responsibly and slowing drug resistance.",
            type: "global"
        },
		
		{
            date: "2026-11-19",
            title: "International Men's Day",
            desc: "A global campaign that advocates for men's health issues.",
            type: "global"
        },
		
		
		{
            date: "2026-11-25",
            title: "16 Days of Activism against Gender-Based Violence",
            desc: "Advocating for the elimination of violence against women and girls.",
            type: "local"
        },
		
        {
            date: "2026-12-01",
            title: "World AIDS Day",
            desc: "A day to show support for people living with HIV and to remember those lost.",
            type: "global"
        },
		
	
		{
            date: "2026-12-01",
            title: "SunSmart Skin Cancer Awareness Month",
            desc: "Raising awareness about skin cancer, prevention and treatment.",
            type: "local"
        },
		
		
		{
            date: "2026-12-03",
            title: "International Day of Persons with Disabilities",
            desc: "Promoting the rights, dignity and well-being of persons with disabilities.",
            type: "global"
        },		

		
        {
            date: "2026-12-12",
            title: "International Universal Health Coverage Day",
            desc: "Calls for affordable, quality healthcare for everyone.",
            type: "global"
        },

        {
            date: "2027-01-01",
            title: "Cervical Cancer Awareness Month",
            desc: "Raises awareness for women's health, early screening and vaccinations.",
            type: "global"
        },

        {
            date: "2027-02-04",
            title: "World Cancer Day",
            desc: "Raises awareness of prevention, detection and treatment advances.",
            type: "global"
        },
		
		        {
            date: "2027-02-04",
            title: "World Braille Day",
            desc: "Raising awareness on the importance of braille as a form of communication and human right for blind and partially-sighted communities",
            type: "global"
        },

        {
            date: "2027-02-11",
            title: "International Day of Women and Girls in Science",
            desc: "Celebrates the women driving scientific and medical discovery.",
            type: "global"
        },

        {
            date: "2027-03-24",
            title: "World Tuberculosis Day",
            desc: "Highlights progress and gaps in the fight against TB.",
            type: "global"
        },

        {
            date: "2027-04-07",
            title: "World Health Day",
            desc: "The World Health Organization's yearly spotlight on a global health priority.",
            type: "global"
        }

    ];


    // =====================================
    // CALENDAR SETTINGS
    // =====================================

    const MONTHS = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const MAX_UPCOMING = 4;

    const now = new Date();

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const todayKey = [
        currentYear,
        String(currentMonth).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0")
    ].join("-");

    // Calendar always starts at the current month.
    let viewY = currentYear;
    let viewM = currentMonth;

    let selected = null;
    let filter = "all";


    // =====================================
    // DATE HELPERS
    // =====================================

    const pad = number => String(number).padStart(2, "0");

    const makeKey = (year, month, day) =>
        `${year}-${pad(month)}-${pad(day)}`;

    const formatDate = dateString => {

        const [year, month, day] = dateString.split("-").map(Number);

        return new Intl.DateTimeFormat("en-ZA", {
            day: "numeric",
            month: "long"
        }).format(new Date(year, month - 1, day));

    };

    // Return events matching the selected filter.
    function eventsOn(dateKey) {

        return EVENTS.filter(event => {

            const matchesDate = event.date === dateKey;

            const matchesFilter =
                filter === "all" || event.type === filter;

            return matchesDate && matchesFilter;

        });

    }


    // =====================================
    // POPULATE FEATURED MONTH
    // =====================================

    get("news-feature-month").textContent =
        `${MONTHS[FEATURE.month - 1]} ${FEATURE.year}`;

    get("news-feature-title").textContent =
        FEATURE.headline;

    get("news-feature-blurb").textContent =
        FEATURE.blurb;


    // =====================================
    // CALENDAR DATE DETAILS
    // =====================================

    function showDetail(dateKey) {

        const detail = get("news-calendar-detail");

        const matchingEvents = eventsOn(dateKey);

        detail.replaceChildren();

        if (matchingEvents.length === 0) {

            detail.textContent =
                "There are no listed events for this date.";

            return;
        }

        const dateHeading = document.createElement("strong");

        dateHeading.textContent = formatDate(dateKey);

        detail.appendChild(dateHeading);

        matchingEvents.forEach(event => {

            const title = document.createElement("span");

            title.textContent = event.title;

            detail.appendChild(title);

            const description = document.createElement("p");

            description.textContent = event.desc;

            detail.appendChild(description);

        });

    }


    // =====================================
    // RENDER CALENDAR
    // =====================================

    function renderCalendar() {

        const grid = get("news-calendar-grid");

        grid.replaceChildren();

        get("news-calendar-title").textContent =
            `${MONTHS[viewM - 1]} ${viewY}`;


        // Disable previous month when viewing
        // the current month.

        const previousButton = get("news-prev");

        const viewingCurrentMonth =
            viewY === currentYear && viewM === currentMonth;

        previousButton.disabled = viewingCurrentMonth;


        // Weekday headings.

        DAYS.forEach(day => {

            const heading = document.createElement("span");

            heading.className = "weekday";
            heading.textContent = day;

            grid.appendChild(heading);

        });


        const firstDay = new Date(viewY, viewM - 1, 1);

        const daysInMonth =
            new Date(viewY, viewM, 0).getDate();

        // Convert Sunday-first numbering to Monday-first.

        const startOffset = (firstDay.getDay() + 6) % 7;


        // Empty spaces before the first day.

        for (let i = 0; i < startOffset; i++) {

            const blank = document.createElement("span");

            blank.className = "empty";

            grid.appendChild(blank);

        }


        // Calendar dates.

        for (let day = 1; day <= daysInMonth; day++) {

            const dateKey = makeKey(viewY, viewM, day);

            const matchingEvents = eventsOn(dateKey);

            const button = document.createElement("button");

            button.type = "button";
            button.className = "day";
            button.textContent = day;

            button.setAttribute("aria-label", formatDate(dateKey));


            // Highlight dates according to the active filter.

            if (matchingEvents.length > 0) {

                button.classList.add("has-event");

                if (matchingEvents.some(event => event.type === "local")) {
                    button.classList.add("local");
                }

                const dot = document.createElement("span");

                dot.className = "dot";

                button.appendChild(dot);

            }


            if (dateKey === todayKey) {
                button.classList.add("today");
            }

            if (dateKey === selected) {

                button.classList.add("selected");

                button.setAttribute("aria-pressed", "true");

            } else {

                button.setAttribute("aria-pressed", "false");

            }


            button.addEventListener("click", () => {

                selected = dateKey;

                renderCalendar();

                showDetail(dateKey);

            });


            grid.appendChild(button);

        }

    }


    // =====================================
    // CHANGE CALENDAR MONTH
    // =====================================

    function shiftMonth(delta) {

        const newDate = new Date(
            viewY,
            viewM - 1 + delta,
            1
        );

        const newYear = newDate.getFullYear();
        const newMonth = newDate.getMonth() + 1;

        // Prevent navigation before the current month.

        if (
            newYear < currentYear ||
            (newYear === currentYear && newMonth < currentMonth)
        ) {
            return;
        }

        viewY = newYear;
        viewM = newMonth;

        selected = null;

        renderCalendar();

        get("news-calendar-detail").textContent =
            "Select a highlighted date to see what it marks.";

    }


    get("news-prev").addEventListener("click", () => {
        shiftMonth(-1);
    });

    get("news-next").addEventListener("click", () => {
        shiftMonth(1);
    });


    // =====================================
    // RENDER UPCOMING DATES
    // =====================================

    function renderUpcoming() {

        const upcoming = EVENTS
            .filter(event => event.date >= todayKey)
            .filter(event =>
                filter === "all" || event.type === filter
            )
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, 2);


        const upcomingText = upcoming.map(event =>
            `${formatDate(event.date)} — ${event.title}`
        );


        // Display dates in one compact,
        // semicolon-separated paragraph.

        get("news-events").textContent =
            upcomingText.length > 0
                ? upcomingText.join("; ")
                : "There are currently no upcoming dates in this category.";

    }


    // =====================================
    // EVENT FILTER BUTTONS
    // =====================================

    root.querySelectorAll("[data-news-filter]").forEach(button => {

        button.addEventListener("click", () => {

            filter = button.dataset.newsFilter;

            // Update active filter button.

            root.querySelectorAll("[data-news-filter]").forEach(item => {

                item.setAttribute(
                    "aria-pressed",
                    item === button ? "true" : "false"
                );

            });


            // Refresh calendar highlights and upcoming dates.

            renderCalendar();

            renderUpcoming();


            // Refresh selected date details.

            if (selected) {
                showDetail(selected);
            }

        });

    });


    // =====================================
    // INITIAL RENDER
    // =====================================

    renderCalendar();

    renderUpcoming();

});