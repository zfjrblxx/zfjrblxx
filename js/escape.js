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
    // PUZZLE 04
    // ========================================

    const puzzle4 =
        document.getElementById("puzzle4");

    const processInput =
        document.getElementById("processInput");

    const submitProcess =
        document.getElementById("submitProcess");

    const processStatus =
        document.getElementById("processStatus");


    // ========================================
    // PUZZLE 05
    // ========================================

    const puzzle5 =
        document.getElementById("puzzle5");

    const finalInput =
        document.getElementById("finalInput");

    const submitFinal =
        document.getElementById("submitFinal");

    const finalStatus =
        document.getElementById("finalStatus");

    const escapeComplete =
        document.getElementById("escapeComplete");


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


        // SYSTEM.LOG

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
                    → lanjut
                </button>

            `;


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


        // MEMORY.DAT

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


        // EXIT.KEY

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


        // README

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
    // ========================================

    function checkCommand() {

        const command =
            commandInput.value
                .trim()
                .toUpperCase();


        if (!command) {
            return;
        }


        if (command === "EXIT") {

            commandStatus.style.color =
                "#28e44d";


            commandStatus.innerHTML =
                "&gt; PERINTAH VALID.<br>" +
                "&gt; menjalankan EXIT...";


            commandInput.disabled = true;
            submitCommand.disabled = true;


            // PURA-PURA BERHASIL

            setTimeout(() => {

                commandStatus.innerHTML =
                    "&gt; EXIT BERHASIL.<br>" +
                    "&gt; memutus koneksi...";

            }, 900);


            // GAGAL

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


            // MASUK PUZZLE 04

            setTimeout(() => {

                puzzle3.style.display =
                    "none";


                puzzle4.classList.remove(
                    "puzzle-hidden"
                );


                puzzleCounter.textContent =
                    "PUZZLE 04 / 05";


                setTimeout(() => {

                    if (processInput) {

                        processInput.focus();

                    }

                }, 200);

            }, 4000);


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
    // PUZZLE 04
    // ========================================

    function checkProcess() {

        const answer =
            processInput.value
                .trim()
                .toUpperCase()
                .replace(/\s+/g, " ");


        if (!answer) {
            return;
        }


        attempts++;


        if (
            answer ===
            "ROOT KILL STOP EXIT"
        ) {

            processStatus.style.color =
                "#28e44d";


            processStatus.innerHTML =
                "&gt; URUTAN DITERIMA.<br>" +
                "&gt; menghentikan proses...";


            processInput.disabled = true;
            submitProcess.disabled = true;


            // TERMINATED

            setTimeout(() => {

                processStatus.innerHTML =
                    "&gt; ROOT ........ TERMINATED<br>" +
                    "&gt; KILL ........ TERMINATED<br>" +
                    "&gt; STOP ........ TERMINATED<br>" +
                    "&gt; EXIT ........ TERMINATED";

            }, 1000);


            // MASIH ADA PROSES

            setTimeout(() => {

                processStatus.innerHTML +=
                    "<br><br>" +
                    "&gt; PERINGATAN:<br>" +
                    "&gt; 1 PROSES MASIH AKTIF.";

            }, 2200);


            // FINAL PROTOCOL

            setTimeout(() => {

                processStatus.innerHTML +=
                    "<br><br>" +
                    "&gt; membuka final_protocol...";

            }, 3200);


            // ========================================
            // MASUK PUZZLE 05
            // ========================================

            setTimeout(() => {

                puzzle4.style.display =
                    "none";


                puzzle5.classList.remove(
                    "puzzle-hidden"
                );


                puzzleCounter.textContent =
                    "PUZZLE 05 / 05";


                setTimeout(() => {

                    if (finalInput) {

                        finalInput.focus();

                    }

                }, 200);

            }, 4500);


            return;

        }


        // JAWABAN SALAH

        processStatus.style.color =
            "#777";


        processStatus.innerHTML =
            "&gt; URUTAN SALAH.<br>" +
            "&gt; proses gagal dihentikan.";


        processInput.value = "";

        processInput.focus();

    }


    // ========================================
    // PUZZLE 05
    // FINAL
    // ========================================

    function checkFinal() {

        const answer =
            finalInput.value
                .trim()
                .toLowerCase();


        if (!answer) {
            return;
        }


        attempts++;


        // ========================================
        // LOGOUT BENAR
        // ========================================

        if (answer === "logout") {

            finalInput.disabled = true;
            submitFinal.disabled = true;


            finalStatus.style.color =
                "#28e44d";


            finalStatus.innerHTML =
                "&gt; perintah diterima.";


            // MENGAKHIRI SESI

            setTimeout(() => {

                finalStatus.innerHTML =
                    "&gt; mengakhiri sesi...";

            }, 700);


            // TUTUP KONEKSI

            setTimeout(() => {

                finalStatus.innerHTML =
                    "&gt; mengakhiri sesi...<br>" +
                    "&gt; menutup koneksi...";

            }, 1400);


            // HAPUS SESSION

            setTimeout(() => {

                finalStatus.innerHTML =
                    "&gt; mengakhiri sesi...<br>" +
                    "&gt; menutup koneksi...<br>" +
                    "&gt; menghapus session...";

            }, 2100);


            // COMPLETE

            setTimeout(() => {

                puzzle5.style.display =
                    "none";


                escapeComplete.classList.remove(
                    "puzzle-hidden"
                );


                puzzleCounter.textContent =
                    "ESCAPE COMPLETE";

            }, 3000);


            return;

        }


        // ========================================
        // JAWABAN SALAH
        // ========================================

        finalStatus.style.color =
            "#777";


        finalStatus.innerHTML =
            "&gt; perintah tidak dikenali.<br>" +
            "&gt; sesi masih aktif.";


        finalInput.value = "";

        finalInput.focus();

    }


    // ========================================
    // EVENT - BUKA GAME
    // ========================================

    if (startEscape) {

        startEscape.addEventListener(
            "click",
            openEscape
        );

    }


    // ========================================
    // EVENT - TUTUP GAME
    // ========================================

    if (closeEscape) {

        closeEscape.addEventListener(
            "click",
            closeGame
        );

    }


    // ========================================
    // EVENT - PUZZLE 01
    // ========================================

    if (
        submitCode &&
        accessCode
    ) {

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

    }


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
    // EVENT - PUZZLE 04
    // ========================================

    if (
        submitProcess &&
        processInput
    ) {

        submitProcess.addEventListener(
            "click",
            checkProcess
        );


        processInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    checkProcess();

                }

            }
        );

    }


    // ========================================
    // EVENT - PUZZLE 05
    // ========================================

    if (
        submitFinal &&
        finalInput
    ) {

        submitFinal.addEventListener(
            "click",
            checkFinal
        );


        finalInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    checkFinal();

                }

            }
        );

    }


    // ========================================
    // KLIK AREA LUAR
    // ========================================

    if (escapeScreen) {

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

    }


    // ========================================
    // ESC KEY
    // ========================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                escapeScreen &&
                escapeScreen.classList.contains(
                    "show"
                )
            ) {

                closeGame();

            }

        }
    );

}