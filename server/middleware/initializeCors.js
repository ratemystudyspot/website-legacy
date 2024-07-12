const cors = require('cors');

function corsConfig(corsOrigins) {
  cors({
    origin: CORS_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Headers', 'Authorization'],
    credentials: true,
  })
}