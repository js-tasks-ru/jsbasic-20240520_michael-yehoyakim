export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.cartItems = [];
  }

  addProduct(product = null) {
    if (product) {
      let item = this.cartItems.find(item => item.product.id === product.id);

      if (item) {
        item.count += 1;
      }
      else {
        item = {
          product: product,
          count: 1
        };
        this.cartItems.push(item);
      }

      this.onProductUpdate(item);
    }
  }

  updateProductCount(productId, amount) {
    let found = this.cartItems.find(item => item.product.id === productId);
    if (found) {
      found.count += amount;
    }
  }

  isEmpty() {
    return this.getTotalCount() === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    for (let item of this.cartItems){
      totalCount += item.count;
    }
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let item of this.cartItems) {
      totalPrice += (item.product.price) * item.count;
    }
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
