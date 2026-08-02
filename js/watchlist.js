/* =====================================================
   PIXEL OS
   WATCHLIST.JS
   PART 1
===================================================== */

"use strict";

/* =====================================================
   WATCHLIST
===================================================== */

const Watchlist = {

    folder: null,

    overlay: null,

    close: null,

    content: null,

    counter: null,

    total: null,

    loaded: false,

    items: [],



    init() {

        this.folder =
            document.getElementById(
                "watchlistFolder"
            );

        this.overlay =
            document.getElementById(
                "watchlistOverlay"
            );

        this.close =
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

        if (

            !this.folder ||

            !this.overlay ||

            !this.close ||

            !this.content

        ){

            return;

        }

        this.events();

        this.fetch();

    },



/* =====================================================
   FETCH
===================================================== */

    async fetch(){

        try{

            const response =

                await fetch(

                    "sections/watchlist-data.html"

                );

            if(

                !response.ok

            ){

                throw new Error();

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

                .map(item=>

                    item.textContent.trim()

                )

                .filter(Boolean);

            this.loaded = true;

            this.updateCount();

        }

        catch(error){

            console.error(error);

        }

    },



/* =====================================================
   COUNT
===================================================== */

    updateCount(){

        if(this.counter){

            this.counter.textContent =

                this.items.length;

        }

        if(this.total){

            this.total.textContent =

                `${this.items.length} Items`;

        }

    },



/* =====================================================
   OPEN
===================================================== */

    open(){

        this.overlay.classList.add(

            "show"

        );

        document.body.style.overflow =

            "hidden";

        this.render();

    },



/* =====================================================
   CLOSE
===================================================== */

    closeWindow(){

        this.overlay.classList.remove(

            "show"

        );

        document.body.style.overflow = "";

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

        const items =

            [...this.items];

        items.sort(

            (a, b) =>

                a.localeCompare(

                    b,

                    undefined,

                    {

                        sensitivity: "base"

                    }

                )

        );

        const groups = {};

        items.forEach(title => {

            let letter =

                title.charAt(0)

                .toUpperCase();

            if (

                !/[A-Z]/.test(letter)

            ) {

                letter = "#";

            }

            if (

                !groups[letter]

            ) {

                groups[letter] = [];

            }

            groups[letter].push(title);

        });

        let html = `

<div class="watch-letters">

`;



        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

        .split("")

        .forEach(letter => {

            if (

                groups[letter]

            ) {

                html += `

<button
class="watch-letter"
data-letter="${letter}">

${letter}

</button>

`;

            }

            else{

                html += `

<span
class="watch-letter disabled">

${letter}

</span>

`;

            }

        });

        html += `

</div>

<div class="watch-groups">

`;



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



            groups[letter]

            .forEach(title => {

                html += `

<div class="watch-card">

<div class="watch-icon">

🎬

</div>

<div class="watch-title">

${title}

</div>

</div>

`;

            });

            html += `

</div>

`;

        });

        html += `

</div>

`;

        this.content.innerHTML = html;

        this.bindLetters();

    },



/* =====================================================
   LETTER
===================================================== */

    bindLetters(){

        this.content

        .querySelectorAll(

            ".watch-letter"

        )

        .forEach(button=>{

            if(

                button.classList.contains(

                    "disabled"

                )

            ){

                return;

            }

            button.addEventListener(

                "click",

                ()=>{

                    const target=

                        document.getElementById(

                            "group-"+

                            button.dataset.letter

                        );

                    if(target){

                        target.scrollIntoView({

                            behavior:"smooth",

                            block:"start"

                        });

                    }

                }

            );

        });

    },


    /* =====================================================
   SEARCH
===================================================== */

    search(keyword) {

        const cards =

            this.content.querySelectorAll(

                ".watch-card"

            );

        keyword =

            keyword.toLowerCase();

        cards.forEach(card => {

            const title =

                card.querySelector(

                    ".watch-title"

                ).textContent.toLowerCase();

            card.style.display =

                title.includes(keyword)

                ? "flex"

                : "none";

        });

    },



/* =====================================================
   EVENTS
===================================================== */

    events() {

        this.folder.addEventListener(

            "click",

            () => {

                this.open();

            }

        );

        this.close.addEventListener(

            "click",

            () => {

                this.closeWindow();

            }

        );

        this.overlay.addEventListener(

            "click",

            event => {

                if (

                    event.target ===

                    this.overlay

                ) {

                    this.closeWindow();

                }

            }

        );

        document.addEventListener(

            "keydown",

            event => {

                if (

                    event.key === "Escape" &&

                    this.overlay.classList.contains(

                        "show"

                    )

                ) {

                    this.closeWindow();

                }

            }

        );

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
