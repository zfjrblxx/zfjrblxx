function initShutdown() {

    const startButton =
        document.getElementById("startShutdown");

    const screen =
        document.getElementById("shutdownScreen");

    const log =
        document.getElementById("shutdownLog");

    const message =
        document.getElementById("shutdownMessage");

    const rebootMessage =
        document.getElementById("rebootMessage");


    if (
        !startButton ||
        !screen ||
        !log
    ) {
        return;
    }


    let canReboot = false;


    // ========================================
    // DELAY
    // ========================================

    function wait(ms) {

        return new Promise(resolve =>
            setTimeout(resolve, ms)
        );

    }


    // ========================================
    // ADD LOG
    // ========================================

    function addLog(text) {

        const line =
            document.createElement("div");

        line.className =
            "shutdown-log-line";

        line.textContent = text;

        log.appendChild(line);

    }


    // ========================================
    // START SHUTDOWN
    // ========================================

    async function shutdown() {

        canReboot = false;

        log.innerHTML = "";

        message.classList.add("hidden");
        rebootMessage.classList.add("hidden");

        screen.classList.add("show");

        document.body.style.overflow =
            "hidden";


        await wait(400);

        addLog(
            "> shutdown requested..."
        );


        await wait(500);

        addLog(
            "> stopping services..."
        );


        await wait(550);

        addLog(
            "> terminating processes..."
        );


        await wait(500);

        addLog(
            "> closing connection..."
        );


        await wait(600);

        addLog(
            "> saving absolutely nothing..."
        );


        await wait(700);

        addLog(
            "> session terminated."
        );


        await wait(800);

        log.innerHTML = "";


        // SYSTEM HALTED

        addLog(
            "SYSTEM HALTED"
        );


        await wait(1800);

        log.innerHTML = "";


        // PESAN RAHASIA

        message.classList.remove(
            "hidden"
        );


        await wait(1800);

        rebootMessage.classList.remove(
            "hidden"
        );


        canReboot = true;

    }


    // ========================================
    // REBOOT
    // ========================================

    function reboot() {

    if (!canReboot) {
        return;
    }

    canReboot = false;

    window.location.href = "https://www.google.com/";

}


    // ========================================
    // EVENTS
    // ========================================

    startButton.addEventListener(
        "click",
        shutdown
    );


    screen.addEventListener(
        "click",
        reboot
    );

}