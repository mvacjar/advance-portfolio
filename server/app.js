const express = require('express');
const bodyParser = require('body-parser');
const { API_VERSION } = require('./constants');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = app;
