import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';
import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';
import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';
import createElement from '../../assets/lib/create-element.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  elem = null;

  constructor() {
    this.elem = this.render();
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

  async render() {
    let mainElement = createElement(this.template());

    let carousel = new Carousel(slides);
    let ribbonMenu = new RibbonMenu(categories);
    let stepSlider = new StepSlider(5, -3);
    let cartIcon = new CartIcon();
    let cart = new Cart(cartIcon);

    document.querySelector('[data-carousel-holder]').append(carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);

    let response = await fetch('products.json', {
      method: 'GET'
    });

    let products = await response.json();

    document.querySelector('[data-products-grid-holder]').innerHTML = '';

    let productsGrid = new ProductsGrid(products);

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });

    document.querySelector('[data-products-grid-holder]').append(productsGrid.elem);

    // handle click events
    document.body.addEventListener('product-add', (event) => {
      const product = products.find(p => p.id === event.detail);
      if (product) {
        cart.addProduct(product);
      }
    });

    stepSlider.elem.addEventListener('slider-change', (event) => {
      productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      productsGrid.updateFilter({
        category: event.detail
      });
    });

    document.body.addEventListener('change', (event) => {
      let nutsChange = document.getElementById('nuts-checkbox');
      let vegeterianChange = document.getElementById('vegeterian-checkbox');

      if (event.target === nutsChange) {
        productsGrid.updateFilter({
          noNuts: nutsChange.checked
        });
      }

      if (event.target === vegeterianChange) {
        productsGrid.updateFilter({
          vegeterianOnly: vegeterianChange.checked
        });
      }
    });

    return mainElement;
  }

}
