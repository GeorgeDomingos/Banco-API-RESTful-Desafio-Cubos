# API Banco Cubos

O projeto foi criado para aplicar os conceitos de APIRESTful em JavaScript realizando as operações básicas como listagem, criação de contas bancárias, atualização de dados de conta, exclusão de conta, depósito, saque, tranferência entre contas, exibição de saldo e extrato de transações.



## Instalação

1. Clone o repositório para sua máquina.
2. Em seu terminal do Node.js, instale os recursos necessários utilizando o comando:

```sh
npm i
```

## Inciciar servidor

1. No terminal, inicie o Nodemon com o comando:

```sh
npm run dev
```
2. Acesse a API no endereço:
```sh
http://localhost:3000
```

## Operações

### Listar Contas:

**GET** `/contas`

- Exibe todas as contas bancárias existentes. 
- É utilizado um parâmetro tipo query informando a senha para liberação do acesso.

### Criar Conta:

**POST** `/contas`

- Cria uma nova conta bancária.
- A requisição é feita com um objeto Json informando os dados do usuário. 

### Atualizar Conta:

**PUT** `/contas/:numeroConta/usuario`

- Atualiza as dados da conta.
- A requisição do número de conta a ser atualizada é feita como parâmetro URL e os dados a serem alterados são passados através de um objeto Json. 

### Excluir Conta:

**DELETE** `/contas/:numeroConta`

- Exclui uma conta existente.
- A requisição do número de conta a ser removida é feita como parâmetro URL. 

### Depositar:

**POST** `/transacoes/depositar`

- Realiza depósitos em uma conta existente.
- A requisição é feita através de um objeto Json contendo número da conta e valor.

### Sacar:

**POST** `/transacoes/sacar`

- Realiza saques em uma conta.
- A requisição é feita através de um objeto Json contendo número da conta, valor e senha  do usuário.

### Transferir:

**POST** `/transacoes/transferir`

- Transfere valores de uma conta para outra.
- A requisição é feita através de um objeto Json contendo número da conta origem, número da conta destino, valor e senha da conta origem.

### Exibir saldo:

**GET** `/contas/saldo`

- Exibe o saldo da conta.
- É utilizado um parâmetro tipo query informando númmero da conta e senha para liberação do acesso.

### Exibir extrato:

**GET** `/contas/extrato`

- Exibe o extrato de movimentações da conta.
- É utilizado um parâmetro tipo query informando númmero da conta e senha para liberação do acesso.



## Implementações futuras

- Incluir verificações para validação de entradas
- Aprimorar a segurança de dados e senhas que não foram alvo da fase do Desafio Cubos, removendo as senhas passadas em parâmetro query e trabalhando com criptografia
- Implementar o banco de dados (permitindo a persistência de dados)


## Contribuidores

- George Domingos
