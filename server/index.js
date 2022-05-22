const port = 8081
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const Authenticator = require('./authenticator')

const jsonParser = bodyParser.json()
const app = express()
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const JWTPassword = 'laudelindo'


app.get("/ping",(req,res) => {
    res.send("pong")
})

app.post("/auth", jsonParser,(req,res) => {
    let email = req.body.email
    let senha = req.body.senha

    let check = new Authenticator(email, senha)

    if(check.auth()){
        jwt.sign({email: email},JWTPassword, {expiresIn: '48h'}, (err, token) => {
            if (err) {
                res.status(400)
                res.send("ERROR: " + err )
            } else {
                res.status(200)
                res.send({'jwt': token})
            }
        })
    }else{
        res.status(401)
        res.send("ERROR")
    }
})

app.listen(port, () => {
    console.log("Server running at the port " + port)
})