const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { API_VERSION } = require('./constants');

const app = express();

// Import routings
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static('uploads'));

// Configure Header HTTP - CORS
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ msg: 'Something broke!' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).send({ msg: 'Not found' });
});

module.exports = app;
