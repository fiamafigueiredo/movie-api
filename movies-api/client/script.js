const formModal = document.querySelector("#modalForm");
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnOpenModal = document.querySelector(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
};

const closeModal = function (e) {
  modal.classList.add("hidden");
};

btnOpenModal.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "escape") {
    closeModal();
  }
});
