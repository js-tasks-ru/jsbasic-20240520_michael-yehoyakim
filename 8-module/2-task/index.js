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
    for (let key in this.filters) {
      if (key in filters) {
        this.filters[key] = filters[key];
      }
    }

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
      filteredGrid = filteredGrid.filter(product => product.vegeterian === true);
    }

    this.products = filteredGrid;
    this.elem = this.render();
  }

  template() {
    const htmlPrefix = `<div class="products-grid">
                            <div class="products-grid__inner">`;

    const htmlSuffix = '</div></div>';

    const productsHtml = this.products.map(product => new ProductCard(product).elem.outerHTML).join('');

    return htmlPrefix + productsHtml+ htmlSuffix;

  }

  render() {
    this.elem = createElement(this.template());
    return this.elem;
  }
}
