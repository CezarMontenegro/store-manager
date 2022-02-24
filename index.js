const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
require('dotenv').config();

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});