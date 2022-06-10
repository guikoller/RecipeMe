const express = require('express')
const app = express()
const db = require('../database')
const auth =  require('../utils/middleware')

app.post("/", auth,(req,res) => {
    let usuario = req.loggedUser.user
    let receita = req.body.receita
    let data_avaliacao = req.body.data_avaliacao
    let avaliacao = req.body.avaliacao
    let texto = req.body.texto
    let data = []

    let query = `
        insert into comentarios(usuario,receita,data,avaliacao,texto)
        values(?, ?, ?, ?, ?)
    `
    data.push(usuario)
    data.push(receita)
    data.push(data_avaliacao.split('/').reverse().join('-'))
    data.push(avaliacao)
    data.push(texto)

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

app.get("/", (req,res) => {
    let receita = req.query.receita
    let data = []

    let query = `
        select 
            comentarios.usuario as id_usuario,
            usuarios.nome as usuario,
            comentarios.receita,
            receitas.nome as receita,
            comentarios.data,
            comentarios.avaliacao,
            comentarios.texto
        from comentarios
            inner join usuarios on usuarios.id = usuario
            inner join receitas on receitas.id = receita
        where receita = ?
    `
    data.push(receita)

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
    let texto = req.body.texto
    let avaliacao = req.body.avaliacao
    let usuario = req.loggedUser.user
    let receita = req.body.receita
    let data = []

    let query = `
       update comentarios set texto = ?, avaliacao = ? where usuario = ? and receita = ?
    `
    data.push(texto)
    data.push(avaliacao)
    data.push(usuario)
    data.push(receita)

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
    let receita = req.body.receita
    let usuario = req.loggedUser.user
    let data = []

    let query = `
        delete from comentarios where usuario = ? and receita = ?
    `
    data.push(usuario)
    data.push(receita)

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