// ========================================
// AUTO AGE
// ========================================

const BIRTH_YEAR = 2000;
const BIRTH_MONTH = 6; // July (January = 0)
const BIRTH_DAY = 28;

function updateAge() {

    const today = new Date();

    let age =
        today.getFullYear() - BIRTH_YEAR;

    const birthdayThisYear =
        new Date(
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

async function loadSection(
    containerId,
    file
) {

    const container =
        document.getElementById(
            containerId
        );

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
                Failed to load ${file}
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

    initAccordion();

}


// ========================================
// ACCORDION
// ========================================

function initAccordion() {

    const accordions =
        document.querySelectorAll(
            ".command-toggle"
        );

    accordions.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const collapse =
                    button.nextElementSibling;

                if (!collapse) {
                    return;
                }

                const arrow =
                    button.querySelector("span");

                const isOpen =
                    collapse.classList.toggle(
                        "open"
                    );

                if (arrow) {

                    arrow.textContent =
                        isOpen
                            ? "▾"
                            : "▸";

                }

            }
        );

    });

}


// ========================================
// START WEBSITE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initWebsite();

    }
);


// ========================================
// MEOW
// ========================================


const cat =
    document.getElementById("catSecret");

if(cat){

    cat.addEventListener("click",()=>{

        alert(
`🐱 Meow!

Kamu menemukan easter egg!

Terima kasih sudah mengunjungi portfolio-ku.`
        );

    });

}
