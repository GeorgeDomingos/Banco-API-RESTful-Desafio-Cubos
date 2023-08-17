const express = require('express');
const rotas = express()
const { listarContas, criarConta, atualizarUsuario, excluirConta } = require("./controladores/contas");
const { depositar, sacar, transferir, consultarSaldo, extrato } = require('./controladores/transacoes');
const { validarSenha } = require('./middlewares/validarSenha');


rotas.get('/contas', validarSenha, listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.delete('/contas/:numeroConta/', excluirConta );
rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo', consultarSaldo);
rotas.get('/contas/extrato', extrato);


module.exports = rotas;