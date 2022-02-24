const sales = require('express').Router();
const rescue = require('express-rescue');
const middlewares = require('../middlewares/middlewares');
const salesServices = require('../services/salesServices');

sales.get('/', rescue(async (req, res) => {
  const result = await salesServices.getAll();

  res.status(200).json(result);
}));

sales.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const result = await salesServices.getById(id);

  res.status(200).json(result);
}));

sales.post('/', middlewares.validateProductIdArray, middlewares.validateQuantityArray,
 rescue(async (req, res) => {
  const { body } = req;

  const result = await salesServices.create(body);

  res.status(201).json(result);
}));

module.exports = sales;
