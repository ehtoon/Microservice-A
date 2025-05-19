const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory "user database"
const users = {};

// JWT secret key
const SECRET_KEY = 'your_jwt_secret_key';



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { username, password: hashedPassword };

  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users[username];
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '30m' });
  res.json({ access_token: token, token_type: 'bearer' });
});

// Protected route
app.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ username: decoded.username });
  } catch (err) {
    res.status(401).json({ message: 'Token expired or invalid' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`User service running at http://localhost:${PORT}`);
});
