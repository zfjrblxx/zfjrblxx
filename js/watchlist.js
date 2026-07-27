function initWatchlist() {

    const folder =
        document.getElementById("watchlistFolder");

    const overlay =
        document.getElementById("watchlistOverlay");

    const closeButton =
        document.getElementById("closeWatchlist");

    const content =
        document.getElementById("watchlistContent");

    const count =
        document.getElementById("watchlistCount");

    const watchCount =
        document.getElementById("watchCount");


    if (
        !folder ||
        !overlay ||
        !closeButton ||
        !content
    ) {
        return;
    }


    // ========================================
    // WATCHLIST DATA
    // ========================================

    let watchlistItems = [];
    let watchlistLoaded = false;


    // ========================================
    // FETCH WATCHLIST DATA
    // ========================================

    async function fetchWatchlistData() {

        try {

            const response = await fetch(
                "sections/watchlist-data.html"
            );

            if (!response.ok) {
                throw new Error(
                    "Gagal memuat watchlist"
                );
            }

            const html = await response.text();


            // ========================================
            // PARSE DATA
            // ========================================

            const parser =
                new DOMParser();

            const doc =
                parser.parseFromString(
                    html,
                    "text/html"
                );


            watchlistItems = [
                ...doc.querySelectorAll("p")
            ]
                .map(item =>
                    item.textContent.trim()
                )
                .filter(Boolean);


            // ========================================
            // UPDATE COUNT
            // ========================================

            if (watchCount) {
                watchCount.textContent =
                    watchlistItems.length;
            }

            if (count) {
                count.textContent =
                    `${watchlistItems.length} items`;
            }


            watchlistLoaded = true;

            return watchlistItems;


        } catch (error) {

            console.error(error);

            return [];

        }

    }


    // ========================================
    // LOAD WATCHLIST
    // ========================================

    async function loadWatchlist() {

        content.innerHTML = `
            <p class="watchlist-loading">
                &gt; loading...
            </p>
        `;


        // Kalau data belum pernah dimuat

        if (!watchlistLoaded) {
            await fetchWatchlistData();
        }


        const items = [...watchlistItems];


        if (!items.length) {

            content.innerHTML = `
                <p class="watchlist-loading">
                    &gt; failed to load watchlist
                </p>
            `;

            return;
        }


        // ========================================
        // URUTKAN A-Z
        // ========================================

        items.sort((a, b) =>
            a.localeCompare(
                b,
                undefined,
                {
                    sensitivity: "base"
                }
            )
        );


        // ========================================
        // KELOMPOKKAN BERDASARKAN HURUF
        // ========================================

        const groups = {};


        items.forEach(title => {

            let letter =
                title.charAt(0).toUpperCase();


            // Kalau bukan A-Z

            if (!/[A-Z]/.test(letter)) {
                letter = "#";
            }


            if (!groups[letter]) {
                groups[letter] = [];
            }


            groups[letter].push(title);

        });


        // ========================================
        // NAVIGATION A-Z
        // ========================================

        let output = `
            <div class="watchlist-az">
        `;


        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            .split("")
            .forEach(letter => {

                if (groups[letter]) {

                    output += `
                        <button
                            class="az-letter active"
                            data-letter="${letter}"
                        >
                            ${letter}
                        </button>
                    `;

                } else {

                    output += `
                        <span class="az-letter disabled">
                            ${letter}
                        </span>
                    `;

                }

            });


        output += `</div>`;


        // ========================================
        // LIST
        // ========================================

        Object.keys(groups)
            .sort()
            .forEach(letter => {

                output += `
                    <div
                        class="watch-group"
                        id="watch-${letter}"
                    >

                        <div class="watch-letter">
                            ${letter}
                        </div>

                        <div class="watch-items">
                `;


                groups[letter]
                    .forEach(title => {

                        output += `
                            <p>${title}</p>
                        `;

                    });


                output += `
                        </div>
                    </div>
                `;

            });


        content.innerHTML = output;


        // ========================================
        // COUNT
        // ========================================

        if (count) {

            count.textContent =
                `${items.length} items`;

        }


        if (watchCount) {

            watchCount.textContent =
                items.length;

        }


        // ========================================
        // A-Z CLICK
        // ========================================

        content
            .querySelectorAll(
                ".az-letter.active"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const letter =
                            button.dataset.letter;

                        const target =
                            document.getElementById(
                                `watch-${letter}`
                            );


                        if (target) {

                            target.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    }
                );

            });

    }


    // ========================================
    // OPEN
    // ========================================

    function openWatchlist() {

        overlay.classList.add("show");

        document.body.style.overflow =
            "hidden";

        loadWatchlist();

    }


    // ========================================
    // CLOSE
    // ========================================

    function closeWatchlist() {

        overlay.classList.remove("show");

        document.body.style.overflow = "";

    }


    // ========================================
    // EVENTS
    // ========================================

    folder.addEventListener(
        "click",
        openWatchlist
    );


    closeButton.addEventListener(
        "click",
        closeWatchlist
    );


    overlay.addEventListener(
        "click",
        event => {

            if (event.target === overlay) {
                closeWatchlist();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                overlay.classList.contains("show")
            ) {

                closeWatchlist();

            }

        }
    );


    // ========================================
    // INITIAL COUNT
    // ========================================

    fetchWatchlistData();

}
