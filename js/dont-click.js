function initDontClickGame() {

    // ========================================
    // ELEMENT
    // ========================================

    const startButton =
        document.getElementById("startDontClick");

    const screen =
        document.getElementById("dontClickScreen");

    const closeButton =
        document.getElementById("closeDontClick");

    const windowGame =
        document.querySelector(".dont-click-window");

    const content =
        document.querySelector(".dont-click-content");

    const dontButton =
        document.getElementById("dontButton");

    const buttonArea =
        document.getElementById("dontButtonArea");

    const output =
        document.getElementById("dontOutput");

    const counter =
        document.getElementById("clickCounter");

    const intro =
        document.getElementById("dontClickIntro");

    const fakeProcess =
        document.getElementById("fakeProcess");

    const progressBar =
        document.getElementById("fakeProgressBar");

    const progressText =
        document.getElementById("fakeProgressText");

    const complete =
        document.getElementById("dontComplete");

    const finishButton =
        document.getElementById("finishDontClick");


    // ========================================
    // STATE
    // ========================================

    let clicks = 0;

    let dodgeMode = false;

    let gameFinished = false;


    // ========================================
    // BUKA GAME
    // ========================================

    function openGame() {

        screen.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    // ========================================
    // TUTUP GAME
    // ========================================

    function closeGame() {

        screen.classList.remove("show");

        document.body.style.overflow = "";

    }


    // ========================================
    // UPDATE COUNTER
    // ========================================

    function updateCounter() {

        counter.textContent =
            "CLICK: " + clicks;

    }


    // ========================================
    // OUTPUT
    // ========================================

    function message(text, className = "") {

        output.innerHTML = `
            <p class="${className}">
                ${text}
            </p>
        `;

    }


    // ========================================
    // GLITCH
    // ========================================

    function glitch() {

        windowGame.classList.remove("warning");

        void windowGame.offsetWidth;

        windowGame.classList.add("warning");


        setTimeout(() => {

            windowGame.classList.remove("warning");

        }, 700);

    }


    // ========================================
    // PINDAHKAN TOMBOL
    // ========================================

    function moveButton() {

        if (!buttonArea || !dontButton) {
            return;
        }


        const areaWidth =
            buttonArea.clientWidth;

        const areaHeight =
            buttonArea.clientHeight;

        const buttonWidth =
            dontButton.offsetWidth;

        const buttonHeight =
            dontButton.offsetHeight;


        const maxX =
            Math.max(
                0,
                areaWidth - buttonWidth
            );

        const maxY =
            Math.max(
                0,
                areaHeight - buttonHeight
            );


        const x =
            Math.random() * maxX;

        const y =
            Math.random() * maxY;


        dontButton.style.left =
            x + "px";

        dontButton.style.top =
            y + "px";

    }


    // ========================================
    // FAKE PROCESS
    // ========================================

    function runFakeProcess() {

        intro.classList.add("hidden");

        fakeProcess.classList.remove("hidden");


        progressBar.style.width = "0%";

        progressText.textContent = "0%";


        const stages = [
            13,
            28,
            46,
            67,
            82
        ];


        stages.forEach((value, index) => {

            setTimeout(() => {

                progressBar.style.width =
                    value + "%";

                progressText.textContent =
                    value + "%";

            }, 450 * (index + 1));

        });


        // BALIK KE TOMBOL

        setTimeout(() => {

            fakeProcess.classList.add("hidden");

            intro.classList.remove("hidden");


            message(
                "&gt; tunggu...<br><br>" +
                "&gt; kamu ngapain?",
                "green"
            );


            dontButton.textContent =
                "[ BERHENTI ]";


            dontButton.style.left = "0px";
            dontButton.style.top = "20px";

        }, 3000);

    }


    // ========================================
    // FINAL
    // ========================================

    function finishGame() {

        gameFinished = true;

        dodgeMode = false;


        windowGame.classList.add("chaos");


        message(
            "SYSTEM ERROR<br><br>" +
            "DON'T_CLICK.exe<br>" +
            "telah berhenti merespons.",
            "green"
        );


        dontButton.disabled = true;


        setTimeout(() => {

            windowGame.classList.remove("chaos");

            intro.classList.add("hidden");

            fakeProcess.classList.add("hidden");

            complete.classList.remove("hidden");

            counter.textContent =
                "CLICK: 13";

        }, 1800);

    }


    // ========================================
    // HANDLE CLICK
    // ========================================

    function handleClick() {

        if (gameFinished) {
            return;
        }


        clicks++;

        updateCounter();


        // ====================================
        // CLICK 01
        // ====================================

        if (clicks === 1) {

            message(
                "&gt; ...<br><br>" +
                "&gt; aku bilang jangan."
            );

            return;

        }


        // ====================================
        // CLICK 02
        // ====================================

        if (clicks === 2) {

            message(
                "&gt; serius?"
            );

            return;

        }


        // ====================================
        // CLICK 03
        // ====================================

        if (clicks === 3) {

            message(
                "&gt; kamu memang nggak bisa " +
                "dibilangin ya."
            );

            return;

        }


        // ====================================
        // CLICK 04
        // ====================================

        if (clicks === 4) {

            message(
                "&gt; baiklah.<br><br>" +
                "&gt; jangan salahkan aku."
            );

            return;

        }


        // ====================================
        // CLICK 05
        // ====================================

        if (clicks === 5) {

            glitch();


            message(
                "WARNING:<br>" +
                "UNAUTHORIZED INPUT DETECTED" +
                "<br><br>" +
                "&gt; berhenti klik.",
                "green"
            );

            return;

        }


        // ====================================
        // CLICK 06
        // ====================================

        if (clicks === 6) {

            moveButton();


            message(
                "&gt; HEI.<br><br>" +
                "&gt; sekarang masih mau klik?"
            );

            return;

        }


        // ====================================
        // CLICK 07
        // ====================================

        if (clicks === 7) {

            dontButton.textContent =
                "[ KLIK AKU ]";


            message(
                "&gt; oke.<br><br>" +
                "&gt; kalau memang mau..."
            );

            return;

        }


        // ====================================
        // CLICK 08
        // ====================================

        if (clicks === 8) {

            glitch();


            message(
                "&gt; hah.<br><br>" +
                "&gt; gampang banget percaya."
            );


            dontButton.textContent =
                "[ JANGAN KLIK ]";

            return;

        }


        // ====================================
        // CLICK 09
        // ====================================

        if (clicks === 9) {

            message(
                "&gt; sesuatu sedang dibuka..."
            );


            setTimeout(() => {

                runFakeProcess();

            }, 700);


            return;

        }


        // ====================================
        // CLICK 10
        // ====================================

        if (clicks === 10) {

            glitch();


            message(
                "&gt; proses tidak dapat dihentikan."
            );

            return;

        }


        // ====================================
        // CLICK 11
        // ====================================

        if (clicks === 11) {

            message(
                "&gt; bagus.<br><br>" +
                "&gt; ini semua gara-gara kamu."
            );


            dontButton.textContent =
                "[ ... ]";

            return;

        }


        // ====================================
        // CLICK 12
        // ====================================

        if (clicks === 12) {

            dodgeMode = true;


            buttonArea.style.minHeight =
                "180px";


            dontButton.textContent =
                "[ KLIK SEKALI LAGI ]";


            message(
                "&gt; kalau berani...<br><br>" +
                "&gt; klik sekali lagi.",
                "green"
            );


            moveButton();

            return;

        }


        // ====================================
        // CLICK 13
        // ====================================

        if (clicks >= 13) {

            finishGame();

        }

    }


    // ========================================
    // DODGE DESKTOP
    // ========================================

    function dodgeDesktop() {

        if (
            !dodgeMode ||
            gameFinished
        ) {
            return;
        }


        moveButton();

    }


    // ========================================
    // DODGE MOBILE
    //
    // Tidak selalu kabur supaya tombol
    // tetap mungkin diklik.
    // ========================================

    function dodgeMobile(event) {

        if (
            !dodgeMode ||
            gameFinished
        ) {
            return;
        }


        // 65% kemungkinan kabur

        if (Math.random() < 0.65) {

            event.preventDefault();

            moveButton();

        }

    }


    // ========================================
    // RESET
    // ========================================

    function resetGame() {

        clicks = 0;

        dodgeMode = false;

        gameFinished = false;


        counter.textContent =
            "CLICK: 0";


        output.innerHTML = "";


        dontButton.disabled = false;

        dontButton.textContent =
            "[ JANGAN KLIK ]";


        dontButton.style.left =
            "0px";

        dontButton.style.top =
            "20px";


        buttonArea.style.minHeight =
            "120px";


        progressBar.style.width =
            "0%";

        progressText.textContent =
            "0%";


        intro.classList.remove("hidden");

        fakeProcess.classList.add("hidden");

        complete.classList.add("hidden");


        windowGame.classList.remove(
            "warning",
            "chaos"
        );

    }


    // ========================================
    // EVENT
    // ========================================

    if (startButton) {

        startButton.addEventListener(
            "click",
            openGame
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeGame
        );

    }


    if (dontButton) {

        dontButton.addEventListener(
            "click",
            handleClick
        );


        // Desktop
        dontButton.addEventListener(
            "mouseenter",
            dodgeDesktop
        );


        // Mobile
        dontButton.addEventListener(
            "touchstart",
            dodgeMobile,
            {
                passive: false
            }
        );

    }


    // ========================================
    // FINISH / KEMBALI
    // ========================================

    if (finishButton) {

        finishButton.addEventListener(
            "click",
            () => {

                closeGame();

                resetGame();

            }
        );

    }


    // ========================================
    // KLIK AREA LUAR
    // ========================================

    if (screen) {

        screen.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === screen
                ) {

                    closeGame();

                }

            }
        );

    }


    // ========================================
    // ESC
    // ========================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                screen &&
                screen.classList.contains("show")
            ) {

                closeGame();

            }

        }
    );

}