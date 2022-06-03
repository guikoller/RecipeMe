const mysql = require('mysql2');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'koller',
    password : 'password',
    database : 'recipeme'
})

module.exports = connection