"use strict";

const heroSwiper = new Swiper(".hero-swiper", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: ".hero-swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".hero-swiper-button-next",
    prevEl: ".hero-swiper-button-prev",
  },
});

const relatedSwiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 4,
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    560: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
