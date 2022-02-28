const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
      sales_products.sale_id,
      sales.date,
      sales_products.product_id,
      sales_products.quantity
    FROM StoreManager.sales_products AS sales_products
    INNER JOIN StoreManager.sales as sales
    ON StoreManager.sales_products.sale_id = StoreManager.sales.id;`,
  );

  const formatResult = result.map((obj) => ({
    saleId: obj.sale_id,
    date: obj.date,
    productId: obj.product_id,
    quantity: obj.quantity,

  }));

  return formatResult;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sales.date, sales_products.product_id, sales_products.quantity
    FROM StoreManager.sales_products AS sales_products
    INNER JOIN StoreManager.sales AS sales
    ON StoreManager.sales_products.sale_id = StoreManager.sales.id
    WHERE StoreManager.sales_products.sale_id = ?;`, [id],
  );

  if (result.length === 0) {
    const err = new Error('Sale not found');
    err.status = 404;
    throw err;
  }

  const formatResult = result.map((obj) => ({
    date: obj.date,
    productId: obj.product_id,
    quantity: obj.quantity,
  }));

  return formatResult;
};

const createSale = async () => {
  const [id] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES ()',
  );

  return id.insertId;
};

const getByProductId = async (id) => {
  const [result] = await connection.execute(
    'SELECT id FROM StoreManager.products WHERE id = ?', [id],
  );

  return result;
};

const create = async (body) => {
  const id = await createSale();

  const newSaleProduct = body.map((obj) => [id, obj.productId, obj.quantity]);
  
  await connection.query(
     'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE ?;',
      [newSaleProduct],
  );

  return {
    id,
    itemsSold: body,
  };
};

const update = async (productId, quantity, id) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?;',
    [productId, quantity, id],
  );

  return {
    saleId: id,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  };
};

module.exports = {
  getAll,
  getById,
  create,
  getByProductId,
  update,
};
