const express = require('express');
const api = express.Router();

const loginRoute = require('./login');
const testRoute = require('./test')

api.use('/auth', loginRoute)
api.use('/ping', testRoute)

module.exports = api;