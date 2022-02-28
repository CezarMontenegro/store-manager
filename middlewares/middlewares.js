const rescue = require('express-rescue');
const salesModel = require('../models/salesModel');

const validateName = rescue(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const err = new Error('"name" is required');
    err.status = 400;
    throw err;
}
if (name.length < 5) {
    const err = new Error('"name" length must be at least 5 characters long');
    err.status = 422;
    throw err;
}
  next();
});

const validateQuantity = rescue(async (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    const err = new Error('"quantity" is required');
    err.status = 400;
    throw err;
}
if (parseInt(quantity, 10) <= 0) {
    const err = new Error('"quantity" must be greater than or equal to 1');
    err.status = 422;
    throw err;
}

  next();
});

const validateQuantityArray = rescue(async (req, res, next) => {
  const { body } = req;

  body.forEach((obj) => {
    if (!obj.quantity) {
      const err = new Error('"quantity" is required');
      err.status = 400;
      throw err;
    }
    if (obj.quantity <= 0) {
      const err = new Error('"quantity" must be greater than or equal to 1');
      err.status = 422;
      throw err;
    }
  });

  next();
});

const productIdCheck = (productId) => {
  if (productId === undefined) {
      const err = new Error('"productId" is required');
      err.status = 400;
      throw err;
  }
};

const validateProductIdArray = rescue(async (req, res, next) => {
  const { body } = req;
  body.map((elem) => productIdCheck(elem.productId));
  
  next();
});

const validateSaleId = rescue(async (req, res, next) => {
  const { id } = req.params;

  const result = await salesModel.getById(id);

  if (result.length === 0) {
    const err = new Error('sale not fount');
    err.status = 404;
    throw err;
  }

  next();
});

module.exports = {
  validateName,
  validateQuantity,
  validateProductIdArray,
  validateQuantityArray,
  validateSaleId,
};
