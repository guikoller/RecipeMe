const express = require('express')
const app = express()
const db = require('../database')
const auth =  require('../utils/middleware')

app.post("/", auth,(req,res) => {
    let usuario_logado = req.loggedUser.user
    let categoria = req.body.categoria_id
    let nome = req.body.nome
    let descricao = req.body.descricao
    let rendimento = req.body.rendimento
    let tempo_preparo = req.body.tempo_preparo
    let ingredientes = req.body.ingredientes

    let data = []

    let query = `
        insert into receitas(usuario, categoria, nome, descricao, rendimento, tempo_preparo)
        values(?,?,?,?,?,?)
    `
    data.push(usuario_logado)
    data.push(categoria)
    data.push(nome)
    data.push(descricao)
    data.push(rendimento)
    data.push(tempo_preparo)

    db.query(query, data, (err, result) => {
        if(!err){
            data = []
            let id_nova_receita = result.insertId
            for (let i = 0; i < ingredientes.length; i++) {
                let query = `
                    insert into ingredientes_receita(ingrediente, receita, medida, quantidade)
                    values(?,?,?,?)
                `
                data.push(ingredientes[i].id_ingrediente)
                data.push(id_nova_receita)
                data.push(ingredientes[i].id_unidade)
                data.push(ingredientes[i].quantidade)
                try {
                    db.query(query, data)
                } catch (error) {
                    res.status(200)
                }                 
            }
            res.status(200)
            res.send("ID" + id_nova_receita)       
        }else{
            res.status(401)
            res.send(err)
        }
    }) 
})

app.get("/", auth, (req,res) => {
    let id = req.query.id
    let usuario = req.query.usuario
    let data = []

    let query = `
        select 
            receitas.id,
            categorias.nome,
            receitas.nome,
            receitas.descricao,
            receitas.rendimento,
            receitas.tempo_preparo
        from receitas
            inner join categorias on categorias.id = receitas.categoria
    `
    if(id){
        query += 'where receitas.id = ? '
        data.push(id)
    }

    db.query(query, data, (err, result) => {
        if(!err){
            if(result[0]){
                let receita = result
                query = `select
                            ingredientes.nome,
                            medidas.nome as nome_unidade,
                            quantidade
                        from ingredientes_receita
                            inner join ingredientes on ingredientes.id = ingrediente
                            inner join medidas on medidas.id = medida
                            where receita = ?`
                db.query(query, receita[0].id, (err, result) => {
                    receita[0].ingredientes = result
                    if(!err){
                        res.status(200)
                        res.send(receita[0])
                    }
                })
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

app.get("/all", auth, (req, res) => {
    let data = []
    let query = `select 
                    receitas.id,
                    categorias.nome,
                    receitas.nome,
                    receitas.rendimento,
                    receitas.tempo_preparo
                from receitas
                    inner join categorias on categorias.id = receitas.categoria`

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

app.get('/possoFazer', auth, (req, res) => {
    let usuario_logado = req.loggedUser.user
    let data = []
    
    let query = `
                select
                    receita
                from
                    (
                        select 
                            total_receitas.receita,
                            total_receitas.total,
                            count(ingredientes_receita.ingrediente) as disponiveis
                        from
                            (
                                select 
                                        ingredientes_receita.receita,
                                        count(ingredientes_receita.ingrediente) as total
                                    from ingredientes_receita
                                    inner join estoque on estoque.ingrediente = ingredientes_receita.ingrediente
                                group by receita
                            ) as total_receitas, 
                            ingredientes_receita
                            inner join estoque on ingredientes_receita.ingrediente = estoque.ingrediente
                            where estoque.quantidade >= ingredientes_receita.quantidade
                            and estoque.usuario = ?
                        group by total_receitas.receita
                    ) as resultado
                    where resultado.disponiveis >= resultado.total
                `

    data.push(usuario_logado)
    
    db.query(query, data, (err, result) => {
        if(!err){
            if(result[0]){
                data = []
                
                let query = `select 
                                receitas.id,
                                categorias.nome,
                                receitas.nome,
                                receitas.rendimento,
                                receitas.tempo_preparo
                            from receitas
                                inner join categorias on categorias.id = receitas.categoria
                                where receitas.id = ?`
                
                data.push(result[0].receita)

                console.log(result)
                
                for(let i = 1; i < result.length; i++){
                    query += ' or receitas.id = ? '
                    data.push(result[i].receita)
                }
                
                console.log(query)
                console.log(data)

                db.query(query, data, (err, result) => {
                    if(!err){
                        res.status(200)
                        res.send(result)
                    }else{
                        res.status(401)
                        res.send(err)
                    }
                })
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
       update ingredientes set nome = ? where id = ?
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
    let query = `delete from ingredientes_receita where receita = ? `
    db.query(query, id, (err, result) => {
        if(!err){
            let query = `delete from comentarios where receita = ? `
            db.query(query, id, (err, result) => {
                if(!err){
                    let query = `delete from receitas where id = ? `
                    db.query(query, id, (err, result) => {
                        if(!err){
                            res.status(200)
                            res.send(result)
                        }else{
                            res.status(401)
                            res.send(err)
                        }
                    })
                }else{
                    res.status(401)
                    res.send(err)
                }
            })
        }else{
            res.status(401)
            res.send(err)
        }
    })
})

module.exports = app;