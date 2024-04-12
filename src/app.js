const express = require('express');
const mongoose = require('mongoose');
const foodRoutes = require('./foods/foods.controller');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(err => console.error('Não foi possível conectar ao MongoDB...', err));


app.use('/api/foods', foodRoutes);

app.listen(3000, () => {
  console.log('O servidor está rodando na porta 3000');
});
