import './blocks/index.css';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWIthForm.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import Api from './Api.js';

document.addEventListener('DOMContentLoaded', () => {
  const api = new Api();

  // ######### PROFILE #########
  (function () {
    const btnOpenModal = document.getElementById('openModalBtn');
    const userInfo = new UserInfo();
    const btnOpenModalAvatar = document.getElementById(
      'openModalUpdateAvatarBtn',
    );

    // edit profile
    (function () {
      btnOpenModal.addEventListener('click', function () {
        // editProfilePopup.open();
        const popupForm = new PopupWithForm('modal', {
          handleFormSubmit,
        });
        popupForm.open();

        // set value
        document
          .getElementById('modal')
          .querySelector('.modal__content')
          .querySelector('input[name="nama"]').value =
          userInfo.getUserInfo().nama;
        this.titleElement = document
          .getElementById('modal')
          .querySelector('.modal__content')
          .querySelector('input[name="title"]').value =
          userInfo.getUserInfo().title;
      });

      // update profile
      const handleFormSubmit = async (formData) => {
        document
          .getElementById('modal')
          .querySelector('.modal__button').textContent = 'Saving...';

        try {
          await userInfo.setUserInfo(formData);
        } catch (error) {
          console.error('Error occurred:', error);
        }
      };
    })();

    // edit avatar
    (function () {
      btnOpenModalAvatar.addEventListener('click', function () {
        const popupForm = new PopupWithForm('modalUpdateAvatar', {
          handleFormSubmit,
        });
        popupForm.open();
      });

      const handleFormSubmit = async (formData) => {
        document
          .getElementById('modalUpdateAvatar')
          .querySelector('.modal__button').textContent = 'Saving...';

        try {
          await api.updateAvatar(formData).then((data) => {
            userInfo._setUserInfo(data.name, data.avatar, data.about);
          });
        } catch (error) {
          console.error('Error occurred:', error);
        }
      };
    })();
  })();

  // ######### CARD #########
  (function () {
    // get data from api
    function getCard() {
      api.getAllCards().then((data) => {
        renderCards(data);
      });
    }

    // init card
    function renderCards(cardsData) {
      const initialCardsSection = new Section(
        {
          items: cardsData,
          renderer: (item) => {
            const card = new Card(item.link, item.name, item.likes, item._id);
            card.createCardHtml();
            if (item.link && item.name) {
              initialCardsSection.addItemToContainer(card._cardElement);
            }
          },
        },
        '.card__container',
      );

      // create card
      initialCardsSection.renderer();
    }

    // open create card
    const btnCreateCard = document.getElementById('openModalCardBtn');
    btnCreateCard.addEventListener('click', function () {
      const popupForm = new PopupWithForm('modalCreateCard', {
        handleFormSubmit,
      });
      popupForm.open();
    });

    // create new card
    const handleFormSubmit = async (formData) => {
      document
        .getElementById('modalCreateCard')
        .querySelector('.modal__button').textContent = 'Saving...';

      try {
        if (formData.link_gambar || formData.nama_tempat) {
          await api.createNewCard(formData).then((data) => {
            const card = new Card(data.link, data.name, data.likes, data._id);
            card.createCardHtml();
            const cardContainer = document.querySelector('.card__container');
            cardContainer.append(card._cardElement);
          });
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    // getCard
    getCard();
  })();

  // Run the enableValidation function
  new FormValidator({
    formSelector: '.form',
    inputSelector: '.input',
    submitButtonSelector: '.button',
    inactiveButtonClass: 'disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.error-message',
  });
});
