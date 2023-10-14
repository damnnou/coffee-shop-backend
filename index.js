const express = require('express');
const mongoose = require('mongoose')
const authRoute = require('./routes/auth');
const cors = require('cors');
require('dotenv/config');

const app = express();


const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lzyeee3.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute)

// // Обработка POST запроса
// app.post('/write-to-db', async (req, res) => {
//   // Получите данные из запроса
//   const {name} = req.query;

//   console.log(name);

//   try {
//     // Устанавливаем соединение с MongoDB
//     await client.connect();

//     const database = client.db('Users');
//     const roles = database.collection('Users');

//     // Создаем документ для вставки в коллекцию
//     const doc = { name: name };

//     // Вставляем документ в коллекцию
//     const result = await roles.insertOne(doc);

//     console.log(
//       `A document was inserted with the _id: ${result.insertedId}`,
//     );

//     // Отправляем ответ клиенту
//     res.json({ success: true, message: `Данные успешно записаны в базу данных - ${result.insertedId}` });
//   } catch (error) {
//     // Обработка ошибок
//     console.error('Ошибка при обращении к базе данных:', error);
//     res.status(500).json({ success: false, message: 'Ошибка при записи данных в базу данных' });
//   } finally {
//     // Закрываем соединение с MongoDB после завершения запроса
//     await client.close();
//   }
// });


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