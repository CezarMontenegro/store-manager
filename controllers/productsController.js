const products = require('express').Router();
const rescue = require('express-rescue');
const productsService = require('../services/productsService');

products.get('/', rescue(async (req, res) => {
  const result = await productsService.getAll();

  res.status(200).json(result);
}));

products.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const result = await productsService.getById(id);

  res.status(200).json(result);
}));

module.exports = products;
