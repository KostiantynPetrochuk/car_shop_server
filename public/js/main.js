'use strict';

//--- constants ---//
const DROPDOWN_CLASS_NAME = '.hero-top-filter-dropdown';
const DROPDOWN_ITEM_CLASS_NAME = '.hero-top-filter-dropdown-item';
const ALL_MAKES = 'all_makes';
const HIDE_CLASS = 'hide';

//--- main ---//
const filterItems = document.querySelectorAll('.hero-top-filter');

filterItems.forEach((filterItem, index) => {
  filterItem.addEventListener('click', function (event) {
    closeOtherDropdowns(filterItems, index);
    const dropdown = filterItem.querySelector(DROPDOWN_CLASS_NAME);
    dropdown.classList.toggle('active');

    if (event.target.classList.contains('hero-top-filter-dropdown-item')) {
      handleDropdownItemClick(event, filterItems, index);
    }
  });
});

document.addEventListener('click', closeAllDropdowns);

//--- functions ---//

function closeOtherDropdowns(filterItems, currentIndex) {
  filterItems.forEach((otherFilterItem, otherIndex) => {
    if (otherIndex !== currentIndex) {
      const otherDropdown = otherFilterItem.querySelector(DROPDOWN_CLASS_NAME);
      otherDropdown.classList.remove('active');
    }
  });
}

function closeAllDropdowns(event) {
  const currentTarget = event.target;
  if (!currentTarget.closest('.hero-top-filter')) {
    filterItems.forEach((filterItem) => {
      const dropdown = filterItem.querySelector(DROPDOWN_CLASS_NAME);
      dropdown.classList.remove('active');
    });
  }
}

function handleDropdownItemClick(event, filterItems, index) {
  const currentValue = event.target.dataset.value;
  const currentText = event.target.innerText.trim();
  const dropdown = event.target.parentNode;
  const valueElement = dropdown.previousElementSibling;
  const hiddenInput = dropdown.nextElementSibling;
  const prevInputValue = hiddenInput.value;

  hiddenInput.value = currentValue;
  valueElement.textContent = currentText;

  if (hiddenInput.name === 'make') {
    updateModelDropdown(filterItems[2], currentValue, prevInputValue);
  }
}

function updateModelDropdown(modelFilterItem, currentValue, prevInputValue) {
  const modelsList = modelFilterItem.querySelectorAll(DROPDOWN_ITEM_CLASS_NAME);
  const modelsValue = modelFilterItem.querySelector('.hero-top-filter-value');
  const modelsInput = modelFilterItem.querySelector('input');

  if (prevInputValue !== currentValue) {
    clearModelsSelect(modelsInput, modelsValue);
  }

  modelsList.forEach((modelItem) => {
    const shouldShowModel =
      modelItem.dataset.make === currentValue || currentValue === ALL_MAKES;
    toggleModelVisibility(modelItem, shouldShowModel);
  });
}

function toggleModelVisibility(modelItem, shouldShow) {
  if (shouldShow) {
    modelItem.classList.remove(HIDE_CLASS);
  } else {
    modelItem.classList.add(HIDE_CLASS);
  }
}

function clearModelsSelect(modelsInput, modelsValue) {
  modelsInput.value = 'all_models';
  modelsValue.textContent = 'All Models';
}

/* Swiper */
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 4,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    650: {
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
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
