const express = require('express')
const app = express()
const db = require('../database')
const auth =  require('../utils/middleware')

app.post("/", auth,(req,res) => {
    let ingrediente = req.body.ingrediente
    let medida = req.body.medida
    let quantidade = req.body.quantidade
    let usuario = req.loggedUser.user
    let data = []

    let query = `
        insert into estoque(ingrediente, usuario, medida, quantidade)
        values(?,?,?,?)
    `
    data.push(ingrediente)
    data.push(usuario)
    data.push(medida)
    data.push(quantidade)

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
    let id = req.loggedUser.user
    let data = []

    let query = `ingrediente, medida, quantidade where usuario = ?`

    data.push(id)    

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
    let usuario = req.loggedUser.user
    let ingrediete = req.body.ingrediete
    let medida = req.body.medida
    let quandidade = req.body.quandidade
    let data = []

    let query = `
       update ingredientes set ingrediete = ?, medida = ?, quandidade = ? where usuario = ?
    `
    data.push(ingrediete)
    data.push(medida)
    data.push(quandidade)
    data.push(usuario)

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
    let id = req.loggedUser.user
    let ingrediente = req.body.ingrediente
    let data = []

    let query = `
        delete from estoue where usuario = ? and ingrediente = ?
    `
    data.push(id)
    data.push(ingrediente)

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