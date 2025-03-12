"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (
      selectedValue === filterItems[i].dataset.category.toLowerCase()
    ) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Project modal variables
const projectLinks = document.querySelectorAll("[data-project-link]");
const projectModalContainer = document.querySelector(
  "[data-project-modal-container]"
);
const projectModalCloseBtn = document.querySelector(
  "[data-project-modal-close-btn]"
);
const projectOverlay = document.querySelector("[data-project-overlay]");

// Project modal content variables
const modalProjectImg = document.querySelector("[data-modal-project-img]");
const modalProjectTitle = document.querySelector("[data-modal-project-title]");
const modalProjectCategory = document.querySelector(
  "[data-modal-project-category]"
);
const modalProjectDescription = document.querySelector(
  "[data-modal-project-description]"
);
const modalProjectLive = document.querySelector("[data-modal-project-live]");
const modalProjectGithub = document.querySelector(
  "[data-modal-project-github]"
);

// Project data is now imported from project-data.js

// Project modal toggle function
const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
};

// Add click event to all project items
for (let i = 0; i < projectLinks.length; i++) {
  projectLinks[i].addEventListener("click", function (e) {
    e.preventDefault();

    const project = projectData[i];

    modalProjectImg.src = project.imgSrc;
    modalProjectImg.alt = project.title;
    modalProjectTitle.textContent = project.title;
    modalProjectCategory.textContent = project.category;
    modalProjectDescription.innerHTML = `<p>${project.description}</p>`;

    // Display technology tags if available
    const techTagsContainer = document.querySelector(
      "[data-modal-project-technologies]"
    );
    techTagsContainer.innerHTML = "";
    if (project.technologies && project.technologies.length > 0) {
      const techWrapper = document.createElement("div");
      techWrapper.classList.add("tech-tags");
      project.technologies.forEach((tech) => {
        const tag = document.createElement("span");
        tag.classList.add("tech-tag");
        tag.textContent = tech;
        techWrapper.appendChild(tag);
      });
      techTagsContainer.appendChild(techWrapper);
    }

    // Set links
    if (project.liveLink !== "#") {
      modalProjectLive.href = project.liveLink;
      modalProjectLive.style.display = "inline-block";
    } else {
      modalProjectLive.style.display = "none";
    }

    if (project.githubLink !== "#") {
      modalProjectGithub.href = project.githubLink;
      modalProjectGithub.style.display = "inline-block";
    } else {
      modalProjectGithub.style.display = "none";
    }

    projectModalFunc();
  });
}

// Add click events to modal close button and overlay
projectModalCloseBtn.addEventListener("click", projectModalFunc);
projectOverlay.addEventListener("click", projectModalFunc);
