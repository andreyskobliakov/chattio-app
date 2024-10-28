const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Статическая папка для загруженных файлов

// Подключение к MongoDB
const uri = 'mongodb+srv://chattio:e4357ce4357ce4357c@chattio.qq9ax.mongodb.net/chattio?retryWrites=true&w=majority&appName=chattio';
mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB Connected… ok');
  })
  .catch(err => console.log('MongoDB connection error:', err));

// Модель пользователя
const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  login: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

// Модель публикации
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  file: { type: String }, // Путь к загруженному файлу
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: () => new Date().toISOString().split('T')[0] } // Сохраняем только дату
}, { timestamps: false }); // Отключаем стандартные timestamps


const Post = mongoose.model('Post', postSchema);

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка для сохранения загруженных файлов
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
  }
});

const upload = multer({ storage });

// Регистрация пользователя
app.post('/register', async (req, res) => {
  const { phone, password, firstName, lastName, login } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ phone, password: hashedPassword, firstName, lastName, login });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'Error registering user', error: err.message });
  }
});

// Логин пользователя
app.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, phone: user.phone }, 'your_jwt_secret', { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Получение всех пользователей
app.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// Получение данных конкретного пользователя
app.get('/users/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});

// Создание публикации с загруженным файлом
app.post('/posts', authenticateToken, upload.single('file'), async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  const newPost = new Post({
    title,
    content,
    userId,
    file: req.file ? req.file.path : null // Сохраняем путь к файлу, если он загружен
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
});

// Получение публикаций (всех или по userId)
app.get('/posts', authenticateToken, async (req, res) => {
  const { userId } = req.query;

  try {
    const posts = userId 
      ? await Post.find({ userId }).populate('userId', 'firstName lastName login') // Находим публикации по userId
      : await Post.find().populate('userId', 'firstName lastName login'); // Если userId нет, возвращаем все публикации

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
