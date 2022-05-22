const port = 8081
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const Authenticator = require('./authenticator')

const app = express()
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const JWTPassword = 'laudelindo'

function auth(req, res, next){
    const authToken = req.headers['authorization']
    
    if(authToken != undefined){
        const bearer = authToken.split(' ')
        let token = bearer[1]
        jwt.verify(token, JWTPassword, (err, data) => {
            if(err){
                res.status(401)
                res.send({err: "Token inválido"})
            }else{
                req.token = token
                req.loggedUser = {user: data.email, token: token}
                next()
            }
        })
    }else{
        res.status(401)
        res.send({err: "Token inválido"})
    }
}

app.get("/ping", auth, (req,res) => {
    res.status(200)
    res.send("pong")
})

app.post("/auth", (req,res) => {
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