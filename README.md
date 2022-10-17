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
O projeto está documentado pelo Swagger. 
Para acessar a documentação, basta rodar a aplicação e acessar a rota http://localhost:3000/api do navegador

### Popular o banco de dados:
```bash
Método Get
http://localhost:3000/universities/find
```
Essa rota, utiliza uma API externa e popula o banco de dados com a resposta recebida

