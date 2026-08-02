/* =====================================================
   Pixel OS v2
   app.js
   Part 1
===================================================== */

"use strict";

/* =====================================================
   APP
===================================================== */

const App = {

    init() {

        Clock.init();

        Age.init();

        Boot.init();

        Achievement.init();

        Watchlist.init();

    }

};



/* =====================================================
   CLOCK
===================================================== */

const Clock = {

    element: null,

    init() {

        this.element = document.getElementById("clock");

        this.update();

        setInterval(() => {

            this.update();

        }, 1000);

    },

    update() {

        if (!this.element) return;

        const now = new Date();

        const hour =
            String(now.getHours()).padStart(2, "0");

        const minute =
            String(now.getMinutes()).padStart(2, "0");

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

        const age =
            document.getElementById("age");

        if (!age) return;

        const today = new Date();

        let current =
            today.getFullYear() - this.year;

        const birthday =
            new Date(

                today.getFullYear(),

                this.month,

                this.day

            );

        if (today < birthday) {

            current--;

        }

        age.textContent = current;

    }

};



/* =====================================================
   BOOT
===================================================== */

const Boot = {

    progress: 0,

    init() {

        const screen =
            document.getElementById("bootScreen");

        const bar =
            document.getElementById("bootBar");

        const text =
            document.getElementById("bootText");

        if (!screen) return;

        const steps = [

            "Loading Assets...",

            "Loading Portfolio...",

            "Loading Projects...",

            "Loading Music...",

            "Loading Watch Log...",

            "Ready."

        ];

        let index = 0;

        const timer =
            setInterval(() => {

                this.progress += 20;

                if (bar) {

                    bar.style.width =
                        this.progress + "%";

                }

                if (

                    text &&

                    steps[index]

                ) {

                    text.textContent =
                        steps[index];

                }

                index++;

                if (

                    this.progress >= 100

                ) {

                    clearInterval(timer);

                    setTimeout(() => {

                        screen.classList.add("hide");

                    }, 600);

                }

            }, 400);

    }

};



/* =====================================================
   WATCHLIST
===================================================== */

const Watchlist = {

    async init() {

        const container =
            document.getElementById(

                "watchlist-container"

            );

        if (!container) return;

        try {

            const response =
                await fetch(

                    "sections/watchlist.html"

                );

            container.innerHTML =
                await response.text();

        }

        catch {

            container.innerHTML =
                "<p>Failed to load watch log.</p>";

        }

    }

};



/* =====================================================
   ACHIEVEMENT
===================================================== */

const Achievement = {

    element: null,

    storage: "pixel-achievements",

    init() {

        this.element =
            document.getElementById(

                "achievement"

            );

    },

    unlock(title) {

        if (!this.element) return;

        const list =
            JSON.parse(

                localStorage.getItem(

                    this.storage

                ) || "[]"

            );

        if (

            list.includes(title)

        ) {

            return;

        }

        list.push(title);

        localStorage.setItem(

            this.storage,

            JSON.stringify(list)

        );

        this.element.querySelector("p").textContent =
            title;

        this.element.classList.remove("hidden");

        this.element.classList.add("show");

        setTimeout(() => {

            this.element.classList.remove("show");

            this.element.classList.add("hidden");

        }, 3500);

    }

};



/* =====================================================
   START
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        App.init();

    }

);
