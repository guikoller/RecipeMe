const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const port = 8081
const jwt = require('jsonwebtoken')

const Authenticator = require('./authenticator')

const JWTPassword = 'laudelindo'
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/ping",(req,res) => {
    res.send("pong")
})

app.post("/auth", jsonParser,(req,res) => {
    let email = req.body.email
    let senha = req.body.senha

    let check = new Authenticator(email, senha)

    if(check.auth()){
        jwt.sign({email: email})
        res.status(200)
        res.send("TOKEN")
    }else{
        res.status(401)
        res.send("ERROR")
    }
})

app.listen(port, () => {
    console.log("Server running at the port " + port)
})