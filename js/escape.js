// ========================================
// ESCAPE GAME
// PUZZLE 01
// ========================================

function initEscapeGame() {

    const startEscape =
        document.getElementById("startEscape");

    const escapeScreen =
        document.getElementById("escapeScreen");

    const closeEscape =
        document.getElementById("closeEscape");

    const accessCode =
        document.getElementById("accessCode");

    const submitCode =
        document.getElementById("submitCode");

    const escapeStatus =
        document.getElementById("escapeStatus");


    if (
        !startEscape ||
        !escapeScreen ||
        !closeEscape ||
        !accessCode ||
        !submitCode ||
        !escapeStatus
    ) {
        return;
    }


    let escapeAttempts = 0;


    // ========================================
    // OPEN GAME
    // ========================================

    function openEscape() {

        escapeScreen.classList.add("show");

        document.body.style.overflow = "hidden";

        setTimeout(() => {
            accessCode.focus();
        }, 250);

    }


    // ========================================
    // CLOSE GAME
    // ========================================

    function closeEscapeGame() {

        escapeScreen.classList.remove("show");

        document.body.style.overflow = "";

    }


    // ========================================
    // CHECK ACCESS CODE
    // ========================================

    function checkAccessCode() {

        const code =
            accessCode.value.trim();

        if (!code) {
            return;
        }

        escapeAttempts++;


        // CORRECT

        if (code === "1927") {

            escapeStatus.style.color =
                "#28e44d";

            escapeStatus.innerHTML =
                "> ACCESS CODE ACCEPTED.<br>" +
                "> decrypting next directory...";


            accessCode.disabled = true;
            submitCode.disabled = true;


            setTimeout(() => {

                escapeStatus.innerHTML =
                    "> PUZZLE 01 COMPLETE.<br>" +
                    "> directory unlocked: /unknown/";

            }, 1200);

            return;
        }


        // WRONG

        escapeStatus.style.color =
            "#777";

        escapeStatus.innerHTML =
            "> ACCESS DENIED.<br>" +
            "> attempt #" +
            escapeAttempts;


        accessCode.value = "";

        accessCode.focus();

    }


    // ========================================
    // EVENTS
    // ========================================

    startEscape.addEventListener(
        "click",
        openEscape
    );


    closeEscape.addEventListener(
        "click",
        closeEscapeGame
    );


    submitCode.addEventListener(
        "click",
        checkAccessCode
    );


    accessCode.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {
                checkAccessCode();
            }

        }
    );


    // Klik background untuk keluar

    escapeScreen.addEventListener(
        "click",
        (event) => {

            if (event.target === escapeScreen) {
                closeEscapeGame();
            }

        }
    );


    // ESC keyboard

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                escapeScreen.classList.contains("show")
            ) {
                closeEscapeGame();
            }

        }
    );

}