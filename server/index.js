const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const studySpotRoutes = require('./routes/studySpotRoutes');
const openingHourRoutes = require('./routes/openingHourRoutes');
const review = require('./routes/reviewRoutes');
const { testDbConnection } = require('./config/db');
const { PORT, CORS_ORIGINS } = require('./config/config');

const app = express();

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

app.use(cors({
  origin: CORS_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Headers']
}));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/studyspot', studySpotRoutes);
app.use('/api/openinghour', openingHourRoutes);
app.use('/api/review', review);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
  testDbConnection();
})