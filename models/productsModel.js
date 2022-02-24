const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
   'SELECT * FROM products',
  );
 
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = ?', [id],
  );

  if (result.length === 0) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }

  return result[0];
};

module.exports = {
  getAll,
  getById,
};