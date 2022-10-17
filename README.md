<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



## Descrição
Api para buscar as universidades de certos países



## Instalação
```bash
É necessário possuir o Docker instalado.

Após clonar o repositório, é necessário rodar apenas o comando docker-compose up

A aplicação está conteinerizada pelo docker, então com apenas esse comando, tudo será instalado de forma automatica e o servidor da aplicação já estará funcionando
```

## Rotas
O projeto está documentado pelo Swagger

Para acessar a documentação, basta rodar a aplicação e acessar a rota http://localhost:3000/api do navegador


### -Popular o banco de dados:
```bash
Método Get
http://localhost:3000/universities/find
```
Essa rota utiliza uma API externa e popula o banco de dados com a resposta recebida


### -Buscar universidades:
```bash
Método Get
http://localhost:3000/universities
```
Essa roda busca por todas as universidades e mostra seus dados salvos.

Possui paginação e é possivel altera-la pela URL com os query params 'page' e 'limit'

Também é possivel buscar por todas as universidades de um certo país. Para tal ação, é necessário informar o país pelos query params na url. Exemplo: country=argentina

### -Buscar uma universidade:
```bash
Método Get
http://localhost:3000/universities/id
```
Essa rota busca uma unica universidade e mostra seus dados salvos

O id da universidade deve ser passado como parâmetro na URL


### -Criar uma universidade:
```bash
Método Post
http://localhost:3000/universities
```
Essa rota permite salvar uma nova universidade na base de dados

É necessário informar os dados pelo body da requisição: alphaTwoCode, webPages, name, country, domains, stateProvince

A descrição e especificação dos campos, está documentada no Swagger

