const express = require('express');
const mongoose = require('mongoose')
const authRoute = require('./routes/auth');
const cors = require('cors');
require('dotenv/config');

const app = express();


const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lzyeee3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute)

async function start() {
  try {
    await mongoose.connect(uri);
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch(e) {
    console.log(error);
  }
}

start()