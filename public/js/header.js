"use strict";

const burger = document.querySelector(".header-burger");
const mobileMenu = document.querySelector(".mobile-menu");
const body = document.querySelector("body");
burger.addEventListener("click", function () {
  this.classList.toggle("opened");
  mobileMenu.classList.toggle("active");
  body.classList.toggle("freezed");
});
