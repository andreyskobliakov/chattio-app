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

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
