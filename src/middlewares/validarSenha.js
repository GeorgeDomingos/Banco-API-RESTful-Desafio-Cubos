const { banco } = require("../bancodedados");

const validarSenha = (req, res, next)=>{
    const {senha_banco} = req.query;

    if(!senha_banco) {
        return res.status(401).json({mensagem:'Senha não informada - Usuário não autorizado'});
    }
    if(senha_banco !== banco.senha) {
        return res.status(403).json({mensagem:'Senha incorreta - Usuário não autorizado'});
       
    } 
    next();
    
};

module.exports = {
    validarSenha
}