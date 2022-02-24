const salesModel = require('../models/salesModel');

const getAll = () => salesModel.getAll();

const getById = async (id) => salesModel.getById(id);

module.exports = {
  getAll,
  getById,
};
