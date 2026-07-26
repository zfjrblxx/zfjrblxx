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