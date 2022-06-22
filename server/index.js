const express = require('express')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/index');

const port = 8081
const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    //to allow cross domain requests to send cookie information.
    res.header('Access-Control-Allow-Credentials', true);
    // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    // list of methods that are supported by the server
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN, Authorization');
    next();
});

app.use('/', apiRoutes);

app.listen(port, () => {
    console.log("Server running at the port " + port)
})