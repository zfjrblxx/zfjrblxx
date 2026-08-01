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
// CAT WALK
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const cat =
        document.getElementById("catSecret");

    const walk =
        document.getElementById("catWalk");

    if (!cat || !walk) return;

    cat.addEventListener("click", () => {

        walk.classList.remove("walk");

        void walk.offsetWidth;

        walk.classList.add("walk");

        walk.addEventListener("animationend", () => {

            walk.classList.remove("walk");

        }, { once: true });

    });

});

// ========================================
// CAT WALK - KEYFRAME
// ========================================

const cat =
document.getElementById("catSecret");

const walk =
document.getElementById("catWalk");

const terminal =
document.querySelector(".terminal");

cat.addEventListener("click",()=>{

    walk.style.display="block";

    walk.style.transition="none";

    walk.style.transform="translateX(0)";

    requestAnimationFrame(()=>{

        walk.style.transition="transform 8s linear";

        walk.style.transform=
            `translateX(-${terminal.clientWidth-150}px)`;

    });

});
