const { getDatabase } = require('../database');
const COLLECTION_NAME = 'products';

class Product {
  constructor(title, price, id) {
    this.title = title;
    this.price = price;
    this.id = id;
  }

  save() {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME)
      .findOne({ _id: this.id })
      .then(existing => {
        if (existing) {
          return db.collection(COLLECTION_NAME)
            .updateOne(
              { _id: this.id },
              { $set: { title: this.title, price: this.price } }
            );
        }
        return db.collection(COLLECTION_NAME)
          .insertOne({ _id: this.id, title: this.title, price: this.price });
      });
  }

  static fetchAll() {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME)
      .find()
      .toArray();
  }

  static findById(prodId) {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME)
      .findOne({ _id: prodId });
  }

  static deleteById(prodId) {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME)
      .deleteOne({ _id: prodId });
  }
}

module.exports = Product;
