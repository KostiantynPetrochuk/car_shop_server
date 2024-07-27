"use strict";

// === "Sort by" dropdown === //
const select = document.querySelector(".catalog-sort-select");
const dropdown = select.querySelector(".catalog-sort-select-dropdown");
select.addEventListener("click", function () {
  dropdown.classList.toggle("active");
});
const selectItems = document.querySelectorAll(
  ".catalog-sort-select-dropdown-item"
);
selectItems.forEach((selectItem) => {
  selectItem.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentValue = event.target.dataset.sort;
    const currentText = event.target.innerText.trim();
    select.querySelector(".catalog-sort-select-current").textContent =
      currentText;
    dropdown.classList.remove("active");
  });
});
document.addEventListener("click", function (event) {
  if (!select.contains(event.target)) {
    dropdown.classList.remove("active");
  }
});

//--- Filters ---//
const filtersButton = document.querySelector(".catalog-sort-filter");
const mobileForm = document.querySelector(".catalog-form-mobile");
const catalogPageBody = document.querySelector("body");
const mobileMenuBackBtn = document.querySelector(
  ".catalog-form-mobile-header-back"
);

const mobileMenuBground = document.querySelector(
  ".catalog-form-mobile-backround"
);

filtersButton.addEventListener("click", () => {
  mobileForm.classList.add("show");
  catalogPageBody.classList.add("freezed");
  mobileMenuBground.classList.add("show");
});
const backButton = document.querySelector(".catalog-form-mobile-footer-back");
backButton.addEventListener("click", () => {
  mobileForm.classList.remove("show");
  catalogPageBody.classList.remove("freezed");
  mobileMenuBground.classList.remove("show");
});
mobileMenuBground.addEventListener("click", () => {
  mobileForm.classList.remove("show");
  catalogPageBody.classList.remove("freezed");
  mobileMenuBground.classList.remove("show");
});
mobileMenuBackBtn.addEventListener("click", () => {
  mobileForm.classList.remove("show");
  catalogPageBody.classList.remove("freezed");
  mobileMenuBground.classList.remove("show");
});

// показати меню конкретного фільтру на мобілці
const mobileFiltersList = document.querySelectorAll(
  ".catalog-form-mobile-filter"
);
const mobileFilterPageList = document.querySelectorAll(
  ".catalog-form-mobile-filter-list"
);
mobileFiltersList.forEach((mobFilter) => {
  mobFilter.addEventListener("click", () => {
    const currentFilterPage = [...mobileFilterPageList].find((filterPage) => {
      return filterPage.dataset.name === mobFilter.dataset.name;
    });
    currentFilterPage.classList.add("show");
  });
});

// закрити мобільний фільтр на кнопку < назад
const filterTitleBackButtons = document.querySelectorAll(
  ".catalog-form-mobile-filter-list-header-back"
);
filterTitleBackButtons.forEach((backTitleButton) => {
  backTitleButton.addEventListener("click", () => {
    backTitleButton.parentNode.parentNode.classList.remove("show");
  });
});

// закрити мобільний фільтр на кнопку back
const filterBackButtons = document.querySelectorAll(
  ".catalog-form-mobile-filter-list-footer-back"
);
filterBackButtons.forEach((backButton) => {
  backButton.addEventListener("click", () => {
    backButton.parentNode.parentNode.classList.remove("show");
  });
});

// при кліку на чекбокс, треба змінювати контент мобільних фільтрів в головному меню
const filterCheckboxes = document.querySelectorAll(
  ".catalog-filter-item-real-checkbox.mobile"
);

filterCheckboxes.forEach((filterCheckbox) => {
  filterCheckbox.addEventListener("change", () => {
    const filterName =
      filterCheckbox.parentNode.parentNode.parentNode.parentNode.dataset.name;
    const filterStringArr = [];
    filterCheckboxes.forEach((filterCheckbox) => {
      const nameSpan = filterCheckbox.parentNode.parentNode.querySelector(
        ".catalog-filter-item-info"
      );
      const label = nameSpan.innerHTML;

      if (
        filterName === filterCheckbox.dataset.category &&
        filterCheckbox.checked
      ) {
        filterStringArr.push(label);
      }
    });
    const filterString = filterStringArr.join(", ");
    const currentFilter = document.querySelector(
      `div.catalog-form-mobile-filter[data-name="${filterName}"]`
    );
    const currentFilterLabel = currentFilter.querySelector(
      ".catalog-form-mobile-filter-selected.ellipsis"
    );
    if (filterString.length) {
      currentFilterLabel.innerText = filterString;
    } else {
      currentFilterLabel.innerText = "All";
    }
  });
});

// === оновлювати стани чекбоксів, при зміні розміру вікна та форми === // todo:

//--- Динамічна обробка форм. До завантаження контенту ---//

// PC form

const pcForm = document.querySelector(".catalog-form");

pcForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {};
  // Обробити дані форми
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
    if (value === "") {
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
  window.history.pushState(null, "", `/catalog?${queryString}`);
});

// mobile form

mobileForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Зупинити стандартну відправку форми

  // Отримати дані форми
  const formData = new FormData(event.target);
  // console.log(formData);
  const data = {};

  // Обробити дані форми
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
    if (value === "") {
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
  window.history.pushState(null, "", `/catalog?${queryString}`);
});
