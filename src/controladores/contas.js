const { contas } = require("../bancodedados");
const { validarCampos, validarCPF, validarEmail, formatarData, verificarContaExistente, verificarCampos, saldoZerado} = require("../funcoes-utilitarias/funcoes");
let ultimoId = 1;

const listarContas = (req, res) => {
    if (contas.length === 0) {
        return res.status(404).json({mensagem:'nenhuma conta encontrada'});

    }
    return res.status(200).json(contas);
}

const criarConta = (req, res) => {

    const {nome, cpf, data_nascimento, telefone, email, senha}= req.body;
    
    if (!validarCampos(nome, cpf, data_nascimento, telefone, email, senha)){
        return res.status(400).json({mensagem:'todos os campos são obrigatórios'})
    }
    if (!validarCPF(cpf) || !validarEmail(email)) {
        return res.status(400).json({mensagem:'CPF e/ou email inválidos'})
    }

    const dataFormatada = formatarData(data_nascimento);

    const numero = ultimoId.toString();
    const novoCliente = {
        numero,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento: dataFormatada,
            telefone,
            email,
            senha
        }
    }

    contas.push(novoCliente);

    ultimoId++

    return res.status(201).json(novoCliente);

}


const atualizarUsuario = (req, res) => {
    const {numeroConta} = req.params;
    const {nome, cpf, data_nascimento, telefone, email, senha}= req.body;

    const contaEncontrada = verificarContaExistente(numeroConta);

    if(!contaEncontrada){
        return res.status(404).json({mensagem:'nenhuma conta encontrada'});
    }
   
    if(!verificarCampos(nome, cpf, data_nascimento, telefone, email, senha)){
        return res.status(400).json({mensagem:'nenhum campo preenchido'});
    }

    if(cpf){
       if (!validarCPF(cpf)) { 
        return res.status(400).json({mensagem:'já existe uma conta vinculada ao número do CPF informado'});
       }
    }

    if(email){
        if (!validarEmail(email)) {
            return res.status(400).json({mensagem:'já existe uma conta vinculada ao endereço de e-mail informado'});
        }
    }

    
    contaEncontrada.usuario = {
        nome: nome ?? contaEncontrada.usuario.nome,
        cpf: cpf ?? contaEncontrada.usuario.cpf,
        data_nascimento: data_nascimento?? contaEncontrada.usuario.data_nascimento,
        telefone: telefone ?? contaEncontrada.usuario.telefone,
        email: email ?? contaEncontrada.usuario.email,
        senha: senha ?? contaEncontrada.usuario.senha
    }

    return res.status(201).json({mensagem:'conta atualizada com sucesso'});
 
}

const excluirConta = (req, res)=>{

    const {numeroConta} = req.params;

    const contaEncontrada = verificarContaExistente(numeroConta);

    if(!contaEncontrada){
        return res.status(404).json({mensagem:'nenhuma conta encontrada'});
    }

    if(saldoZerado(contaEncontrada)){
        const indice = contas.findIndex((conta)=>{
            return conta.numero === numeroConta;
        });
        contas.splice(indice, 1);

        return res.status(200).json({mensagem:'conta excluída com sucesso'});

    }
    return res.status(400).json({mensagem:'a exclusão de contas com saldo não é permitida'});

}


module.exports={
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta
}