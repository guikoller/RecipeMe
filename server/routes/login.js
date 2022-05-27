const express = require('express')
const jwt = require('jsonwebtoken')
const Authenticator = require('../utils/authenticator')
const app = express()

app.post("/login", (req,res) => {
    let email = req.body.email
    let senha = req.body.senha

    let check = new Authenticator(email, senha)

    if(check.auth()){
        jwt.sign({email: email}, 'laudelindo', {expiresIn: '48h'}, (err, token) => {
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

module.exports = app;