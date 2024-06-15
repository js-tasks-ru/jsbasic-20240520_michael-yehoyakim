import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;

  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  template () {
    const imagesPath = '/assets/images/carousel/'
    const currency_symbol = '€';

    const htmlPrefix = `
       <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
    `;

    const htmlSuffix = '</div></div></div>';

    let htmlSlides = this.slides.map(slide => {
      return `
      <div class="carousel__slide" data-id=${slide.id}>
        <img src=${imagesPath + slide.image} class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">${slide.price}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `
    }).join('');

    return htmlPrefix + htmlSlides + htmlSuffix;
  }

  render () {
    this.elem = createElement(this.template());
    this.initCarousel();

    this.elem.addEventListener('click', this.onclickCarouselButton);

    return this.elem;
  }

  onclickCarouselButton =  (event) => {
    const carouselButton = event.target.closest('.carousel__button');
    const slideElement = event.target.closest('carousel__slide');
    if (!carouselButton || !slideElement) return;

    const addProductEvent = new CustomEvent("product-add", {
      detail: slideElement.dataset.id,
      bubbles: true
    });

    this.elem.dispatchEvent(addProductEvent);
  };

  initCarousel() {

    const innerCarouselElement = this.elem.querySelector(".carousel__inner");

    let arrowRightElement = this.elem.querySelector(".carousel__arrow_right");
    let arrowLeftElement = this.elem.querySelector(".carousel__arrow_left");

    // initial state
    arrowLeftElement.style.display = 'none';

    arrowLeftElement.addEventListener("click", () => {
      arrowRightElement.style.display = '';

      let transform = getComputedStyle(innerCarouselElement).transform;
      let move = new DOMMatrix(transform).m41;
      move += innerCarouselElement.offsetWidth;
      innerCarouselElement.style.transform = 'translateX(' + move + 'px)';

      if (move === 0) {
        arrowLeftElement.style.display = 'none';
      }
    });

    arrowRightElement.addEventListener("click", () => {
      arrowLeftElement.style.display = '';

      let transform = getComputedStyle(innerCarouselElement).transform;
      let move = new DOMMatrix(transform).m41;
      move -= innerCarouselElement.offsetWidth;
      innerCarouselElement.style.transform = 'translateX(' + move + 'px)';

      if (move === -(this.slides.length -1)*innerCarouselElement.offsetWidth) {
        arrowRightElement.style.display = 'none';
      }

    });
  }


}
