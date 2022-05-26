const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./middleware')
const app = express()
const apiRoutes = require('./routes/index');
const port = 8081

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', apiRoutes);

app.listen(port, () => {
    console.log("Server running at the port " + port)
})