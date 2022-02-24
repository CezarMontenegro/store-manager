const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const getById = async (id) => productsModel.getById(id);

const create = async (name, quantity) => {
  const namesList = await productsModel.getAll();
  const nameExists = namesList.some((obj) => obj.name === name);

  if (nameExists) {
    const err = new Error('Product already exists');
    err.status = 409;
    throw err;
  }
  const result = await productsModel.create(name, quantity);
  return result;  
};

module.exports = {
  getAll,
  getById,
  create,
};
