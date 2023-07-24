import FormValidator from "../components/FormValidator.js";
import initialCards from "./initialcards.js";
import Card from "../components/Card.js";
const popups = document.querySelectorAll(".popup");
const popupEditCard = document.querySelector(".popup_type_edit-card");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupPhoto = document.querySelector(".popup_type_photo");
const buttonsListClosePopup = document.querySelectorAll(".popup__close");
const formProfile = document.querySelector(".popup__form_edit");
const formAddCard = document.querySelector(".popup__form_add");
const nameInput = document.querySelector(".popup__input_type_title");
const jobInput = document.querySelector(".popup__input_type_subtitle");
const buttonOpenPopupEdit = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const buttonOpenAddPopup = document.querySelector(".profile__add-button");
const popupImg = popupPhoto.querySelector(".popup__image");
const popupTitle = popupPhoto.querySelector(".popup__title-photo");
const nameCard = document.querySelector(".popup__input_type_title-card");
const urlCard = document.querySelector(".popup__input_type_subtitle-card");
const cardListElement = document.querySelector(".elements__grid");
const [closeEditCard, closepopupAddCard, closepopupPhoto] =
  buttonsListClosePopup;

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_invalid",
  inputErrorClass: "popup__input_state_invalid",
  errorClass: "error",
};

const validProfile = new FormValidator(config, formProfile);
validProfile.enableValidation();
const validCard = new FormValidator(config, formAddCard);
validCard.enableValidation();

function openPopup(item) {
  item.classList.add("popup_opened");
  document.addEventListener("keydown", handleKeydownPopupClose);
}

function handleKeydownPopupClose(evt) {
  if (evt.key === "Escape") {
    const item = document.querySelector(".popup_opened");
    closePopup(item);
  }
}


function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditCard);
}

function openPopupAdd() {
  openPopup(popupAddCard);
}
// открытие фотки с описанием
function openPopupCard(img, title) {
  popupImg.src = img;
  popupImg.alt = title;
  popupTitle.textContent = title;
  openPopup(popupPhoto);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleKeydownPopupClose);
}

function setProfile() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function closeOverlay() {
  popups.forEach((item) =>
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup")) {
        closePopup(e.target);
      }
    })
  );
}

function handleFormSubmitProfile(e) {
  e.preventDefault();
  setProfile();
  closePopup(popupEditCard);
}

function createCard(name, value, dir) {
  const cardElement = new Card(name, value, dir, openPopupCard);
  renderCard(cardElement.returnCard());
  return cardElement;
}

function renderCard(cardElement) {
  cardListElement.prepend(cardElement);
}

function handleFormSubmitCard(e) {
  e.preventDefault();
  const valueName = nameCard.value;
  const valueUrl = urlCard.value;
  createCard(valueName, valueUrl, "#template-elements");
  closePopup(popupAddCard);
  formAddCard.reset();
}

initialCards.reverse().forEach(function (item) {
  createCard(item.name, item.link, "#template-elements");
});

closeOverlay();

closeEditCard.addEventListener("click", () => closePopup(popupEditCard));
closepopupAddCard.addEventListener("click", () => closePopup(popupAddCard));
closepopupPhoto.addEventListener("click", () => closePopup(popupPhoto));
buttonOpenPopupEdit.addEventListener("click", openEditPopup);
formProfile.addEventListener("submit", handleFormSubmitProfile);
formAddCard.addEventListener("submit", handleFormSubmitCard);
buttonOpenAddPopup.addEventListener("click", openPopupAdd);
