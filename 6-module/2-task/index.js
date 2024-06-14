import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  elem = null;

  name = null;
  price = 0;
  category = null;
  image = null;
  id = null;

  constructor(product) {
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
    this.image = product.image;
    this.id = product.id;

    this.elem = this.render();


  }

  template () {
    const images_path = '/assets/images/products/'
    const currency_symbol = '€';

    const product = `
      <div class="card">
        <div class="card__top">
          <img src=${images_path+this.image} class="card__image" alt="product">
          <span class="card__price">${currency_symbol+this.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
    </div>
    `
    return product;
  }

  onClickAddToCard = (event) => {
    if (event.target.parentElement.className != 'card__button') {
      return;
    }

    const addProductEvent = new CustomEvent('product-add', {
      detail: this.id,
      bubbles: true
    });

    event.target.dispatchEvent(addProductEvent);

  }

  render() {
    this.elem = createElement(this.template());

    this.elem.addEventListener('click', this.onClickAddToCard);

    return this.elem;
  }
}

