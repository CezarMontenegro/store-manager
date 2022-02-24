const products = require('express').Router();
const rescue = require('express-rescue');
const productsService = require('../services/productsService');
const middlewares = require('../middlewares/middlewares');

products.get('/', rescue(async (req, res) => {
  const result = await productsService.getAll();

  res.status(200).json(result);
}));

products.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const result = await productsService.getById(id);

  res.status(200).json(result);
}));

products.post('/', 
  middlewares.validateName,
  middlewares.validateQuantity,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const result = await productsService.create(name, quantity);
    console.log(result);

    res.status(201).json(result);
}));

products.put('/:id',
  middlewares.validateName,
  middlewares.validateQuantity,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const result = await productsService.update(name, quantity, id);
    
    res.status(200).json(result);
}));

module.exports = products;
