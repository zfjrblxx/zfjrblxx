function initEscapeGame() {

    // ========================================
    // ELEMENT UTAMA
    // ========================================

    const startEscape =
        document.getElementById("startEscape");

    const escapeScreen =
        document.getElementById("escapeScreen");

    const closeEscape =
        document.getElementById("closeEscape");

    const puzzleCounter =
        document.getElementById("puzzleCounter");


    // ========================================
    // PUZZLE 01
    // ========================================

    const puzzle1 =
        document.getElementById("puzzle1");

    const accessCode =
        document.getElementById("accessCode");

    const submitCode =
        document.getElementById("submitCode");

    const escapeStatus =
        document.getElementById("escapeStatus");


    // ========================================
    // PUZZLE 02
    // ========================================

    const puzzle2 =
        document.getElementById("puzzle2");

    const fileOutput =
        document.getElementById("fileOutput");

    const fileItems =
        document.querySelectorAll(".file-item");


    // ========================================
    // PUZZLE 03
    // ========================================

    const puzzle3 =
        document.getElementById("puzzle3");

    const commandInput =
        document.getElementById("commandInput");

    const submitCommand =
        document.getElementById("submitCommand");

    const commandStatus =
        document.getElementById("commandStatus");


    // ========================================
    // STATE
    // ========================================

    let attempts = 0;


    // ========================================
    // BUKA GAME
    // ========================================

    function openEscape() {

        escapeScreen.classList.add("show");

        document.body.style.overflow = "hidden";


        setTimeout(() => {

            if (
                puzzle1 &&
                puzzle1.style.display !== "none" &&
                accessCode &&
                !accessCode.disabled
            ) {
                accessCode.focus();
            }

        }, 200);

    }


    // ========================================
    // TUTUP GAME
    // ========================================

    function closeGame() {

        escapeScreen.classList.remove("show");

        document.body.style.overflow = "";

    }


    // ========================================
    // PUZZLE 01
    // CEK KODE
    // ========================================

    function checkCode() {

        const code =
            accessCode.value.trim();


        if (!code) {
            return;
        }


        attempts++;


        // KODE BENAR

        if (code === "1927") {

            escapeStatus.style.color =
                "#28e44d";


            escapeStatus.innerHTML =
                "&gt; KODE DITERIMA.<br>" +
                "&gt; membuka /unknown/...";


            accessCode.disabled = true;

            submitCode.disabled = true;


            // MASUK PUZZLE 02

            setTimeout(() => {

                puzzle1.style.display =
                    "none";


                puzzle2.classList.remove(
                    "puzzle-hidden"
                );


                puzzleCounter.textContent =
                    "PUZZLE 02 / 05";

            }, 1000);


            return;

        }


        // KODE SALAH

        escapeStatus.style.color =
            "#777";


        escapeStatus.innerHTML =
            "&gt; AKSES DITOLAK.<br>" +
            "&gt; percobaan #" +
            attempts;


        accessCode.value = "";

        accessCode.focus();

    }


    // ========================================
    // PUZZLE 02
    // BUKA FILE
    // ========================================

    function openFile(file) {


        // ====================================
        // SYSTEM.LOG
        // FILE BENAR
        // ====================================

        if (file === "system") {

            fileOutput.innerHTML = `

                <span class="file-success">
                    &gt; membuka system.log...
                </span>

                <br><br>

                [03:17:41] protokol keluar dimulai
                <br>

                [03:17:42] perintah rusak
                <br>

                [03:17:43] pemulihan gagal
                <br>

                [03:17:44] fragmen berhasil ditemukan

                <br><br>

                perintah_ditemukan:

                <br>

                <span class="broken-command">
                    E X _ T
                </span>

                <br><br>

                <button
                    class="terminal-btn"
                    id="continuePuzzle3"
                >
                    [ LANJUT ]
                </button>

            `;


            // Tombol baru dibuat setelah innerHTML,
            // jadi ambil elemennya di sini.

            const continueButton =
                document.getElementById(
                    "continuePuzzle3"
                );


            if (continueButton) {

                continueButton.addEventListener(
                    "click",
                    openPuzzle3
                );

            }


            return;

        }


        // ====================================
        // MEMORY.DAT
        // FILE RUSAK
        // ====================================

        if (file === "memory") {

            fileOutput.innerHTML = `

                &gt; membuka memory.dat...

                <br><br>

                010██01██1100██01
                <br>

                ██110██001██101

                <br><br>

                <span class="file-error">
                    ERROR: blok memori rusak.
                </span>

            `;


            return;

        }


        // ====================================
        // EXIT.KEY
        // JEBAKAN
        // ====================================

        if (file === "exit") {

            fileOutput.innerHTML = `

                &gt; membuka exit.key...

                <br><br>

                KUNCI KELUAR DITEMUKAN.

                <br>

                mendekripsi...

                <br><br>

                <span class="file-error">
                    yah... hampir :)
                </span>

            `;


            return;

        }


        // ====================================
        // README
        // PETUNJUK
        // ====================================

        if (file === "readme") {

            fileOutput.innerHTML = `

                &gt; README.txt

                <br><br>

                Tidak semua yang ada di sini
                sesuai dengan namanya.

                <br><br>

                <span class="file-success">
                    Log menyimpan apa yang
                    dilupakan oleh yang lain.
                </span>

            `;


            return;

        }

    }


    // ========================================
    // BUKA PUZZLE 03
    // ========================================

    function openPuzzle3() {

        puzzle2.style.display =
            "none";


        puzzle3.classList.remove(
            "puzzle-hidden"
        );


        puzzleCounter.textContent =
            "PUZZLE 03 / 05";


        setTimeout(() => {

            if (commandInput) {
                commandInput.focus();
            }

        }, 200);

    }


    // ========================================
    // PUZZLE 03
    // CEK COMMAND
    // ========================================

    function checkCommand() {

        const command =
            commandInput.value
                .trim()
                .toUpperCase();


        if (!command) {
            return;
        }


        // COMMAND BENAR

        if (command === "EXIT") {

            commandStatus.style.color =
                "#28e44d";


            commandStatus.innerHTML =
                "&gt; PERINTAH VALID.<br>" +
                "&gt; menjalankan EXIT...";


            commandInput.disabled = true;

            submitCommand.disabled = true;


            // SEAKAN BERHASIL

            setTimeout(() => {

                commandStatus.innerHTML =
                    "&gt; EXIT BERHASIL.<br>" +
                    "&gt; memutus koneksi...";

            }, 900);


            // TERNYATA GAGAL

            setTimeout(() => {

                commandStatus.style.color =
                    "#777";


                commandStatus.innerHTML =
                    "&gt; ERROR.<br><br>" +
                    "Kamu pikir semudah itu?<br><br>" +
                    "<span class='file-success'>" +
                    "yah... hampir :)" +
                    "</span>";

            }, 2000);


            return;

        }


        // COMMAND SALAH

        commandStatus.style.color =
            "#777";


        commandStatus.innerHTML =
            "&gt; PERINTAH TIDAK DIKENALI.";


        commandInput.value = "";

        commandInput.focus();

    }


    // ========================================
    // EVENT - BUKA GAME
    // ========================================

    startEscape.addEventListener(
        "click",
        openEscape
    );


    // ========================================
    // EVENT - TUTUP GAME
    // ========================================

    closeEscape.addEventListener(
        "click",
        closeGame
    );


    // ========================================
    // EVENT - PUZZLE 01
    // ========================================

    submitCode.addEventListener(
        "click",
        checkCode
    );


    accessCode.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                checkCode();

            }

        }
    );


    // ========================================
    // EVENT - PUZZLE 02
    // ========================================

    fileItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                const file =
                    item.dataset.file;


                openFile(file);

            }
        );

    });


    // ========================================
    // EVENT - PUZZLE 03
    // ========================================

    if (
        submitCommand &&
        commandInput
    ) {

        submitCommand.addEventListener(
            "click",
            checkCommand
        );


        commandInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    checkCommand();

                }

            }
        );

    }


    // ========================================
    // KLIK AREA LUAR
    // ========================================

    escapeScreen.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                escapeScreen
            ) {

                closeGame();

            }

        }
    );


    // ========================================
    // ESC KEY
    // ========================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                escapeScreen.classList.contains(
                    "show"
                )
            ) {

                closeGame();

            }

        }
    );

}