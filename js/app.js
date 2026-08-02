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

/* =====================================================
   PANEL
===================================================== */

const Panel = {

    init() {

        const panels =
            document.querySelectorAll(".panel");

        panels.forEach((panel, index) => {

            panel.style.opacity = "0";

            panel.style.transform =
                "translateY(25px)";

            panel.style.transition =
                "all .45s ease";

            setTimeout(() => {

                panel.style.opacity = "1";

                panel.style.transform =
                    "translateY(0)";

            }, index * 150);

        });

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

                    this.hover(card);

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    this.leave(card);

                }
            );

            card.addEventListener(
                "click",
                () => {

                    this.open(card);

                }
            );

        });

    },



    hover(card){

        card.classList.add("hover");

    },



    leave(card){

        card.classList.remove("hover");

    },



    open(card){

        const title =
            card.querySelector("h3");

        if(!title) return;

        Achievement.unlock(

            "Opened " +

            title.textContent

        );

    }

};



/* =====================================================
   PANEL EFFECT
===================================================== */

const PanelEffect = {

    init(){

        document

            .querySelectorAll(

                ".panel"

            )

            .forEach(panel=>{

                panel.addEventListener(

                    "mouseenter",

                    ()=>{

                        panel.style.borderColor=

                            "var(--yellow)";

                    }

                );



                panel.addEventListener(

                    "mouseleave",

                    ()=>{

                        panel.style.borderColor=

                            "var(--border)";

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

        this.observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

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

                threshold:0.15

            }

        );

        document

            .querySelectorAll(".panel")

            .forEach(panel=>{

                this.observer.observe(panel);

            });

    }

};



/* =====================================================
   SHORTCUT
===================================================== */

const Shortcut = {

    init(){

        document.addEventListener(

            "keydown",

            e=>{

                const key =
                    e.key.toLowerCase();

                switch(key){

                    case "h":

                        document

                            .querySelector(".hero")

                            ?.scrollIntoView({

                                behavior:"smooth"

                            });

                    break;



                    case "i":

                        document

                            .querySelector(".inventory-grid")

                            ?.scrollIntoView({

                                behavior:"smooth"

                            });

                    break;



                    case "m":

                        document

                            .querySelector(".music-box")

                            ?.scrollIntoView({

                                behavior:"smooth"

                            });

                    break;



                    case "w":

                        document

                            .querySelector("#watchlist-container")

                            ?.scrollIntoView({

                                behavior:"smooth"

                            });

                    break;

                }

            }

        );

    }

};



/* =====================================================
   SMOOTH BUTTON
===================================================== */

const Scroll = {

    top(){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

};



/* =====================================================
   UPDATE APP
===================================================== */

/*
Di Part 1

Cari

App.init()

Lalu ubah menjadi

init(){

    Clock.init();

    Age.init();

    Boot.init();

    Achievement.init();

    Watchlist.init();

    Panel.init();

    Inventory.init();

    PanelEffect.init();

    Reveal.init();

    Shortcut.init();

}

*//* =====================================================
   CAT
===================================================== */

const Cat = {

    button: null,

    cat: null,

    walking: false,

    init() {

        this.button =
            document.getElementById(
                "catSecret"
            );

        this.cat =
            document.getElementById(
                "catWalk"
            );

        if (
            !this.button ||
            !this.cat
        ) return;

        this.button.addEventListener(
            "click",
            () => {

                this.walk();

            }
        );

    },



    walk() {

        if (this.walking) return;

        this.walking = true;

        this.cat.classList.add("walk");

        Achievement.unlock(
            "Cat Lover"
        );

        this.cat.addEventListener(

            "animationend",

            () => {

                this.cat.classList.remove(
                    "walk"
                );

                this.walking = false;

            },

            {

                once:true

            }

        );

    }

};



/* =====================================================
   SECRET CODE
===================================================== */

const Secret = {

    code:"",

    keyword:"pixel",

    init(){

        document.addEventListener(

            "keydown",

            e=>{

                this.code +=

                    e.key.toLowerCase();

                if(

                    this.code.length>

                    this.keyword.length

                ){

                    this.code=

                    this.code.slice(

                        -this.keyword.length

                    );

                }

                if(

                    this.code===

                    this.keyword

                ){

                    this.unlock();

                }

            }

        );

    },



    unlock(){

        document.body.classList.add(

            "developer-mode"

        );

        Achievement.unlock(

            "Developer Mode"

        );

    }

};

/* =====================================================
   STORAGE
===================================================== */

const Storage = {

    key: "pixel-os",

    save(name, value) {

        const data =
            JSON.parse(

                localStorage.getItem(

                    this.key

                ) || "{}"

            );

        data[name] = value;

        localStorage.setItem(

            this.key,

            JSON.stringify(data)

        );

    },



    get(name, fallback = null) {

        const data =
            JSON.parse(

                localStorage.getItem(

                    this.key

                ) || "{}"

            );

        return data[name] ?? fallback;

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

        if (visited) return;

        setTimeout(() => {

            Achievement.unlock(

                "Welcome to Pixel OS"

            );

        }, 1200);

        Storage.save(

            "visited",

            true

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



    sleep(ms) {

        return new Promise(resolve =>

            setTimeout(

                resolve,

                ms

            )

        );

    }

};



/* =====================================================
   UPDATE APP
===================================================== */

/*

Ganti App.init()

menjadi

init(){

    Clock.init();

    Age.init();

    Boot.init();

    Achievement.init();

    Watchlist.init();

    Panel.init();

    Inventory.init();

    PanelEffect.init();

    Reveal.init();

    Shortcut.init();

    Cat.init();

    Secret.init();

    Welcome.init();

}

*/



/* =====================================================
   START
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        App.init();

    }

);
