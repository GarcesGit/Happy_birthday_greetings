'use strict';

let submitBtn = document.querySelector('.submit__btn');
let inputName = document.querySelector('.input__name');
let inputBirthday = document.querySelector('.input__birthday');
let happyBirthday = document.querySelector('.happy__birthday');
let happyText = document.querySelector('.happy__text');
let timer = document.querySelector('.timer');

const openMenu = () => {
    let menuBtn = document.querySelector('.menu__btn');
    let menuMobile = document.querySelector('.header__menu-list');

    menuBtn.addEventListener('click', () => {
        menuMobile.classList.toggle('menu--open');
    });
}
openMenu();

const useSlider = () => {
    const swiper = new Swiper('.feedback__slider', {
        loop: true,

        pagination: {
            el: '.swiper-pagination',
        },
    });
}
useSlider();

const submitData = () => {
    submitBtn.addEventListener('click', (event) => {
        recordUserName(inputName.value);
        recordUserBirthday(inputBirthday.value);

        inputName.value = '';
        inputBirthday.value = '';

        event.preventDefault();
    });
}
submitData();

const recordUserName = (value1) => {
    let uName = localStorage.getItem('uName');
    if (!uName) { 
        localStorage.setItem('uName', value1);
    }
    let name = localStorage.getItem('uName');

    return name;
}

const recordUserBirthday = (value2) => {
    let uBirthday = localStorage.getItem('uBirthday');
    if (!uBirthday) { 
        localStorage.setItem('uBirthday', value2);
    }
    let birthday = localStorage.getItem('uBirthday');

    return birthday;
}

const convertDate = (value) => {
    let [year, month, day] = value.split('.').reverse();
    month = month-1;
    let date = new Date(year, month, day);

    return date;
}

console.log(recordUserName(inputName.value));///////////////
console.log(recordUserBirthday(inputBirthday.value));///////////////


const setCountdown = (birthday) => {
    let today = new Date();
    let days = Math.floor((birthday - today)/86400000);
console.log(days);///////////////

    timer.textContent = 'До дня рождения: ' + days + ' дней';
    let text = timer.textContent;
    let split = text.split(' ');

    if (!split.includes('NaN') ){
        timer.classList.remove('hidden');
        let timerId = setInterval(function() {
            --days;
            timer.textContent = 'До дня рождения: ' + days + ' дней';

            if (days <= 0) {
                clearInterval(timerId);
                timer.textContent = '';
                congratulateUser();
            }
        }, 10000); //86400000
    }
}
setCountdown(convertDate(recordUserBirthday(inputBirthday.value)));

const congratulateUser = () => {
    let name = recordUserName(inputName.value);
    let congratulation = `Дорогой(ая) ${name}! Поздравляем вас с днем рождения! Желаем самого светлого и радостного настроения, прекрасного здоровья и больше счастливых моментов!`;

    happyText.innerHTML = congratulation;    
    happyBirthday.classList.remove('hidden');

    window.addEventListener('click', (event) => {
        if (event.target !== submitBtn){
            happyBirthday.classList.add('hidden');
        }
    });
}

localStorage.clear();


