// ========================================
// AUTO AGE
// ========================================

const BIRTH_YEAR = 2000;
const BIRTH_MONTH = 6; // July (January = 0)
const BIRTH_DAY = 28;

function updateAge() {

    const today = new Date();

    let age = today.getFullYear() - BIRTH_YEAR;

    const birthdayThisYear = new Date(
        today.getFullYear(),
        BIRTH_MONTH,
        BIRTH_DAY
    );

    if (today < birthdayThisYear) {
        age--;
    }

    const ageElement =
        document.getElementById("age");

    if (ageElement) {
        ageElement.textContent = age;
    }

}


// ========================================
// LOAD SECTION
// ========================================

async function loadSection(containerId, file) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return false;
    }

    try {

        const response =
            await fetch(file);

        if (!response.ok) {
            throw new Error(
                `Failed to load ${file}`
            );
        }

        container.innerHTML =
            await response.text();

        return true;

    }

    catch (error) {

        console.error(error);

        container.innerHTML = `
            <p style="
                color:#6c7086;
                font-size:12px;
            ">
                failed to load ${file}
            </p>
        `;

        return false;

    }

}


// ========================================
// INIT WEBSITE
// ========================================

async function initWebsite() {

    updateAge();

    const watchlistLoaded =
        await loadSection(
            "watchlist-container",
            "sections/watchlist.html"
        );

    if (
        watchlistLoaded &&
        typeof initWatchlist === "function"
    ) {

        initWatchlist();

    }

    initProjectToggle();

}


// ========================================
// PROJECT TOGGLE
// ========================================

function initProjectToggle() {

    const projectToggle =
        document.getElementById(
            "projectToggle"
        );

    const projectsCollapse =
        document.getElementById(
            "projectsCollapse"
        );

    const projectArrow =
        document.getElementById(
            "projectArrow"
        );

    if (
        !projectToggle ||
        !projectsCollapse ||
        !projectArrow
    ) {
        return;
    }

    projectToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                projectsCollapse.classList.toggle(
                    "open"
                );

            projectArrow.textContent =
                isOpen ? "▾" : "▸";

        }
    );

}


// ========================================
// START WEBSITE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    initWebsite
);
