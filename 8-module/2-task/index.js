import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.filteredProducts = products; // Keep the original list of products
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

    this.filteredProducts = this.products;

    if (this.filters.category) {
      this.filteredProducts = this.filteredProducts.filter(product => product.category === this.filters.category);
    }
    if (this.filters.noNuts) {
      this.filteredProducts = this.filteredProducts.filter(product => !product.nuts);
    }
    if (this.filters.maxSpiciness) {
      this.filteredProducts = this.filteredProducts.filter(product => product.spiciness <= this.filters.maxSpiciness);
    }
    if (this.filters.vegeterianOnly) {
      this.filteredProducts = this.filteredProducts.filter(product => product.vegeterian);
    }

    this.renderProducts();
  }

  template() {
    return `<div class="products-grid">
              <div class="products-grid__inner"></div>
            </div>`;
  }

  render() {
    this.elem = createElement(this.template());
    this.renderProducts();
    return this.elem;
  }

  renderProducts() {
    let productsGrid = this.elem.querySelector('.products-grid__inner');
    productsGrid.innerHTML = '';
    for (let product of this.filteredProducts) {
      let renderedProduct = new ProductCard(product);
      productsGrid.append(renderedProduct.elem);
    }
  }
}
