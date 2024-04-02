export default class FormValidator {
  constructor(config) {
    this.config = config;

    this.enableValidation();
  }

  enableValidation() {
    const forms = document.querySelectorAll(this.config.formSelector);

    forms.forEach((form) => {
      const inputElements = form.querySelectorAll(this.config.inputSelector);
      const buttonDisabledElement = form.querySelector(
        this.config.submitButtonSelector,
      );

      form.addEventListener('submit', function (event) {
        event.preventDefault();
      });

      inputElements.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          const errorMessageElement =
            inputElement.parentElement.nextElementSibling;
          if (!inputElement.checkValidity()) {
            errorMessageElement.style.opacity = 1;
            inputElement.parentElement.classList.add(
              this.config.inputErrorClass,
            );
            buttonDisabledElement.classList.add(
              this.config.inactiveButtonClass,
            );
            errorMessageElement.textContent = inputElement.validationMessage;
          } else {
            errorMessageElement.style.opacity = 0;
            inputElement.parentElement.classList.remove(
              this.config.inputErrorClass,
            );
            buttonDisabledElement.classList.remove(
              this.config.inactiveButtonClass,
            );
            errorMessageElement.textContent = '';
          }
        });
      });
    });
  }
}
