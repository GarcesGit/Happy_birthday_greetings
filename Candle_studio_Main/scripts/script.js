"use strict";

let submitBtn = document.querySelector(".submit__btn");
let inputName = document.querySelector(".input__name");
let inputBirthday = document.querySelector(".input__birthday");
let happyBirthday = document.querySelector(".happy__birthday");
let happyText = document.querySelector(".happy__text");
let timer = document.querySelector(".timer");
let accordeon = document.querySelector(".accordeon");
let accordeonTitles = accordeon.querySelectorAll(".accordeon__title");

const openAccordeon = () => {
    accordeonTitles.forEach.call(accordeonTitles, function (accordeonTitle) {
        accordeonTitle.addEventListener("click", function () {
            let currentText =
                accordeonTitle.parentElement.querySelector(".accordeon__text");

            accordeonTitle.classList.toggle("accordeon__title--active");
            currentText.classList.toggle("accordeon__text--visible");

            if (currentText.classList.contains("accordeon__text--visible")) {
                currentText.style.maxHeight = currentText.scrollHeight + "px";
            } else {
                currentText.style.maxHeight = null;
            }
        });
    });
};
openAccordeon();

const openMenu = () => {
    let menuBtn = document.querySelector(".menu__btn");
    let menuMobile = document.querySelector(".header__menu-list");

    menuBtn.addEventListener("click", () => {
        menuMobile.classList.toggle("menu--open");
    });
};
openMenu();

const useSlider = () => {
    const swiper = new Swiper(".feedback__slider", {
        loop: true,

        pagination: {
            el: ".swiper-pagination",
        },
    });
};
useSlider();

const submitData = () => {
    submitBtn.addEventListener("click", (event) => {
        recordUserName(inputName.value);
        recordUserBirthday(inputBirthday.value);

        inputName.value = "";
        inputBirthday.value = "";

        event.preventDefault();
    });
};
submitData();

const recordUserName = (value1) => {
    let uName = localStorage.getItem("uName");
    if (!uName) {
        localStorage.setItem("uName", value1);
    }
    let name = localStorage.getItem("uName");

    return name;
};

const recordUserBirthday = (value2) => {
    let uBirthday = localStorage.getItem("uBirthday");
    if (!uBirthday) {
        localStorage.setItem("uBirthday", value2);
    }
    let birthday = localStorage.getItem("uBirthday");

    return birthday;
};

const convertDate = (value) => {
    let [year, month, day] = value.split(".").reverse();
    month = month - 1;
    let today = new Date();
    year = today.getFullYear();
    let date = new Date(year, month, day);
    return date;
};

const setCountdown = (birthday) => {
    let today = new Date();
    let days = Math.ceil((birthday - today) / 3600000);
    let showDays = Math.trunc((birthday - today) / 86400000 + 1);
    timer.textContent = "До дня рождения: " + showDays + " дней";
    let text = timer.textContent;
    let split = text.split(" ");
    if (!split.includes("NaN")) {
        timer.classList.remove("hidden");
        let timerId = setInterval(function () {
            --days;
            timer.textContent = "До дня рождения: " + showDays + " дней";

            if (days <= 0) {
                clearInterval(timerId);
                timer.textContent = "";
                congratulateUser();
            }
        }, 3600000);
    }
};
setCountdown(convertDate(recordUserBirthday(inputBirthday.value)));

const congratulateUser = () => {
    let name = recordUserName(inputName.value);
    let congratulation = `Дорогой(ая) ${name}! Поздравляем вас с днем рождения! Желаем самого светлого и радостного настроения, прекрасного здоровья и больше счастливых моментов!`;

    happyText.innerHTML = congratulation;
    happyBirthday.classList.remove("hidden");

    window.addEventListener("click", (event) => {
        if (event.target !== submitBtn) {
            happyBirthday.classList.add("hidden");
        }
    });
};
