const express = require('express')
const app = express()
const auth = require('../utils/middleware')

app.get("/", auth, (req,res) => {
    res.status(200)
    res.send("pong")
})

module.exports = app