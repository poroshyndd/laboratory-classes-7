const Cart = require('../models/Cart');

exports.getProductsCount = async function(cartId = 'default') {
  try {
    const cart = await new Cart(cartId).getCart();
    if (!cart || !Array.isArray(cart.items)) {
      return 0;
    }
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  } catch (err) {
    console.error('Error fetching cart count:', err);
    return 0;
  }
};
