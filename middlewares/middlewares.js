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

  if (!quantity) {
    const err = new Error('"quantity" is required');
    err.status = 400;
    throw err;
  }

  if (quantity <= 0) {
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

const validateProductIdArray = rescue(async (req, res, next) => {
  const { body } = req;

  body.forEach(async (object) => {
    try {
    if (!object.productId) {
      const err = new Error('productId is required');
      err.status = 404;
      throw err;
    }

    const productId = await salesModel.getByProductId(object.productId);

    if (!productId.length) {
      const err = new Error('product not found');
      err.status = 404;
      throw err; 
  }
    } catch (err) { next(err); }
  });
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

// const validateProductId = rescue(async (req, res, next) => {
//   const { productId } = req.body;

//   if (!productId) {
//     const err = new Error('productId is required');
//     err.status = 404;
//     throw err;
//   }

//   const productIdd = await salesModel.getByProductId(productId);

//     if (productIdd.length === 0) {
//       const err = new Error('product not found');
//       err.status = 404;
//       throw err; 
//   }
//   next();
// });

module.exports = {
  validateName,
  validateQuantity,
  validateProductIdArray,
  validateQuantityArray,
  validateSaleId,
};
