# Sobre

Resolução dos exercícios do teste para desenvolvedor NodeJS

# Tecnologias utilizadas

- Javascript
- Typescript
- Docker
- MongoDB
- Jest
- Express
- ReactJS
- React Query

# Índice

  1. [Exercícios 1 ao 4](#exercícios-1-ao-4)
      1. [Requisitos](#requisitos)
      2. [Como executar os exercícios](#como-executar-os-exercícios)
  2. [Exercícios 5](#exercício-5)
      1. [Requisitos](#requisitos-1)
      2. [Como executar o exercício](#como-executar-o-exercício)
      3. [Acesso aos serviços](#acesso-aos-serviços)
      4. [Como executar os testes](#como-executar-os-testes)

# Exercícios

## Exercícios 1 ao 4

### Requisitos:

- NodeJS: v16.15+

### Como executar os exercícios:

Acesse a pasta do exercício e execute o `index.mjs`:

```bash
$ cd task-X
$ node src/index.mjs
```

OU execute os arquivos `index.mjs` direto da raiz do projeto:

```bash
$ node task-1/src/index.mjs
$ node task-2/src/index.mjs
$ node task-3/src/index.mjs
$ node task-4/src/index.mjs
```

## Exercício 5

### Requisitos:

* NodeJS: v16.15+
* Docker
* Docker Compose

### Como executar o exercício:

Acesse a pasta do exercício e execute a aplicação:
```bash
$ cd task-5
$ docker compose up
```

### Acesso aos serviços:
- API: http://localhost:3333
- API Documentation: http://localhost:3333/docs
- APP WEB: http://localhost:3000

### Como executar os testes:

Acesse a pasta `server` do exercício 5, instale as dependências e execute o script de teste
```bash
$ cd task-5/server
$ npm i
$ npm run test
```