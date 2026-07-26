// ========================================
// SECRET NOTE
// ========================================

function initSecretNote() {

    const secretFolder =
        document.getElementById("secretFolder");

    const folderIcon =
        document.getElementById("folderIcon");

    const noteOverlay =
        document.getElementById("noteOverlay");

    const closeNote =
        document.getElementById("closeNote");


    if (
        !secretFolder ||
        !folderIcon ||
        !noteOverlay ||
        !closeNote
    ) {
        return;
    }


    // ========================================
    // OPEN NOTE
    // ========================================

    function openSecretNote() {

        noteOverlay.classList.add("show");

        folderIcon.textContent = "📂";

        document.body.style.overflow = "hidden";
    }


    // ========================================
    // CLOSE NOTE
    // ========================================

    function closeSecretNote() {

        noteOverlay.classList.remove("show");

        folderIcon.textContent = "📁";

        document.body.style.overflow = "";
    }


    // ========================================
    // EVENTS
    // ========================================

    secretFolder.addEventListener(
        "click",
        openSecretNote
    );


    closeNote.addEventListener(
        "click",
        closeSecretNote
    );


    // Klik area gelap

    noteOverlay.addEventListener(
        "click",
        (event) => {

            if (event.target === noteOverlay) {
                closeSecretNote();
            }

        }
    );


    // ESC keyboard

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                noteOverlay.classList.contains("show")
            ) {
                closeSecretNote();
            }

        }
    );

}