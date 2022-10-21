# Todo List 📝
Este é o projeto Fullstack de uma lista de tarefas onde pessoas usuárias podem realizar **cadastro e login** bem como **c**riar, **l**er, **a**tualizar e **d**eletar (**CRUD**) suas tarefas.

## Sumário
- [Entendendo o projeto](https://github.com/tainnaps/todo-list-full-stack#entendendo-o-projeto)
  - [Containers](https://github.com/tainnaps/todo-list-full-stack#containers)
  - [Backend](https://github.com/tainnaps/todo-list-full-stack#backend)
  - [Frontend](https://github.com/tainnaps/todo-list-full-stack#frontend)
- [Executando o projeto](https://github.com/tainnaps/todo-list-full-stack#executando-o-projeto)
- [Executando os testes](https://github.com/tainnaps/todo-list-full-stack#executando-os-testes)
  - [Backend](https://github.com/tainnaps/todo-list-full-stack#backend-1)
  - [Frontend](https://github.com/tainnaps/todo-list-full-stack#frontend-1)

## Entendendo o projeto
O projeto foi desenvolvido num *monorepo* (um único repositório) contento a implementação do back-end, front-end e dos containers de desenvolvimento da aplicação.

### Containers
O projeto utiliza Docker Compose para orquestrar múltiplos containers de desenvolvimento.

Ao todo, foram utilizados 3 containers, sendo eles:

- `db`: serviço do banco de dados da aplicação.
- `api`: serviço da API da aplicação.
- `ui`: serviço da interface da pessoa usuária com a aplicação.

As particularidades e dependências de cada container podem ser vistas no arquivo [docker-compose.yml](https://github.com/tainnaps/todo-list-full-stack/blob/main/docker-compose.yml).

### Back-end
O back-end do projeto é formado pelo banco de dados, que armazena os dados das pessoas usuárias e suas tarefas, e pela API, que controla o acesso ao banco de dados a partir de requisições feitas no front-end.

#### Banco de dados
O banco de dados utilizado é o `MySQL`, um banco relacional. Essa escolha foi feita porque usuários e tarefas, as entidades trabalhadas na aplicação, possuem um relacionamento fundamental entre si.

As tabelas do banco, Users e Tasks, têm relacionamento 1:N e possuem os seguintes atributos:

##### Users

| id | name | email | password |
| ----------- | ----------- | ----------- | ----------- |
| integer | string | string | string |

- `id`: identificador único da pessoa usuária.
- `name`: nome da pessoa usuária.
- `email`: email único da pessoa usuária.
- `password`: senha da pessoa usuária.

##### Tasks

| id | name | status | user_id | created_at
| ----------- | ----------- | ----------- | ----------- | ----------- |
| integer | string | string | integer | date |

- `id`: identificador único da tarefa.
- `name`: nome da tarefa.
- `status`: status da tarefa (Pendente, Em progresso ou Pronta).
- `user_id`: identificador único da pessoa usuária a qual a tarefa pertence.
- `created_at`: data de criação da tarefa.

#### API
A API é RESTful (segue as restrições da arquitetura REST) e foi desenvolvida em `Node.js` com a arquitetura MSC (Model, Service, Controller) para separação de responsabilidades.

##### Tecnologias
As tecnologias utilizadas para construção da API foram:

- `express`: para construir o servidor da API.
- `joi`: para validar os dados enviados à API.
- `cors`: para liberar o acesso à API.
- `jsonwebtoken`: para gerar e validar tokens de acesso usados em endpoints da API.
- `sequelize`: para mapear as entidades do banco de dados em objetos.
- `md5`: para gerar o hash das senhas das pessoas usuárias que serão guardados no banco de dados.

##### Documentação
Para ver os endpoints da API e o formato de requisição para cada um deles, acesse a [documentação da API](https://documenter.getpostman.com/view/20099081/2s7YfGDcum).

### Front-end

## Executando o projeto

## Executando os testes
### Backend

### Frontend
