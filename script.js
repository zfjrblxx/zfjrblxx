// ==============================
// AUTO AGE
// ==============================

const BIRTH_YEAR = 2000; // Ganti dengan tahun lahir kamu
const BIRTH_MONTH = 6;   // Juli (January = 0)
const BIRTH_DAY = 28;

function updateAge() {

    const today = new Date();

    const birthday = new Date(
        BIRTH_YEAR,
        BIRTH_MONTH,
        BIRTH_DAY
    );

    let age =
        today.getFullYear() -
        birthday.getFullYear();

    const birthdayThisYear = new Date(
        today.getFullYear(),
        BIRTH_MONTH,
        BIRTH_DAY
    );

    if (today < birthdayThisYear) {
        age--;
    }

    const ageElement =
        document.getElementById("age");

    if (ageElement) {
        ageElement.textContent = age;
    }
}

updateAge();


// ==============================
// SECRET FOLDER
// ==============================

const secretFolder =
    document.getElementById("secretFolder");

const folderIcon =
    document.getElementById("folderIcon");

const noteOverlay =
    document.getElementById("noteOverlay");

const closeNote =
    document.getElementById("closeNote");


function openSecretNote() {

    noteOverlay.classList.add("show");

    folderIcon.textContent = "📂";

    document.body.style.overflow = "hidden";
}


function closeSecretNote() {

    noteOverlay.classList.remove("show");

    folderIcon.textContent = "📁";

    document.body.style.overflow = "";
}


secretFolder.addEventListener(
    "click",
    openSecretNote
);


closeNote.addEventListener(
    "click",
    closeSecretNote
);


// Klik area gelap untuk menutup

noteOverlay.addEventListener("click", (event) => {

    if (event.target === noteOverlay) {
        closeSecretNote();
    }

});


// ESC untuk menutup

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeSecretNote();
    }

});

// ==============================
// ESCAPE GAME - PUZZLE 01
// ==============================

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


let escapeAttempts = 0;


// OPEN ESCAPE MODE

startEscape.addEventListener("click", () => {

    escapeScreen.classList.add("show");

    document.body.style.overflow = "hidden";

    setTimeout(() => {
        accessCode.focus();
    }, 300);

});


// CLOSE

closeEscape.addEventListener("click", () => {

    escapeScreen.classList.remove("show");

    document.body.style.overflow = "";

});


// CHECK CODE

function checkAccessCode() {

    const code = accessCode.value.trim();

    escapeAttempts++;

    if (code === "1927") {

        escapeStatus.style.color = "#28e44d";

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

    }

    else {

        escapeStatus.style.color = "#777";

        escapeStatus.innerHTML =
            "> ACCESS DENIED.<br>" +
            "> attempt #" + escapeAttempts;

        accessCode.value = "";

        accessCode.focus();

    }

}


// BUTTON

submitCode.addEventListener(
    "click",
    checkAccessCode
);


// ENTER KEY

accessCode.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        checkAccessCode();
    }

});