const express = require('express')
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const { testDbConnection } = require('./config/db');
const { test } = require('./models/userModel');

const app = express()
const PORT = 3001

require("dotenv").config();

app.use(express.json())
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
  testDbConnection();
})