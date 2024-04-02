export default class Popup {
  constructor(id) {
    this.modal = document.getElementById(id);
    this.closeButton = this.modal.querySelector('.modal__close');
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeButton.addEventListener('click', this.close);

    // Add event listener to close modal when clicking outside of it
    window.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });

    // Add event listener to close modal when pressing the Escape key
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add('modal-show'); // Add the 'modal-show' class
    this.modal.style.display = 'flex';
  }

  close() {
    this.modal.classList.remove('modal-show'); // Remove the 'modal-show' class
    this.modal.style.display = 'none';

    // Remove event listener from close button
    this.closeButton.removeEventListener('click', this.close);
  }
}
