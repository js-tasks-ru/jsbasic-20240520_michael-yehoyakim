import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null

  constructor(products) {
    this.products = products;
    this.filters = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 0,
      category: null
    };
    this.elem = this.render();
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);

    let filteredGrid = this.products;

    if (this.filters.category) {
      filteredGrid = filteredGrid.filter(product => product.category === this.filters.category);
    }
    if (this.filters.noNuts) {
      filteredGrid = filteredGrid.filter(product => ("nuts" in product && !product.nuts) || !("nuts" in product));
    }
    if (this.filters.maxSpiciness) {
      filteredGrid = filteredGrid.filter(product => product.spiciness <= this.filters.maxSpiciness);
    }
    if (this.filters.vegeterianOnly) {
      filteredGrid = filteredGrid.filter(product => product.vegeterian);
    }

    this.products = filteredGrid;
    this.elem = this.render();
  }

  template() {
    const htmlPrefix = `<div class="products-grid">
                            <div class="products-grid__inner">`;

    const htmlSuffix = '</div></div>';

    return htmlPrefix + htmlSuffix;

  }

  render() {
    this.elem = createElement(this.template());
    let productsGrid = this.elem.querySelector('.products-grid__inner');
    for (let product of this.products) {
      let renderedProduct = new ProductCard(product);
      productsGrid.append(renderedProduct.elem);
    }
    return this.elem;
  }
}
