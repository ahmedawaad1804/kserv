const jwt = require('jsonwebtoken');
const {SECRET_KEY , tokenDuration }=require('../commonConstant')

exports.generateJwt=function(plainText){
    let token = jwt.sign(plainText,SECRET_KEY , {expiresIn: tokenDuration });
    return token;
}

exports.checkToken=function(plainText,token){
    let decodedToken = jwt.verify(token,SECRET_KEY );
    if(decodedToken==plainText)
    {
        return true 
    }
    else {
        return false 
    }
}
