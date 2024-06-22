const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const studySpotRoutes = require('./routes/studySpotRoutes');
const openingHourRoutes = require('./routes/openingHourRoutes');
const review = require('./routes/reviewRoutes');
const reaction = require('./routes/reactionRoutes');
const { testDbConnection } = require('./config/db');
const { PORT, CORS_ORIGINS } = require('./config/config');
const verifyJWT = require('./middleware/verifyJWT');

const app = express();

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

app.use(cors({
  origin: CORS_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Headers'],
  credentials: true,
}));

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Credentials', true);
  }
  next();
}

//middleware for cookies
app.use(cookieParser());

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// routes
app.use('/api/auth', authRoutes);
app.use('/api/studyspot', studySpotRoutes);
app.use('/api/openinghour', openingHourRoutes);
app.use('/api/review', review);
app.use('/api/reaction', reaction);

// middleware to protect protected routes through JWT verification
app.use(verifyJWT);
// protected routes
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
  testDbConnection();
})