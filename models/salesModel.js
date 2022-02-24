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

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
      sales.date,
      sales_products.product_id,
      sales_products.quantity
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

  return result;
};

module.exports = {
  getAll,
  getById,
};
