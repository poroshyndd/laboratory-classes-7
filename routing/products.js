const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.post('/', (req, res) => {
  const { title, price, id } = req.body;
  new Product(title, price, id).save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/', (req, res) => {
  Product.fetchAll()
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(prod => prod ? res.json(prod) : res.status(404).json({ error: 'Nie znaleziono produktu' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:id', (req, res) => {
  Product.deleteById(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
