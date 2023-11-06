let menuBtn = document.querySelector('.menu__btn');
let menuMobile = document.querySelector('.header__menu-list');

menuBtn.addEventListener('click', ()=> {
    menuMobile.classList.toggle('menu--open');
});




const swiper = new Swiper('.feedback__slider', {
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
    },
    });