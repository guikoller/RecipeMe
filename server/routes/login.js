const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const db = require('../database')

app.post("/login", (req,res) => {
    let email = req.body.login
    let senha = req.body.senha

    let data = []
    let query = `SELECT
                    CASE WHEN EXISTS 
                    (
                        SELECT id FROM usuarios WHERE login = ? AND senha = ?
                    )
                    THEN 'TRUE'
                    ELSE 'FALSE'
                END AS "exists"`
    
    data.push(email)
    data.push(senha)
    
    db.query(query, data, (err, result) => {
        if(result[0].exists == 'TRUE'){
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
            res.send("Erro: Usuário não cadastrado")
        }
    })    
})

app.post("/create", (req,res) => {
       
})

module.exports = app;