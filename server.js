const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Путь к вашей модели
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config()
// Подключение к базе данных
mongoose.connect(process.env.MONGO_URI);

// Проверка успешного подключения
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Определение маршрутов и другой логики Express здесь
app.use(bodyParser.json())
app.post('/users', async (req, res) => {
    console.log(req.body)
    const { name, age } = req.body;
  
    const newUser = new User({
      name,
      age,
    });
  
    await newUser.save();
    res.json(newUser);
  });
  
  // Получение всех пользователей
  app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
  });
  
app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});