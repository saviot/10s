import Popup from './Popup.js'; // Import the Popup class from the file

export default class PopupWithForm extends Popup {
  constructor(id, {handleFormSubmit}) {
    super(id);
    this.handleFormSubmit = handleFormSubmit;
    this.form = this.modal.querySelector('form');

    // Bind the submit event listener to the form
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = this._getInputValues();
      this.handleFormSubmit(formData).then(() => {
        this.close();
        document
          .getElementById('modal')
          .querySelector('.modal__button').textContent = 'Simpan';
        document
          .getElementById('modalCreateCard')
          .querySelector('.modal__button').textContent = 'Simpan';
      });

      this.form.reset();
    });
  }

  _getInputValues() {
    const formData = {};
    const inputs = this.form.querySelectorAll('input');
    inputs.forEach((input) => {
      formData[input.name] = input.value;
    });
    return formData;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
