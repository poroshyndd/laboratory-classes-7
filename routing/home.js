const express = require('express');
const { MENU_LINKS } = require('../constants/navigation');
const { STATUS_CODE } = require('../constants/statusCode');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const cartCount = await cartController.getProductsCount('default');
    res
      .status(STATUS_CODE.OK)
      .render('home', {
        headTitle: 'Strona główna',
        menuLinks: MENU_LINKS,
        activeLinkPath: '/',
        cartCount
      });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
