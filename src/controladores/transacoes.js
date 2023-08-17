const { depositos, saques, transferencias } = require("../bancodedados");
const { verificarContaExistente, formatarDataRegistro, validarSenhaCliente } = require("../funcoes-utilitarias/funcoes");

const depositar = (req, res)=>{

    const {numero_conta, valor} = req.body;
        
    if(!numero_conta || !valor) {
        return res.status(400).json({mensagem:'os parâmetros obrigatórios não foram inseridos'});
    }

    const contaEncontrada = verificarContaExistente(numero_conta);

    if(!contaEncontrada){
        return res.status(404).json({mensagem:'conta não encontrada'});

    }

    if (valor<=0){
        return res.status(400).json({mensagem:'valor inválido'});
    }

    contaEncontrada.saldo += valor;

    const registro = {
        data: formatarDataRegistro(new Date()),
        numero_conta,
        valor
    };

    depositos.push(registro);

    return res.status(201).json({mensagem:'Depósito realizado com sucesso'});

}


const sacar = (req, res)=>{ 

    const {numero_conta, valor, senha} = req.body;

    if(!numero_conta || !valor || !senha) {
        return res.status(400).json({mensagem:'os parâmetros obrigatórios não foram inseridos'});
    }

    const contaEncontrada = verificarContaExistente(numero_conta);

    if(!contaEncontrada){
        return res.status(400).json({mensagem:'conta não encontrada'});

    }

    if (!validarSenhaCliente(senha, contaEncontrada.usuario.senha)) {
        return res.status(403).json({mensagem:'Senha incorreta - Usuário não autorizado'});
    }

    if (valor > contaEncontrada.saldo){
        return res.status(400).json({mensagem:'saldo insuficiente para operação'})

    }

    contaEncontrada.saldo -= valor;

    const registro = {
        data: formatarDataRegistro(new Date()),
        numero_conta,
        valor
    }

    saques.push(registro);

    return res.status(200).json({mensagem:'Saque realizado com sucesso'});

}

const transferir = (req, res) => {

    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body;

    if(!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({mensagem:'os parâmetros obrigatórios não foram inseridos'});
    }

    const contaOrigemEncontrada = verificarContaExistente(numero_conta_origem);

    const contaDestinoEncontrada = verificarContaExistente(numero_conta_destino);
    
    if(!contaOrigemEncontrada){
        return res.status(400).json({mensagem:'conta origem não encontrada'});

    }

    if(!contaDestinoEncontrada){
        return res.status(400).json({mensagem:'conta destino não encontrada'});

    }

    if (!validarSenhaCliente(senha, contaOrigemEncontrada.usuario.senha)) {
        return res.status(403).json({mensagem:'Senha incorreta - transferência não autorizada'});
    }

    if (valor <= 0 || valor > contaOrigemEncontrada.saldo){
        return res.status(400).json({mensagem:'saldo insuficiente para operação'})

    }


    contaOrigemEncontrada.saldo -= valor;
    contaDestinoEncontrada.saldo += valor;

    const registro = {
        data: formatarDataRegistro(new Date()),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(registro);

    return res.status(201).json({mensagem:'Transferência realizada com sucesso'});

}

const consultarSaldo = (req, res) => {

    const {numero_conta, senha} = req.query;

    if(!numero_conta || !senha) {
        return res.status(400).json({mensagem:'os parâmetros obrigatórios não foram inseridos'});
    }

    const contaEncontrada = verificarContaExistente(numero_conta);

    if(!contaEncontrada){
        return res.status(400).json({mensagem:'conta não encontrada'});

    }

    if (!validarSenhaCliente(senha, contaEncontrada.usuario.senha)) {
        return res.status(403).json({mensagem:'Senha incorreta - acesso não autorizado'});
    }


    return res.status(200).json({saldo: contaEncontrada.saldo});
 

}

const extrato = (req, res) => {

    const {numero_conta, senha} = req.query;

    if(!numero_conta || !senha) {
        return res.status(400).json({mensagem:'os parâmetros obrigatórios não foram inseridos'});
    }

    const contaEncontrada = verificarContaExistente(numero_conta);

    if(!contaEncontrada){
        return res.status(400).json({mensagem:'conta não encontrada'});

    }

    if (!validarSenhaCliente(senha, contaEncontrada.usuario.senha)) {
        return res.status(403).json({mensagem:'Senha incorreta - acesso não autorizado'});
    }

    const resultadoEncontrado = {
        depositos: depositos.filter((item)=>{
            return item.numero_conta === numero_conta;
        }),
        saques: saques.filter((item)=>{
            return item.numero_conta === numero_conta;
        }),
        transferenciasEnviadas: transferencias.filter((item)=>{
            return item.numero_conta_origem === numero_conta;
        }),
        transferenciasRecebidas: transferencias.filter((item)=>{
            return item.numero_conta_destino === numero_conta;
        })
        
    }

    return res.status(200).json(resultadoEncontrado);

}


module.exports = {
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    extrato
}