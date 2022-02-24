const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const getById = async (id) => productsModel.getById(id);

const create = async (name, quantity) => {
  const productsList = await productsModel.getAll();
  const productExists = productsList.some((obj) => obj.name === name);

  if (productExists) {
    const err = new Error('Product already exists');
    err.status = 409;
    throw err;
  }
  const result = await productsModel.create(name, quantity);
  return result;  
};

const update = async (name, quantity, id) => {
  await productsModel.getById(id);

  const result = await productsModel.update(name, quantity, id);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
