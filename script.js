const form = document.getElementById("registrationForm");

const firstName = document.getElementById("firstName");
const middleName = document.getElementById("middleName");
const lastName = document.getElementById("lastName");
const course = document.getElementById("course");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const gender = document.getElementsByName("gender");
const terms = document.getElementById("terms");
const strengthMessage = document.getElementById("strengthMessage");

// Regex
const nameRegex = /^[A-Za-z\s]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

// AUTO FORMAT NAME
function formatName(input) {
    input.addEventListener("input", () => {
        input.value = input.value
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());
    });
}

// LETTERS ONLY
function allowOnlyLetters(input) {
    input.addEventListener("input", () => {
        input.value = input.value.replace(/[^A-Za-z\s]/g, "");
    });
}

formatName(firstName);
formatName(middleName);
formatName(lastName);

allowOnlyLetters(firstName);
allowOnlyLetters(middleName);
allowOnlyLetters(lastName);

// SHOW / HIDE PASSWORD
togglePassword.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        password.type = "password";
        togglePassword.textContent = "Show";
    }
});

// PASSWORD STRENGTH
password.addEventListener("input", function () {
    const value = password.value;

    let strength = "Weak";

    if (value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        /[@$!%*?&]/.test(value)) {
        strength = "Strong";
    } else if (value.length >= 6) {
        strength = "Medium";
    }

    strengthMessage.textContent = "Strength: " + strength;

    strengthMessage.style.color =
        strength === "Strong" ? "violet" :
        strength === "Medium" ? "purple" : "red";
});

// FORM SUBMIT
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.querySelectorAll("input, select").forEach(i => i.classList.remove("error-border"));

    if (!nameRegex.test(firstName.value)) {
        showError(firstName, "Only letters allowed");
        isValid = false;
    }

    if (middleName.value && !nameRegex.test(middleName.value)) {
        showError(middleName, "Only letters allowed");
        isValid = false;
    }

    if (!nameRegex.test(lastName.value)) {
        showError(lastName, "Only letters allowed");
        isValid = false;
    }

    if (course.value === "") {
        showError(course, "Please select a course");
        isValid = false;
    }

    if (!passwordRegex.test(password.value)) {
        showError(password, "Min 8 chars, 1 uppercase, 1 number, 1 special char");
        isValid = false;
    }

    let genderSelected = false;
    gender.forEach(g => {
        if (g.checked) genderSelected = true;
    });

    if (!genderSelected) {
        showError(gender[0], "Select gender");
        isValid = false;
    }

    if (!terms.checked) {
        showError(terms, "You must accept terms");
        isValid = false;
    }

    if (isValid) {
        alert("Registration Successful 🎉");
        form.reset();
        strengthMessage.textContent = "";
    }
});

// ERROR FUNCTION
function showError(input, message) {
    const formGroup = input.closest(".form-group");
    formGroup.querySelector(".error").textContent = message;
    input.classList.add("error-border");
}