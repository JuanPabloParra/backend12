const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();

dbConnection();

const headers = {
  cors: {
    origin: 'http://127.0.0.1:5173',
    methods: ["GET", "POST"]
  }
};

app.use(cors(headers));

app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto', process.env.PORT);
});
