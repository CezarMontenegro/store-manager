const salesModel = require('../models/salesModel');

const getAll = () => salesModel.getAll();

const getById = async (id) => salesModel.getById(id);

const create = async (body) => salesModel.create(body);

const update = async (productId, quantity, id) => salesModel.update(productId, quantity, id);

module.exports = {
  getAll,
  getById,
  create,
  update,
};
