const { getDatabase } = require('../database');
const COLLECTION_NAME = 'carts';

class Cart {
  constructor(id) {
    this.id = id;
  }

  addProduct(productId, quantity) {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME)
      .findOne({ _id: this.id })
      .then(cart => {
        if (!cart) {
          return db.collection(COLLECTION_NAME)
            .insertOne({ _id: this.id, items: [{ productId, quantity }] });
        }
        const items = cart.items || [];
        const idx = items.findIndex(i => i.productId === productId);
        if (idx >= 0) {
          items[idx].quantity += quantity;
        } else {
          items.push({ productId, quantity });
        }
        return db.collection(COLLECTION_NAME)
          .updateOne({ _id: this.id }, { $set: { items } });
      });
  }

  getCart() {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME)
      .findOne({ _id: this.id });
  }

  deleteProduct(productId) {
    const db = getDatabase();
    return this.getCart()
      .then(cart => {
        if (!cart) throw new Error('Cart not found.');
        const items = cart.items.filter(i => i.productId !== productId);
        return db.collection(COLLECTION_NAME)
          .updateOne({ _id: this.id }, { $set: { items } });
      });
  }

  static clearCart(cartId) {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME)
      .deleteOne({ _id: cartId });
  }
}

module.exports = Cart;
