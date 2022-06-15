const express = require('express');
const api = express.Router();

const loginRoute = require('./login');
const testRoute = require('./test')
const categoriaRoute = require('./categoria')
const ingredienteRoute = require('./ingrediente')
const receitaRoute = require('./receita')
const estoqueRoute = require('./estoque')
const comentarioRoute = require('./comentario')

api.use('/auth', loginRoute)
api.use('/ping', testRoute)
api.use('/categoria', categoriaRoute)
api.use('/ingrediente', ingredienteRoute)
api.use('/receita', receitaRoute)
api.use('/estoque', estoqueRoute)
api.use('/comentario', comentarioRoute)

module.exports = api;