const { contas } = require("../bancodedados");


function validarCampos(nome, cpf, data_nascimento, telefone, email, senha) {
    if (nome && cpf && data_nascimento && telefone && email && senha) {
        return true} 
    
    return false;
}

function validarCPF(cpf) {
    if (contas.some((conta)=> { return Number(conta.usuario.cpf) === Number(cpf)})){
        return false;
    }
    return true;
    
}

function validarEmail(email) {
    if (contas.some((conta)=> { return conta.usuario.email === email})){
        return false;
    }
    return true;
}


function formatarData(data) {
    const dataSeparada = data.split("/");
    return `${dataSeparada[2]}-${dataSeparada[1]}-${dataSeparada[0]}`;
    
}


function verificarContaExistente(idNum) {
    return contas.find((conta)=>{
        return conta.numero === idNum;
    });

}


function verificarCampos(nome, cpf, data_nascimento, telefone, email, senha) {
    if (nome || cpf || data_nascimento || telefone || email || senha) {
        return true} else {
            return false;
        };
    
}


function saldoZerado(conta){
    if(conta.saldo === 0) {
        return true;
    } else {
        return false;
    }
}

function formatarDataRegistro(data){
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const dia = (data.getDate()).toString().padStart(2, "0");
    const hora = (data.getHours()).toString().padStart(2, "0");
    const minutos = (data.getMinutes()).toString().padStart(2, "0");
    const segundos = (data.getSeconds()).toString().padStart(2, "0");
    return `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
}


function validarSenhaCliente(senha, senhaCliente){
   
    if(senha !== senhaCliente) {
        return false;
    } else {
        return true;
    }

}


module.exports = {
    validarCampos,
    validarCPF,
    validarEmail,
    formatarData,
    verificarContaExistente,
    verificarCampos,
    saldoZerado,
    formatarDataRegistro,
    validarSenhaCliente
}