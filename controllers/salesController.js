const sales = require('express').Router();
const salesServices = require('../services/salesServices');

sales.get('/', async (req, res) => {
  try {
    const result = await salesServices.getAll();

    res.status(200).json(result);
  } catch (error) {
    return error;
  }
});

sales.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await salesServices.getById(id);

    res.status(200).json(result);
  } catch (error) {
    return error;
  }
});

module.exports = sales;
