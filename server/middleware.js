
const jwt = require('jsonwebtoken')
const JWTPassword = 'laudelindo'

const auth = (req, res, next) => {
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

module.exports = auth