import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;

  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }

  template() {

    const ribbonsHTMLPrefix = `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
    `;

    const ribbonHTMLSuffix =
      `
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
      `;

    const ribbonsHTML = this.categories.map(item => {
      return `<a href="#" class="ribbon__item" data-id=${item.id}>${item.name}</a>`
    });

    return ribbonsHTMLPrefix + ribbonsHTML + ribbonHTMLSuffix

  }

  render() {
    this.elem = createElement(this.template());

    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');

    // initial state:
    arrowLeft.classList.remove('ribbon__arrow_visible');

    this.elem.addEventListener('click', this.onClickArrow);
    this.elem.addEventListener('click', this.onClickCategory);

    return this.elem;

  }

  onClickCategory = (event) => {
    if (!event.target.classList.contains('ribbon__item')) {
      return;
    }

    this.elem.ondragstart = (event) => event.preventDefault();

    const currentActiveCategory = event.target.closest('ribbon__item_active');
    if (currentActiveCategory) {
      currentActiveCategory.classList.remove('ribbon__item_active');
    }

    event.target.classList.add('ribbon__item_active');

    const categorySelectionEvent = new CustomEvent('ribbon-select', {
      detail: event.target.dataset.id,
      bubbles: true
    });

    this.elem.dispatchEvent(categorySelectionEvent);

  };

  onClickArrow = (event) => {
    const button = event.target.closest('button');
    if (!button) {
      return;
    }

    const scrollDistance = 350;
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    let scrollLeft = ribbonInner.scrollLeft;

    // right
    if (button.classList.contains('ribbon__arrow_right')) {
      ribbonInner.scrollBy(scrollDistance, 0);

      if (!arrowLeft.classList.contains('ribbon__arrow_visible')) {
        arrowLeft.classList.add('ribbon__arrow_visible');
      }

      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollRight === 0) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      }
    }

    // left
    if (button.classList.contains('ribbon__arrow_left')) {
      ribbonInner.scrollBy(-scrollDistance, 0);

      if (!arrowRight.classList.contains('ribbon__arrow_visible')) {
        arrowRight.classList.add('ribbon__arrow_visible');
      }

      if (scrollLeft === 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      }
    }
  };
}

