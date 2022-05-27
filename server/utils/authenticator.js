class Authenticator{
    constructor(email, senha, res){
        this.email = email
        this.senha = senha
    }
    checkEmail() {
        if(this.email){ 
            return true
        }else{
            return false
        } 
    }
    checkPwd(){
        if(this.senha){ 
            return true
        }else{
            return false
        } 
    }
    auth(){
        if(this.checkEmail() && this.checkPwd()){ 
            return true
        }else{
            return false
        } 
    }
}

module.exports = Authenticator