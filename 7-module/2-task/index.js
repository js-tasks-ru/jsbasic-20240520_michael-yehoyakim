import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null;
  title = '';

  constructor() {
    this.render();
  }

  template() {
    const modalHTML = `
     <div class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">

          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title"></h3>

        </div>

        <div class="modal__body"></div>
      </div>
    </div>
    `;

    return modalHTML;
  }

  render() {
    this.elem = createElement(this.template());
    this.elem.querySelector('.modal__close').addEventListener('click', this.onClickCloseButton);
    document.body.addEventListener('keydown', this.onEscape);
    return this.elem;
  }

  open() {
    document.body.append(this.elem);
    if (!document.body.classList.contains('is-modal-open')) {
      document.body.classList.add('is-modal-open');
    }
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    const modalBodyElement = this.elem.querySelector('.modal__body');
    modalBodyElement.innerHTML = "";
    modalBodyElement.append(node);
  }

  removeModal() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
  }

  onClickCloseButton = (event) => {
    if (!event.target.closest('.modal__close')) {
      return;
    }

    this.removeModal();

  };

  onEscape = (event) => {
    if (event.code !== 'Escape') {
      return;
    }

    this.removeModal();
  };

  close() {
    this.removeModal();
  }
}
