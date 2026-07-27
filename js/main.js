// ========================================
// AUTO AGE
// ========================================

const BIRTH_YEAR = 2000;
const BIRTH_MONTH = 6; // Juli (January = 0)
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

updateAge();


// ========================================
// LOAD SECTION
// ========================================

async function loadSection(containerId, file) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }

    try {

        const response =
            await fetch(file);

        if (!response.ok) {

            throw new Error(
                `Failed to load ${file}`
            );

        }

        const html =
            await response.text();

        container.innerHTML = html;

        return true;

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p style="
                color:#527b59;
                font-size:12px;
            ">
                > failed to load ${file}
            </p>
        `;

        return false;

    }

}


// ========================================
// LOAD WEBSITE COMPONENTS
// ========================================

async function initWebsite() {


    // ========================================
    // SECRET NOTE
    // ========================================

    const secretLoaded = await loadSection(
        "secret-note-container",
        "sections/secret-note.html"
    );

    if (
        secretLoaded &&
        typeof initSecretNote === "function"
    ) {

        initSecretNote();

    }


    // ========================================
    // ESCAPE GAME
    // ========================================

    const escapeLoaded = await loadSection(
        "escape-container",
        "sections/escape.html"
    );

    if (
        escapeLoaded &&
        typeof initEscapeGame === "function"
    ) {

        initEscapeGame();

    }


    // ========================================
    // DON'T CLICK GAME
    // ========================================

    const dontClickLoaded = await loadSection(
        "dont-click-container",
        "sections/dont-click.html"
    );

    if (
        dontClickLoaded &&
        typeof initDontClickGame === "function"
    ) {

        initDontClickGame();

    }


// ========================================
// WATCHLIST
// ========================================

const watchlistLoaded = await loadSection(
    "watchlist-container",
    "sections/watchlist.html"
);

if (
    watchlistLoaded &&
    typeof initWatchlist === "function"
) {

    initWatchlist();

}

// ========================================
// SHUTDOWN
// ========================================

const shutdownLoaded = await loadSection(
    "shutdown-container",
    "sections/shutdown.html"
);

if (
    shutdownLoaded &&
    typeof initShutdown === "function"
) {

    initShutdown();

}

}


// ========================================
// START WEBSITE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    initWebsite
);


// ===============================
// WATCH LOG COUNT
// ===============================

const totalWatch = document.querySelectorAll(".movie").length;
const watchCount = document.getElementById("watchCount");

if (watchCount) {
    watchCount.textContent = totalWatch;
}
