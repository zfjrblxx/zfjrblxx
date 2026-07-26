function initWatchlist() {

    // ========================================
    // ELEMENT
    // ========================================

    const folder =
        document.getElementById(
            "watchlistFolder"
        );

    const overlay =
        document.getElementById(
            "watchlistOverlay"
        );

    const closeButton =
        document.getElementById(
            "closeWatchlist"
        );

    const content =
        document.getElementById(
            "watchlistContent"
        );

    const count =
        document.getElementById(
            "watchlistCount"
        );


    if (
        !folder ||
        !overlay ||
        !closeButton ||
        !content
    ) {
        return;
    }


    // ========================================
    // LOAD DATA
    // ========================================

    async function loadWatchlist() {

        try {

            const response = await fetch(
                "sections/watchlist-data.html"
            );


            if (!response.ok) {

                throw new Error(
                    "Watchlist gagal dimuat"
                );

            }


            const html =
                await response.text();


            content.innerHTML = html;


            // HITUNG JUMLAH ITEM

            const items =
                content.querySelectorAll("p");


            if (count) {

                count.textContent =
                    items.length + " items";

            }


        } catch (error) {

            console.error(error);


            content.innerHTML = `
                <p class="watchlist-loading">
                    &gt; failed to load watchlist
                </p>
            `;

        }

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


    // KLIK AREA LUAR

    overlay.addEventListener(
        "click",
        (event) => {

            if (
                event.target === overlay
            ) {

                closeWatchlist();

            }

        }
    );


    // ESC

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                overlay.classList.contains(
                    "show"
                )
            ) {

                closeWatchlist();

            }

        }
    );

}