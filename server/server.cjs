const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb+srv://chattio:e4357ce4357ce4357c@chattio.qq9ax.mongodb.net/chattio?retryWrites=true&w=majority&appName=chattio';

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB Connected… ok');
  })
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  username: String,
  phone: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
  const { username, phone, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, phone, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при регистрации', error });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
