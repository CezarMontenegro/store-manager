const salesModel = require('../models/salesModel');

const getAll = () => salesModel.getAll();

const getById = async (id) => salesModel.getById(id);

const create = async (body) => salesModel.createSaleProduct(body);

module.exports = {
  getAll,
  getById,
  create,
};
