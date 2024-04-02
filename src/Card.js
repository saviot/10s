import PopupWithImage from './PopupWithImages.js';
import api from './Api.js';
import Popup from './Popup.js';

export default class Card {
  constructor(link, name, likes, card_id) {
    this.user_id = document.body.id;
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._cardId = card_id;
    this._cardElement = '';
    this.api = new api();
    this.modal_confirm = new Popup('modalConfirmDelete');
  }

  createCardHtml() {
    const cardTemplate = document.getElementById('card-template');
    const cardClone = cardTemplate.content.cloneNode(true);
    const cardImage = cardClone.querySelector('.card__image img');
    const cardTitle = cardClone.querySelector('.card__info-title');
    const cardLikes = cardClone.querySelector('.card__like');

    cardClone.querySelector('.card__item').setAttribute('id', this._cardId);
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    cardLikes.textContent = this._likes.length;

    this._cardElement = cardClone;

    this.setEventListener();
    this.checkKnowLikeCard();
  }

  setEventListener() {
    const parent = this._cardElement.querySelector('.card__item');
    const activeCardIcon =
      this._cardElement.querySelector('.card__icon.active');
    const xCardIcon = this._cardElement.querySelector('.card__icon-x');
    const cardImage = this._cardElement.querySelector('.card__image img');
    const cardDelete = this._cardElement.querySelector('.card__delete');

    cardImage.addEventListener('click', () =>
      this.handleCardClick(this._link, this._name),
    );
    activeCardIcon.addEventListener('click', () =>
      this.toggleSvgLove(activeCardIcon, xCardIcon, parent),
    );
    xCardIcon.addEventListener('click', () =>
      this.toggleSvgLove(activeCardIcon, xCardIcon, parent),
    );

    // DELETE CARD
    const confirmDeleteHandler = async () => {
      await this.deleteCard(parent);
      this.modal_confirm.close();
      document
        .querySelector('#modalConfirmDelete')
        .querySelector('.modal__button')
        .removeEventListener('click', confirmDeleteHandler);
    };

    cardDelete.addEventListener('click', () => {
      this.modal_confirm.open();
      document
        .querySelector('#modalConfirmDelete')
        .querySelector('.modal__button')
        .addEventListener('click', confirmDeleteHandler);
    });
  }

  checkKnowLikeCard() {
    const user_id = document.body.id;
    const activeCardIcon =
      this._cardElement.querySelector('.card__icon.active');
    const xCardIcon = this._cardElement.querySelector('.card__icon-x');
    this._likes.forEach((like) => {
      if (like._id === user_id) {
        activeCardIcon.classList.remove('active');
        xCardIcon.classList.add('active');
      } else {
        xCardIcon.classList.remove('active');
        activeCardIcon.classList.add('active');
      }
    });
  }

  async deleteCard(card) {
    console.log(card.id);
    await this.api.deleteCard(card.id).then((data, res) => {
      if (data === 'This post has been deleted') {
        card.remove();
      }
    });
  }

  toggleSvgLove(activeCardIcon, xCardIcon, parent) {
    const cardLikes = parent.querySelector('.card__like');
    if (activeCardIcon.classList.contains('active')) {
      activeCardIcon.classList.remove('active');
      xCardIcon.classList.add('active');

      // add like
      this.api.likeCard(parent.id);

      // imediately add like
      cardLikes.textContent = parseInt(cardLikes.textContent) + 1;
    } else {
      xCardIcon.classList.remove('active');
      activeCardIcon.classList.add('active');

      // remove like
      this.api.dislikeCard(parent.id);

      // imediately remove like
      cardLikes.textContent = parseInt(cardLikes.textContent) - 1;
    }
  }

  handleCardClick(link, name) {
    const modalPreviewImage = new PopupWithImage('modalImagePreview');
    modalPreviewImage.open(link, name);
  }
}
