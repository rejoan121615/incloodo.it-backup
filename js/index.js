var i = 0; // Start Point
var images = []; // Images Array
var time = 3000; // Time Between Switch

// Image List
images[0] = "../img/first.png";
images[1] = "../img/second.png";
images[2] = "../img/third.png";
images[3] = "../img/fourth.png";
images[4] = "../img/five.png";

// Change Image
function changeImg() {
    if (document.slider) {
        document.slider.src = images[i];

        // Check If Index Is Under Max
        if (i < images.length - 1) {
            // Add 1 to Index
            i++;
        } else {
            // Reset Back To O
            i = 0;
        }

        // Run function every x seconds
        setTimeout("changeImg()", time);
    }
}

document.addEventListener(
    "DOMContentLoaded",
    function () {
        loadPhoneField();

        const form = document.getElementById("dataForm");

        if (Boolean(form)) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();

                const phoneInputField = document.querySelector("#phone");
                var iti =
                    window.intlTelInputGlobals.getInstance(phoneInputField);

                if (iti.isValidNumber()) {
                    let mobilePhone = iti.getNumber();
                    let inputEmail = document.querySelector("#email").value;

                    var myHeaders = new Headers();
                    myHeaders.append(
                        "Content-Type",
                        "application/x-www-form-urlencoded"
                    );

                    var urlencoded = new URLSearchParams();
                    urlencoded.append("email", inputEmail);
                    urlencoded.append("phone", mobilePhone);

                    var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: urlencoded,
                    };

                    fetch("https://incloodo.it/api/user", requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                            let obj = JSON.parse(result);

                            if (obj.error) {
                                showSnackBar(obj.error, true);
                            } else if (obj.msg) {
                                showSnackBar(obj.msg, false);
                            }
                        })
                        .catch((error) => {
                            console.log(error);

                            showSnackBar(
                                "Oops, qualcosa è andato storto. Si prega di riprovare",
                                true
                            );
                        });
                } else {
                    showSnackBar(
                        "Il numero di telefono inserito non è valido",
                        true
                    );
                }
            });
        }
    },
    false
);

function loadPhoneField() {
    const phoneInputField = document.querySelector("#phone");
    if (Boolean(window.intlTelInput)) {
        window.intlTelInput(phoneInputField, {
            initialCountry: "it",
            preferredCountries: ["us", "it", "de"],
            utilsScript:
                "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });
    }
}

function showSnackBar(message, isError) {
    var x = document.getElementById("snackbar");

    x.className = "show";

    x.innerHTML = message;

    if (isError) {
        x.style.backgroundColor = "rgb(241, 67, 67)";
    } else {
        x.style.backgroundColor = "rgb(44, 179, 44)";
    }

    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}

// Run function when page loads

changeImg();

// responsive navbar function
const animateNav = document.querySelector(".res__navbar");
const navBtn = document.querySelector("button.ham");

const browMemory = window.localStorage;

function btnOpenClose() {
    if (browMemory.getItem("open") === "true") {
        browMemory.setItem("open", false);
        console.log("execute true");
        navBtn.classList.remove("closed");
        animateNav.classList.remove("animate__nav");
        setTimeout(() => {
            navBtn.classList.add("opened");
            animateNav.classList.add("animate__nav");
        }, 1);
    } else if (browMemory.getItem("open") === "false") {
        browMemory.setItem("open", true);
        console.log("execute false");
        navBtn.classList.remove("opened");
        animateNav.classList.add("animate__nav");
        setTimeout(() => {
            navBtn.classList.add("closed");
            animateNav.classList.remove("animate__nav");
        }, 1);
    }
}
if (navBtn) {
    navBtn.onclick = function () {
        if (browMemory.getItem("open") === null) {
            browMemory.setItem("open", true);
        }
        btnOpenClose();
    };
}

window.onload = function () {
    if (browMemory.getItem("open") === "true") {
        btnOpenClose();
    }
};
