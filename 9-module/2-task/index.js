import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';
import createElement from "../../assets/lib/create-element";

export default class Main {
  elem = null;

  constructor() {
    this.elem = this.render();
  }

  async render() {
    let mainElement = createElement(this.template());

    let carousel = new Carousel(slides);
    let ribbonMenu = new RibbonMenu(categories);
    let stepSlider = new StepSlider(5, -3);
    let cartIcon = new CartIcon();
    let cart = new Cart(cartIcon);

    mainElement.querySelector('[data-carousel-holder]').append(carousel.elem);
    mainElement.querySelector('[data-ribbon-holder]').append(ribbonMenu.elem);
    mainElement.querySelector('[data-slider-holder]').append(stepSlider.elem);
    mainElement.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);

    let response = fetch('products.json', {
      method: 'GET'
    });

    let json = await response.json;
    let products = JSON.parse(json);

    mainElement.querySelector('[data-products-grid-holder]').innerHTML = '';

    let productGrid = new ProductsGrid(products);
    mainElement.querySelector('[data-products-grid-holder]').append(productGrid.elem);

    return mainElement;

  }

  template() {
    let mainHTML = `
      <main>
        <div class="container" data-carousel-holder></div>

        <div class="container">
          <h2 class="section-heading">
            Our Menu
          </h2>
          <div data-ribbon-holder></div>
        </div>

        <div class="container">
          <div class="filters">
            <div class="filters__inner">
              <div class="filters__group">
                <label class="filters__label">Max spiciness</label>
                <div class="filters__slider" data-slider-holder></div>
              </div>
              <div class="filters__group">
                <div class="filters__checkbox">
                  <input
                    class="styled-checkbox"
                    id="nuts-checkbox"
                    type="checkbox"
                    value="1"
                  >
                  <label for="nuts-checkbox">
                    <span class="filters__label">No nuts</span>
                  </label>
                </div>
              </div>
              <div class="filters__group">
                <div class="filters__checkbox">
                  <input
                    class="styled-checkbox"
                    id="vegeterian-checkbox"
                    type="checkbox"
                    value="1"
                  >
                  <label for="vegeterian-checkbox">
                    <span class="filters__label">Vegeterian only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container" data-products-grid-holder>
          <div class="products-grid is-loading">
            <div class="products-grid__skeleton">
              <div class="products-grid__skeleton-item"></div>
              <div class="products-grid__skeleton-item"></div>
              <div class="products-grid__skeleton-item"></div>
              <div class="products-grid__skeleton-item"></div>
              <div class="products-grid__skeleton-item"></div>
              <div class="products-grid__skeleton-item"></div>
            </div>
            <div class="products-grid__inner"></div>
          </div>
        </div>
      </main>
    `;

    return mainHTML;
  }

}
