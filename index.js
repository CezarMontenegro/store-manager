const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const error = require('./middlewares/error');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);
app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});