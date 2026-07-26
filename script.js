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