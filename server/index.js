const express = require('express')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/index');

const port = 8081
const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', apiRoutes);

app.listen(port, () => {
    console.log("Server running at the port " + port)
})