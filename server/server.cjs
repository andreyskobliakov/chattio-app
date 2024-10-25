const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

// User model
const userSchema = new mongoose.Schema({
  phone: String,
  password: String,
  firstName: String,
  lastName: String,
  login: String,
});
const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { phone, password, firstName, lastName, login } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ phone, password: hashedPassword, firstName, lastName, login });
  user.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

app.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ phone });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, phone: user.phone }, 'your_jwt_secret', { expiresIn: '1d' });

  res.json({ token }); // Отправляем токен в ответе
});





