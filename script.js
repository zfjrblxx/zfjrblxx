// Fajar Putra Waluya
// Personal Portfolio

console.log("Portfolio loaded.");

// ==============================
// AUTO AGE
// ==============================

// Ganti 2000 dengan tahun lahir kamu
const birthDate = new Date(2000, 6, 28);
// Bulan dimulai dari 0
// 6 = Juli

function calculateAge() {
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const birthdayThisYear = new Date(
        today.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );

    if (today < birthdayThisYear) {
        age--;
    }

    document.getElementById("age").textContent = age;
}

calculateAge();

