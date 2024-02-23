# Projeto Backend - Java

Este é um projeto Java para o backend de uma aplicação fullstack. Ele utiliza o framework Spring Boot e o Maven para gerenciamento de dependências. O projeto inclui entidades como Cliente e Produto, bem como controladores REST para manipular essas entidades.

## Configuração do Projeto

O projeto está configurado como um projeto Maven e utiliza o Spring Boot. Certifique-se de ter o Java 11 instalado em sua máquina.

### Dependências

- **Spring Boot Starter Data JPA:** Facilita a implementação da camada de persistência.
- **Spring Boot Starter Validation:** Fornece suporte para validação de dados.
- **Spring Boot Starter Web:** Habilita recursos para o desenvolvimento de aplicativos da web.
- **Spring Boot DevTools:** Fornece ferramentas de desenvolvimento adicionais para aumentar a produtividade.
- **H2 Database:** Um banco de dados em memória para ambiente de desenvolvimento.
- **PostgreSQL:** Banco de dados relacional para ambientes de produção.
- **Spring Boot Starter Test:** Contém dependências para testes automatizados.

## Estrutura do Projeto

O projeto possui duas entidades principais: `Cliente` e `Produto`. Cada entidade possui sua própria classe de modelo, repositório e controlador REST.

### Cliente

A classe `Cliente` representa um cliente e possui atributos como nome, CPF, endereço, etc. O controlador `ClienteController` oferece endpoints para operações CRUD.

### Produto

A classe `Produto` representa um produto e inclui atributos como nome, descrição, preço, etc. O controlador `ProdutoController` oferece endpoints para operações CRUD.

## Executando o Projeto

Certifique-se de ter configurado corretamente o arquivo `pom.xml`. Você pode executar o projeto usando a IDE de sua escolha ou usando o seguinte comando Maven:

```bash
mvn spring-boot:run
```

O aplicativo estará disponível em `http://localhost:8080`.

## Documentação da API

### Cliente Endpoints

- **POST /api/clientes:** Adiciona um novo cliente.
- **PUT /api/clientes/{id}:** Atualiza um cliente existente.
- **GET /api/clientes/{id}:** Retorna os detalhes de um cliente específico.
- **DELETE /api/clientes/{id}:** Exclui um cliente específico.
- **GET /api/clientes:** Retorna uma lista de clientes com opções de filtragem por nome e CPF.

### Produto Endpoints

- **POST /api/produtos:** Adiciona um novo produto.
- **PUT /api/produtos/{id}:** Atualiza um produto existente.
- **GET /api/produtos/{id}:** Retorna os detalhes de um produto específico.
- **DELETE /api/produtos/{id}:** Exclui um produto específico.
- **GET /api/produtos:** Retorna uma lista de produtos.

## Observações

- O projeto utiliza o banco de dados H2 para ambiente de desenvolvimento e o PostgreSQL para produção.
- Certifique-se de configurar as propriedades do banco de dados no arquivo `application.properties` conforme necessário.
- Os controladores possuem anotações `@CrossOrigin` para permitir solicitações de qualquer origem. Isso pode ser ajustado conforme a necessidade de segurança.
