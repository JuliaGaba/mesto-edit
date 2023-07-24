export default class FormValidator {
  constructor(config, form) {
    this.config = config;
    this.form = form;
    //как в пятой строчке по аналогии сделать
    this.formsList = this.form.querySelectorAll(this.config.inputSelector);
    //тут поменяла
    this.submitButtonElement = this.form.querySelector(
      this.config.submitButtonSelector
    );
  }
  // показ ошибки
  showError(inputElement, errorElement) {
    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  // прячет ошибку
  hideError(inputElement, errorElement) {
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  // блок кнопки
  disabledButton() {
    this.submitButtonElement.disabled = "disabled";
    this.submitButtonElement.classList.add(this.config.inactiveButtonClass);
  }
  // разблок кнопки
  enabledButton() {
    this.submitButtonElement.disabled = false;
    this.submitButtonElement.classList.remove(this.config.inactiveButtonClass);
  }
  // переключает состояние кнопки
  toggleButtonState(isActive) {
    if (!isActive) {
      this.disabledButton(this.submitButtonElement, this.config);
    } else {
      this.enabledButton(this.submitButtonElement, this.config);
    }
  }
  // Добавление слушатели на кажду форму
  setEventListener() {
    this.disabledButton(this.submitButtonElement, this.config);
    this.formsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const boolBtn = !Array.from(this.formsList)
          .map((item) => item.checkValidity())
          .includes(false);
        this.toggleButtonState(boolBtn);
        this.checkInputValidity(inputElement);
      });
    });
  }
  // Запуск валидации
  enableValidation() {
    this.setEventListener();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.disabledButton(this.submitButtonElement, this.config);
    });
  }
  // Проверяет валидные поля
  checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = this.form.querySelector(`#${inputElement.name}-error`);
    if (!isInputValid) {
      this.showError(inputElement, errorElement, this.config);
    } else {
      this.hideError(inputElement, errorElement, this.config);
    }
  }
}
