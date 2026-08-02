/* =====================================================
   PIXEL WATCHLIST
   Part 1
===================================================== */

"use strict";

const Watchlist = {

    folder: null,
    overlay: null,
    closeButton: null,
    content: null,
    counter: null,
    total: null,
    search: null,
    letters: null,

    items: [],
    loaded: false,



/* =====================================================
   INIT
===================================================== */

    init() {

        this.folder =
            document.getElementById(
                "watchlistFolder"
            );

        this.overlay =
            document.getElementById(
                "watchlistOverlay"
            );

        this.closeButton =
            document.getElementById(
                "closeWatchlist"
            );

        this.content =
            document.getElementById(
                "watchlistContent"
            );

        this.counter =
            document.getElementById(
                "watchCount"
            );

        this.total =
            document.getElementById(
                "watchlistCount"
            );

        this.search =
            document.getElementById(
                "watchSearch"
            );

        this.letters =
            document.getElementById(
                "watchLetters"
            );

        if (
            !this.folder ||
            !this.overlay ||
            !this.closeButton ||
            !this.content
        ) {
            return;
        }

        this.bindEvents();

        this.load();

    },



/* =====================================================
   LOAD DATA
===================================================== */

    async load() {

        try {

            const response =
                await fetch(
                    "sections/watchlist-data.html"
                );

            if (!response.ok) {

                throw new Error(
                    "Failed to load watchlist"
                );

            }

            const html =
                await response.text();

            const parser =
                new DOMParser();

            const doc =
                parser.parseFromString(
                    html,
                    "text/html"
                );

            this.items =
                [
                    ...doc.querySelectorAll("p")
                ]
                .map(item =>
                    item.textContent.trim()
                )
                .filter(Boolean);

            this.loaded = true;

            this.updateCounter();

        }

        catch (error) {

            console.error(error);

            this.content.innerHTML =

                `
                <div class="watch-loading">

                    Failed to load watchlist.

                </div>
                `;

        }

    },



/* =====================================================
   COUNTER
===================================================== */

    updateCounter() {

        if (this.counter) {

            this.counter.textContent =
                this.items.length;

        }

        if (this.total) {

            this.total.textContent =
                `${this.items.length} Items`;

        }

    },


/* =====================================================
   OPEN
===================================================== */

open() {

    this.overlay.classList.add("show");

    this.render();

},



/* =====================================================
   CLOSE
===================================================== */

close() {

    this.overlay.classList.remove("show");

},


   /* =====================================================
   RENDER
===================================================== */

    render() {

        if (!this.loaded) {

            this.content.innerHTML = `
                <div class="watch-loading">
                    Loading...
                </div>
            `;
            return;
        }

        const list = [...this.items];

        list.sort((a, b) =>
            a.localeCompare(
                b,
                undefined,
                {
                    sensitivity: "base"
                }
            )
        );

        const groups = {};

        list.forEach(title => {

            let letter =
                title.charAt(0).toUpperCase();

            if (!/[A-Z]/.test(letter)) {

                letter = "#";

            }

            if (!groups[letter]) {

                groups[letter] = [];

            }

            groups[letter].push(title);

        });

        this.renderLetters(groups);

        let html = "";

        Object.keys(groups)
            .sort()
            .forEach(letter => {

                html += `
                    <div
                        class="watch-group"
                        id="group-${letter}"
                    >

                        <div class="group-title">

                            ${letter}

                        </div>
                `;

                groups[letter].forEach(title => {

                    html += `
                        <div
                            class="watch-card"
                            data-title="${title.toLowerCase()}"
                        >

                            <div class="watch-icon">

                                🎬

                            </div>

                            <div class="watch-name">

    ${title}

</div>

                        </div>
                    `;

                });

                html += `
                    </div>
                `;

            });

        this.content.innerHTML = html;

        this.bindLetters();

    },



/* =====================================================
   LETTERS
===================================================== */

    renderLetters(groups) {

        if (!this.letters) {

            return;

        }

        let html = "";

        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            .split("")
            .forEach(letter => {

                if (groups[letter]) {

                    html += `
                        <button
                            class="watch-letter"
                            data-letter="${letter}"
                        >

                            ${letter}

                        </button>
                    `;

                }

                else {

                    html += `
                        <span
                            class="watch-letter disabled"
                        >

                            ${letter}

                        </span>
                    `;

                }

            });

        this.letters.innerHTML = html;

    },



/* =====================================================
   LETTER EVENT
===================================================== */

bindLetters() {

    this.letters
        .querySelectorAll(".watch-letter[data-letter]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const target =
                    document.getElementById(
                        "group-" + button.dataset.letter
                    );

                if (target) {

                    this.content.scrollTo({

                        top: target.offsetTop - 10,

                        behavior: "smooth"

                    });

                }

            });

        });

},



/* =====================================================
   SEARCH
===================================================== */

    filter(keyword) {

        keyword =
            keyword.toLowerCase();

        this.content
            .querySelectorAll(
                ".watch-card"
            )
            .forEach(card => {

                const title =
                    card.dataset.title;

                card.style.display =
                    title.includes(keyword)
                    ? "flex"
                    : "none";

            });

    },


   /* =====================================================
   EVENTS
===================================================== */

    bindEvents() {

        this.folder.addEventListener(

            "click",

            () => {

                this.open();

            }

        );



        this.closeButton.addEventListener(

            "click",

            () => {

                this.close();

            }

        );



        this.overlay.addEventListener(

            "click",

            event => {

                if (

                    event.target === this.overlay

                ) {

                    this.close();

                }

            }

        );



        document.addEventListener(

            "keydown",

            event => {

                if (

                    event.key === "Escape" &&

                    this.overlay.classList.contains("show")

                ) {

                    this.close();

                }

            }

        );



        if (this.search) {

            this.search.addEventListener(

                "input",

                event => {

                    this.filter(

                        event.target.value

                    );

                }

            );

        }

    }

};



/* =====================================================
   START
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Watchlist.init();

    }

);
