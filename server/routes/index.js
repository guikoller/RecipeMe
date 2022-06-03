const express = require('express');
const api = express.Router();

const loginRoute = require('./login');
const testRoute = require('./test')
const categoriaRoute = require('./categoria')

api.use('/auth', loginRoute)
api.use('/ping', testRoute)
api.use('/categoria', categoriaRoute)
api.use('/ingrediente', testRoute)
api.use('/receita', testRoute)

module.exports = api;