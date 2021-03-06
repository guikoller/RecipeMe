const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const db = require('../database')

app.post("/login", (req,res) => {
    let login = req.body.login
    let senha = req.body.senha

    let data = []
    let query = `SELECT id FROM usuarios WHERE login = ? AND senha = ?`
    
    data.push(login)
    data.push(senha)
    
    db.query(query, data, (err, result) => {
        if(result.length > 0){
            jwt.sign({id: result[0].id}, 'laudelindo', {expiresIn: '48h'}, (err, token) => {
                if (err) {
                    res.status(400)
                    res.send("ERROR: " + err )
                } else {
                    res.status(200)
                    res.send({'id' : result[0].id, 'jwt': token})
                }
            })
        }else{
            res.status(401)
            res.send("Erro: Usuário não cadastrado")
        }
    })    
})

app.post("/create", (req,res) => {
    let data = []

    let nome = req.body.nome
    let sobrenome = req.body.sobrenome
    let login = req.body.login
    let data_nascimento = req.body.data_nascimento.split('/').reverse().join('-')
    let genero = req.body.genero
    let newsletter = req.body.newsletter
    let senha = req.body.senha

    let query = `
        insert into usuarios
        (nome, sobrenome, login, data_nascimento, genero, newsletter, senha)
        values(?, ?, ?, ?, ?, ?, ?)
    `
    data.push(nome)
    data.push(sobrenome)
    data.push(login)
    data.push(data_nascimento)
    data.push(genero)
    data.push(newsletter)
    data.push(senha)

    db.query(query, data, (err, result) => {
        if(!err){
            res.status(200)
            res.send("ID: " + result.insertId)
        }else{
            res.status(401)
            res.send(err)
        }
    })
})

module.exports = app;