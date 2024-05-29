const express = require('express')
const user_model = require('./models/userModel')
const password_recovery = require('./modules/authentication/password_recovery')
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const { testDbConnection } = require('./config/db');

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

// // gets user by email
// app.get('/:email', (req, res) => {
//   user_model.getUsersByEmail(req.params.email)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       if (error.message === "Email not found in system") {
//         res.status(401).send(error);
//       } else {
//         res.status(500).send(error);
//       }
//     })
// })

// // gets user by token
// app.get("/url/:token", (req, res) => {
//   user_model.getUsersByToken(req.params.token)
//     .then(response => { res.status(200).send(response) })
//     .catch(error => { res.status(500).send(error) })
// })

// app.post('/users', (req, res) => {
//   user_model.createUser(req.body)
//     .then(response => res.status(200).send(response))
//     .catch(error => {
//       if (error.message === "Email found in system") {
//         res.status(401).send(error);
//       } else if (error.message === "Email not found in system") {
//         res.status(401).send(error);
//       } else {
//         res.status(500).send(error);
//       }
//     });
// })

// app.post("/send-email", (req, res) => {
//   password_recovery.sendEmail(req.body)
//     .then(response => res.status(200).send(response))
//     .catch(error => res.status(500).send(error));
// });

// app.post("/generate-token", (req, res) => {
//   password_recovery.generateToken()
//     .then(response => res.status(200).send(response))
//     .catch(error => res.status(500).send(error));
// })

// app.put("/put-token", (req, res) => {
//   password_recovery.putToken(req.body)
//     .then(response => res.status(200).send(response))
//     .catch(error => res.status(500).send(error));
// })

// app.delete('/users/:id', (req, res) => {
//   user_model.deleteUser(req.params.id)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     })
// })
// app.put("/users/:id", (req, res) => {
//   const body = req.body;
//   user_model
//     .updateUser(body)
//     .then((response) => {
//       res.status(200).send(response);
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });

