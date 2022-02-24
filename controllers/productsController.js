const products = require('express').Router();
const productsService = require('../services/productsService');

products.get('/', async (req, res) => {
  try {
    const result = await productsService.getAll();

    res.status(200).json(result);
} catch (error) {
  return error;
}
});

products.get('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await productsService.getById(id);

  res.status(200).json(result);
});

module.exports = products;
