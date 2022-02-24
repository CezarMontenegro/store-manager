const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales;',
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?', [id],
  );

  return result;
};

module.exports = {
  getAll,
  getById,
};
