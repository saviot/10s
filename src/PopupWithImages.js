export default class PopupWithImage {
  constructor(id) {
    this.modal = document.getElementById(id);
    this.closeButton = this.modal.querySelector('.modal__close');
    this.previewImage = this.modal.querySelector('#previewImage');
    this.namaImage = this.modal.querySelector('#namaImage');
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

  open(imageSrc, imageName) {
    this.previewImage.src = imageSrc;
    this.namaImage.textContent = imageName;
    this.modal.style.display = 'flex';
  }

  close() {
    this.modal.style.display = 'none';
  }
}
