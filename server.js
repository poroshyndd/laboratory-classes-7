const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { PORT } = require('./config');
const { mongoConnect } = require('./database');
const productsRoutes = require('./routing/products');
const logoutRoutes = require('./routing/logout');
const killRoutes = require('./routing/kill');
const homeRoutes = require('./routing/home');
const cartController = require('./controllers/cartController');
const { STATUS_CODE } = require('./constants/statusCode');
const { MENU_LINKS } = require('./constants/navigation');
const logger = require('./utils/logger');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  logger.getInfoLog(req.url, req.method);
  next();
});


app.use('/products', productsRoutes);
app.use('/logout', logoutRoutes);
app.use('/kill', killRoutes);
app.use(homeRoutes); 


app.use((req, res) => {
  const cartCount = cartController.getProductsCount();
  res.status(STATUS_CODE.NOT_FOUND).render('404', {
    headTitle: '404',
    menuLinks: MENU_LINKS,
    activeLinkPath: '',
    cartCount
  });
  logger.getErrorLog(req.url);
});

mongoConnect(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

