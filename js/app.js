/* =====================================================
   PIXEL OS v2
   APP.JS
   PART 1A
===================================================== */

"use strict";

/* =====================================================
   APP
===================================================== */

const App = {

    init(){

    Clock.init();

    Age.init();

    Boot.init();

    Watchlist.init();

    Achievement.init();

    Panel.init();

    Inventory.init();

    Reveal.init();

    Shortcut.init();

    Welcome.init();

    Cat.init();

    Secret.init();

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

        if (!this.element) return;

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

            document.getElementById(

                "age"

            );

        if (!element) return;

        const today =

            new Date();

        let age =

            today.getFullYear()

            - this.year;

        const birthday =

            new Date(

                today.getFullYear(),

                this.month,

                this.day

            );

        if (

            today < birthday

        ) {

            age--;

        }

        element.textContent = age;

    }

};




/* =====================================================
   BOOT
===================================================== */

const Boot = {

    screen: null,

    bar: null,

    text: null,

    progress: 0,

    messages: [

        "Loading Assets...",

        "Loading Portfolio...",

        "Loading Projects...",

        "Loading Playlist...",

        "Loading Watch Log...",

        "Welcome."

    ],

    init() {

        this.screen =
            document.getElementById("bootScreen");

        this.bar =
            document.getElementById("bootBar");

        this.text =
            document.getElementById("bootText");

        if (!this.screen) return;

        this.start();

    },



    start() {

        let step = 0;

        const timer = setInterval(() => {

            this.progress = Math.min(

                this.progress + 20,

                100

            );

            if (this.bar) {

                this.bar.style.width =

                    this.progress + "%";

            }

            if (

                this.text &&

                this.messages[step]

            ) {

                this.text.textContent =

                    this.messages[step];

            }

            step++;

            if (this.progress >= 100) {

                clearInterval(timer);

                setTimeout(() => {

                    this.finish();

                }, 500);

            }

        }, 400);

    },



    finish() {

        this.screen.classList.add(

            "hide"

        );

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

            if (!response.ok) {

                throw new Error();

            }

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

    key: "pixel-achievement",

    init() {

        this.element =

            document.getElementById(

                "achievement"

            );

    },



    unlock(title) {

        if (!this.element) return;

        const cache =

            JSON.parse(

                localStorage.getItem(

                    this.key

                ) || "[]"

            );

        if (

            cache.includes(title)

        ) {

            return;

        }

        cache.push(title);

        localStorage.setItem(

            this.key,

            JSON.stringify(cache)

        );

        const text =

            this.element.querySelector("p");

        if (text) {

            text.textContent =

                title;

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

document.addEventListener(

    "DOMContentLoaded",

    () => {

       init(){

    Clock.init();

    Age.init();

    Boot.init();

    Watchlist.init();

    Achievement.init();

    Panel.init();

    Inventory.init();

    Reveal.init();

    Shortcut.init();

    Welcome.init();

}

        Watchlist.init();

        Achievement.init();

    }

);




/* =====================================================
   PANEL
===================================================== */

const Panel = {

    items: [],

    init() {

        this.items =
            document.querySelectorAll(".panel");

        this.items.forEach((panel, index) => {

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

            panel.addEventListener(

                "mouseenter",

                () => {

                    panel.classList.add(

                        "panel-hover"

                    );

                }

            );

            panel.addEventListener(

                "mouseleave",

                () => {

                    panel.classList.remove(

                        "panel-hover"

                    );

                }

            );

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

                e => {

                    const title =

                        card.querySelector(

                            "h3"

                        );

                    if (title) {

                        Achievement.unlock(

                            "Opened " +

                            title.textContent

                        );

                    }

                }

            );

        });

    }

};



/* =====================================================
   PANEL REVEAL
===================================================== */

const Reveal = {

    observer: null,

    init() {

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

                        }

                    });

                },

                {

                    threshold:0.15

                }

            );

        document

            .querySelectorAll(

                ".panel"

            )

            .forEach(panel => {

                this.observer.observe(

                    panel

                );

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

            e => {

                const key =

                    e.key.toLowerCase();

                switch (key) {

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
   STORAGE
===================================================== */

const Storage = {

    key:"pixel-os",

    get(name,fallback=null){

        const data=

            JSON.parse(

                localStorage.getItem(

                    this.key

                )||"{}"

            );

        return data[name] ?? fallback;

    },



    set(name,value){

        const data=

            JSON.parse(

                localStorage.getItem(

                    this.key

                )||"{}"

            );

        data[name]=value;

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

    init(){

        if(

            Storage.get(

                "visited",

                false

            )

        ){

            return;

        }

        Storage.set(

            "visited",

            true

        );

        setTimeout(()=>{

            Achievement.unlock(

                "Welcome to Pixel OS"

            );

        },1200);

    }

};

/* =====================================================
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

        this.cat.classList.add(

            "walk"

        );

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

                once: true

            }

        );

    }

};



/* =====================================================
   SECRET
===================================================== */

const Secret = {

    input: "",

    keyword: "pixel",

    init() {

        document.addEventListener(

            "keydown",

            e => {

                this.input +=

                    e.key.toLowerCase();

                if (

                    this.input.length >

                    this.keyword.length

                ) {

                    this.input =

                        this.input.slice(

                            -this.keyword.length

                        );

                }

                if (

                    this.input ===

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



    createStar() {

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

    },



    createStars(total = 40) {

        for (

            let i = 0;

            i < total;

            i++

        ) {

            this.createStar();

        }

    }

};



/* =====================================================
   PIXEL OS
===================================================== */

const PixelOS = {

    init() {

        Utils.createStars(

            40

        );

    }

};



/* =====================================================
   WINDOW EVENTS
===================================================== */

window.addEventListener(

    "resize",

    () => {

        document

            .querySelectorAll(

                ".star"

            )

            .forEach(

                star => star.remove()

            );

        Utils.createStars(

            40

        );

    }

);



/* =====================================================
   UPDATE APP
===================================================== */

App.init = function(){

    Clock.init();

    Age.init();

    Boot.init();

    Watchlist.init();

    Achievement.init();

    Panel.init();

    Inventory.init();

    Reveal.init();

    Shortcut.init();

    Welcome.init();

    Cat.init();

    Secret.init();

    PixelOS.init();

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
