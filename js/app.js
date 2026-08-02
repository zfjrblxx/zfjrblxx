/* =====================================================
   Pixel OS v2
   app.js
   Part 1A
===================================================== */

"use strict";


// ========================================
// MUSIC PLAYER
// ========================================

const bootScreen = document.getElementById("bootScreen");

const musicButton =
document.getElementById(
    "musicToggle"
);

if(bgMusic && musicButton){

    bgMusic.volume = 0.30;

    musicButton.addEventListener(

        "click",

        ()=>{

            if(bgMusic.paused){

                bgMusic.play();

                musicButton.textContent =
                    "⏸ PAUSE";

                musicButton.classList.add(
                    "playing"
                );

            }

            else{

                bgMusic.pause();

                musicButton.textContent =
                    "▶ MUSIC";

                musicButton.classList.remove(
                    "playing"
                );

            }

        }

    );

}
/* =====================================================
   BOOT
===================================================== */

const Boot = {

    screen: null,

    bar: null,

    text: null,

    percent: 0,

    messages: [

        "Loading Pixel OS...",

        "Loading Portfolio...",

        "Loading Projects...",

        "Loading Playlist...",

        "Loading Watch Log...",

        "Welcome."

    ],

    init() {

        this.screen =

            document.getElementById(

                "bootScreen"

            );

        this.bar =

            document.getElementById(

                "bootBar"

            );

        this.text =

            document.getElementById(

                "bootText"

            );

        if (!this.screen) {

            return;

        }

        this.start();

    },



    start() {

        let index = 0;

        const timer = setInterval(() => {

            this.percent = Math.min(

                this.percent + 20,

                100

            );

            if (this.bar) {

                this.bar.style.width =

                    this.percent + "%";

            }

            if (

                this.text &&

                this.messages[index]

            ) {

                this.text.textContent =

                    this.messages[index];

            }

            index++;

            if (

                this.percent >= 100

            ) {

                clearInterval(timer);

                setTimeout(() => {

                    this.finish();

                }, 500);

            }

        }, 350);

    },



    finish() {

        this.screen.classList.add(

            "hide"

        );

    }

};



/* =====================================================
   CLOCK
===================================================== */

const Clock = {

    element: null,

    timer: null,

    init() {

        this.element =

            document.getElementById(

                "clock"

            );

        if (!this.element) {

            return;

        }

        this.update();

        this.timer = setInterval(

            () => {

                this.update();

            },

            1000

        );

    },



    update() {

        const now =

            new Date();

        const hour =

            String(

                now.getHours()

            ).padStart(

                2,

                "0"

            );

        const minute =

            String(

                now.getMinutes()

            ).padStart(

                2,

                "0"

            );

        this.element.textContent =

            `${hour}:${minute}`;

    }

};

/* =====================================================
   AGE
===================================================== */

const Age = {

    year: 2000,

    month: 6,

    day: 28,

    init() {

        const element =
            document.getElementById("age");

        if (!element) return;

        const today = new Date();

        let age =
            today.getFullYear() - this.year;

        const birthday = new Date(

            today.getFullYear(),

            this.month,

            this.day

        );

        if (today < birthday) {

            age--;

        }

        element.textContent = age;

    }

};





/* =====================================================
   ACHIEVEMENT
===================================================== */

const Achievement = {

    element: null,

    storage: "pixel-achievement",

    init() {

        this.element =

            document.getElementById(

                "achievement"

            );

    },



    unlock(title) {

        if (!this.element) {

            return;

        }

        const cache = JSON.parse(

            localStorage.getItem(

                this.storage

            ) || "[]"

        );

        if (

            cache.includes(title)

        ) {

            return;

        }

        cache.push(title);

        localStorage.setItem(

            this.storage,

            JSON.stringify(cache)

        );

        const text =

            this.element.querySelector("p");

        if (text) {

            text.textContent = title;

        }

        this.element.classList.remove(

            "hidden"

        );

        this.element.classList.add(

            "show"

        );

        setTimeout(() => {

            this.element.classList.remove(

                "show"

            );

            this.element.classList.add(

                "hidden"

            );

        }, 3000);

    }

};



/* =====================================================
   START
===================================================== */



/* =====================================================
   PANEL
===================================================== */

const Panel = {

    panels: [],

    init() {

        this.panels =

            document.querySelectorAll(

                ".panel"

            );

        this.panels.forEach(

            (panel, index) => {

                panel.style.opacity = "0";

                panel.style.transform =

                    "translateY(20px)";

                panel.style.transition =

                    "all .45s ease";

                setTimeout(() => {

                    panel.style.opacity = "1";

                    panel.style.transform =

                        "translateY(0)";

                }, index * 120);

            }

        );

    }

};



/* =====================================================
   INVENTORY
===================================================== */

const Inventory = {

    cards: [],

    init() {

        this.cards =

            document.querySelectorAll(

                ".inventory-card"

            );

        this.cards.forEach(card => {

            card.addEventListener(

                "mouseenter",

                () => {

                    card.classList.add(

                        "inventory-hover"

                    );

                }

            );

            card.addEventListener(

                "mouseleave",

                () => {

                    card.classList.remove(

                        "inventory-hover"

                    );

                }

            );

            card.addEventListener(

                "click",

                () => {

                    const title =

                        card.querySelector("h3");

                    if (!title) return;

                    Achievement.unlock(

                        "Opened " +

                        title.textContent

                    );

                }

            );

        });

    }

};



/* =====================================================
   REVEAL
===================================================== */

