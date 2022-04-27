const express = require("express")
const app = express()
//const conn = require('./database/database')

//const { redirect } = require("express/lib/response")
const port = 8080

// conn.authenticate().then(()=>{
//     console.log("Database connected")
// }).catch((msg) =>{
//     console.log("ERROR: " + msg)
// })

app.set('view engine','ejs')
app.use(express.static('public'))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// ROUTES

app.get("/",(req,res) => {
    res.render("index")
})

app.get("/receitas",(req,res) => {
    res.render("receitas")
})

app.get("/mamaco",(req,res) => {
    res.render("receita")
})

app.get("/ingredientes",(req,res) => {
    res.render("ingredientes")
})


app.listen(port, () => console.log(`Application running at the port ${port}`))