'use strict';

// === "Sort by" dropdown === //
const select = document.querySelector('.catalog-sort-select');
const dropdown = select.querySelector('.catalog-sort-select-dropdown');
select.addEventListener('click', function () {
  dropdown.classList.toggle('active');
});
const selectItems = document.querySelectorAll(
  '.catalog-sort-select-dropdown-item',
);
selectItems.forEach((selectItem) => {
  selectItem.addEventListener('click', (event) => {
    event.stopPropagation();
    const currentText = event.target.innerText.trim();
    select.querySelector('.catalog-sort-select-current').textContent =
      currentText;
    dropdown.classList.remove('active');
  });
});
document.addEventListener('click', function (event) {
  if (!select.contains(event.target)) {
    dropdown.classList.remove('active');
  }
});

//----

const filterButton = document.querySelector('.catalog-sort-filter');
const catalogForm = document.querySelector('.catalog-form');
const catalogFormBground = document.querySelector('.catalog-form-bg');

filterButton.addEventListener('click', () => {
  console.log('filter');
  catalogForm.classList.toggle('show');
  catalogFormBground.classList.toggle('show');
  document.querySelector('body').classList.toggle('freezed');
});

catalogFormBground.addEventListener('click', () => {
  catalogForm.classList.toggle('show');
  catalogFormBground.classList.toggle('show');
  document.querySelector('body').classList.toggle('freezed');
});

// закриття мобільних фільтрів
const mobCloseBtn = document.querySelector('.catalog-form-mob-title-cross');
console.log('mobCloseBtn', mobCloseBtn);
mobCloseBtn.addEventListener('click', () => {
  console.log('close mob filter');
  catalogForm.classList.toggle('show');
  catalogFormBground.classList.toggle('show');
  document.querySelector('body').classList.toggle('freezed');
});

//--- Динамічна обробка форм. До завантаження контенту ---//

// PC form

const pcForm = document.querySelector('.catalog-form');

pcForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {};
  // Обробити дані форми
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
    if (value === '') {
      return; // Ігноруємо порожні значення
    }
    if (data[key]) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  console.log(data);

  // Конвертувати об'єкт даних у query string
  const queryString = new URLSearchParams(data).toString();

  // Направити користувача до нової URL
  // window.location.href = `/catalog?${queryString}`;

  // Змінити url без перезавантаження сторінки
  window.history.pushState(null, '', `/catalog?${queryString}`);
});