const Reveal = {

    observer: null,

    init() {

        if (

            !("IntersectionObserver" in window)

        ) {

            document

                .querySelectorAll(".panel")

                .forEach(panel => {

                    panel.classList.add(

                        "show-panel"

                    );

                });

            return;

        }

        this.observer =

            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (

                            entry.isIntersecting

                        ) {

                            entry.target.classList.add(

                                "show-panel"

                            );

                            this.observer.unobserve(

                                entry.target

                            );

                        }

                    });

                },

                {

                    threshold: 0.15

                }

            );

        document

            .querySelectorAll(".panel")

            .forEach(panel => {

                this.observer.observe(panel);

            });

    }

};

/* =====================================================
   SHORTCUT
===================================================== */

const Shortcut = {

    init() {

        document.addEventListener(

            "keydown",

            (event) => {

                const key = event.key.toLowerCase();

                switch (key) {

                    case "h":

                        document
                            .querySelector(".hero")
                            ?.scrollIntoView({
                                behavior: "smooth"
                            });

                    break;



                    case "i":

                        document
                            .querySelector(".inventory-grid")
                            ?.scrollIntoView({
                                behavior: "smooth"
                            });

                    break;



                    case "m":

                        document
                            .querySelector(".music-box")
                            ?.scrollIntoView({
                                behavior: "smooth"
                            });

                    break;



                    case "w":

                        document
                            .querySelector("#watchlist-container")
                            ?.scrollIntoView({
                                behavior: "smooth"
                            });

                    break;

                }

            }

        );

    }

};



/* =====================================================
   STORAGE
===================================================== */

const Storage = {

    key: "pixel-os-data",

    get(name, fallback = null) {

        const data = JSON.parse(

            localStorage.getItem(this.key) || "{}"

        );

        return data[name] ?? fallback;

    },



    set(name, value) {

        const data = JSON.parse(

            localStorage.getItem(this.key) || "{}"

        );

        data[name] = value;

        localStorage.setItem(

            this.key,

            JSON.stringify(data)

        );

    }

};



/* =====================================================
   WELCOME
===================================================== */

const Welcome = {

    init() {

        const visited =

            Storage.get(

                "visited",

                false

            );

        if (visited) {

            return;

        }

        Storage.set(

            "visited",

            true

        );

        setTimeout(() => {

            Achievement.unlock(

                "Welcome to Pixel OS"

            );

        }, 1000);

    }

};


/* =====================================================
   CAT
===================================================== */

const Cat = {

    button: null,

    element: null,

    walking: false,

    init() {

        this.button =
            document.getElementById(
                "catSecret"
            );

        this.element =
            document.getElementById(
                "catWalk"
            );

        if (
            !this.button ||
            !this.element
        ) {
            return;
        }

        this.button.addEventListener(

            "click",

            () => {

                this.walk();

            }

        );

    },



    walk() {

        if (this.walking) {

            return;

        }

        this.walking = true;

        this.element.classList.add(

            "walk"

        );

        Achievement.unlock(

            "Cat Lover"

        );

        this.element.addEventListener(

            "animationend",

            () => {

                this.walking = false;

                this.element.classList.remove(

                    "walk"

                );

            },

            {

                once: true

            }

        );

    }

};



/* =====================================================
   SECRET
===================================================== */

const Secret = {

    buffer: "",

    keyword: "pixel",

    init() {

        document.addEventListener(

            "keydown",

            event => {

                this.buffer +=

                    event.key.toLowerCase();

                if (

                    this.buffer.length >

                    this.keyword.length

                ) {

                    this.buffer =

                        this.buffer.slice(

                            -this.keyword.length

                        );

                }

                if (

                    this.buffer ===

                    this.keyword

                ) {

                    this.unlock();

                }

            }

        );

    },



    unlock() {

        document.body.classList.add(

            "developer-mode"

        );

        Achievement.unlock(

            "Developer Mode"

        );

    }

};

/* =====================================================
   UTILS
===================================================== */

const Utils = {

    random(min, max) {

        return Math.floor(

            Math.random() *

            (max - min + 1)

        ) + min;

    },



    createStars(total = 35) {

        document

            .querySelectorAll(".star")

            .forEach(

                star => star.remove()

            );

        for (

            let i = 0;

            i < total;

            i++

        ) {

            const star =

                document.createElement(

                    "div"

                );

            star.className =

                "star";

            star.style.left =

                this.random(

                    0,

                    window.innerWidth

                ) + "px";

            star.style.top =

                this.random(

                    0,

                    window.innerHeight

                ) + "px";

            star.style.animationDelay =

                Math.random() * 3 + "s";

            document.body.appendChild(

                star

            );

        }

    }

};



/* =====================================================
   PIXEL OS
===================================================== */

const PixelOS = {

    init() {

        Utils.createStars();

        window.addEventListener(

            "resize",

            () => {

                Utils.createStars();

            }

        );

    }

};



/* =====================================================
   UPDATE APP
===================================================== */

function initApp() {

    Boot.init();

    Clock.init();

    Age.init();

    Achievement.init();

    Panel.init();

    Inventory.init();

    Reveal.init();

    Shortcut.init();

    Welcome.init();

    Cat.init();

    Secret.init();

    PixelOS.init();

}



/* =====================================================
   START
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initApp();

    }

);

// ========================================
// BOOT SCREEN
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const bootScreen = document.getElementById("bootScreen");
    const bgMusic = document.getElementById("bgMusic");

    if (!bootScreen) return;

    function enterPixelOS() {

        if (bgMusic) {

            bgMusic.volume = 0.30;

            bgMusic.play().catch(() => {});

        }

        bootScreen.classList.add("hide");

        setTimeout(() => {

            bootScreen.remove();

        }, 450);

        document.removeEventListener(
            "click",
            enterPixelOS
        );

    }

    document.addEventListener(
        "click",
        enterPixelOS,
        { once: true }
    );

});
