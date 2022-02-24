const rescue = require('express-rescue');

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

const validateProductIdArray = rescue(async (req, res, next) => {
  const { body } = req;

  body.forEach((obj) => {
    if (!obj.productId) {
      const err = new Error('ProductId is required');
      err.status = 404;
      throw err;
    }
  });

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

module.exports = {
  validateName,
  validateQuantity,
  validateProductIdArray,
  validateQuantityArray,
};
