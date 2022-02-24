const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
   'SELECT * FROM StoreManager.products',
  );
 
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );

  if (result.length === 0) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }

  return result[0];
};

const create = async (name, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products(name, quantity) VALUES (?, ?)', [name, quantity],
  );
  return {
      id: result.insertId,
      name,
      quantity,
  };
};

const update = async (name, quantity, id) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;',
    [name, quantity, id],
  );

  return {
    id,
    name,
    quantity,
  };
};

const exclude = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;', [id],
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};