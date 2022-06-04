const express = require('express')
const app = express()
const db = require('../database')
const auth =  require('../utils/middleware')

app.post("/", auth,(req,res) => {
    let nome = req.body.nome
    let data = []

    let query = `
        insert into categorias(nome)
        values(?)
    `
    data.push(nome)

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

app.get("/", auth, (req,res) => {
    let id = req.query.id
    let data = []

    let query = `
        select id, nome from categorias
    `
    if(id){
        query += 'where id = ?'
        data.push(id)
    }

    db.query(query, data, (err, result) => {
        if(!err){
            if(result[0]){
                res.status(200)
                res.send(result)
            }else{
                res.status(401)
                res.send("Nenhum Cadastro")
            }
        }else{
            res.status(401)
            res.send(err)
        }            
    })         
})

app.put("/", auth, (req,res) => {
    let id = req.body.id
    let nome = req.body.nome
    let data = []

    let query = `
       update categorias set nome = ? where id = ?
    `
    data.push(nome)
    data.push(id)

    db.query(query, data, (err, result) => {
        if(!err){
            res.status(200)
            res.send(result)
        }else{
            res.status(401)
            res.send(err)
        }   
    })
 
})

app.delete("/", auth, (req,res) => {
    let id = req.body.id
    let data = []

    let query = `
        delete from categorias where id = ?
    `
    data.push(id)

    db.query(query, data, (err, result) => {
        if(!err){
            res.status(200)
            res.send(result)
        }else{
            res.status(401)
            res.send(err)
        }
    })
})

module.exports = app;