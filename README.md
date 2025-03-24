<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  

## Descrição

Essa é a MarketAPI, criada para registrar produtos e pedidos de um mercado.

link documentação : https://www.postman.com/paulobittencourtdev/workspace/marketapi

## Como instalar a aplicação

```bash
Escolha uma pasta para criar clonar o projeto, usando um terminal.
Use o comando abaixo
$ git clone https://github.com/PauloBittencourt2077/MarketAPI
```

## Instalar dependências obrigatórias

```bash
$ npm install
```

## Iniciando a aplicação através do Nodejs

```bash
$ npm run start:dev
```

## Execute Teste unitário com Jest

```bash
# unit tests
$ npm run test
```

## Deployment

Também é possível executar o projeto através do Docker.
Use os comandos a seguir.

```bash
Escolha uma pasta para criar clonar o projeto, usando um terminal.
Use o comando abaixo
$ git clone https://github.com/PauloBittencourt2077/MarketAPI
```

```bash
Criando um banco de dados Postgres com Docker
$ docker run -e POSTGRES_USER=paulo -e POSTGRES_PASSWORD=123 -p 5432:5432 -d postgres:latest

```

```bash
Execute o comando na raiz do projeto
$ docker-compose up --build
```

Link da Documentação no Postman : https://www.postman.com/paulobittencourtdev/workspace/marketapi

Para começar a usar essa API, é preciso inicialmente criar um usuário,
link da documentação de Users : https://documenter.getpostman.com/view/15252156/2sAYkHoyXu

Ao criar esse usuário, é preciso gerar um token para acessar as outras rotas,
link da documentação de Login : https://documenter.getpostman.com/view/15252156/2sAYkHoyPD

Após isso é possível listar produtos, editar, deletar ou listar um produto,
link da documentação dos Produtcs : https://documenter.getpostman.com/view/15252156/2sAYkHnHfv

Posteriormente é possível criar pedidos e editar pedidos,
link da documentação Orders : https://documenter.getpostman.com/view/15252156/2sAYkHoyTV

Recomendo acessar o link https://www.postman.com/paulobittencourtdev/workspace/marketapi, no qual é possível usar todas requisições no postman.



- Desenvolvedor - [Paulo Bittencourt](https://www.linkedin.com/in/paulobittencourt2077/)
- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
