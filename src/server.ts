import fastify from "fastify";

const app = fastify();

// Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ...

// Corpo da requisição (Request Body)
// Parâmetros de busca (Search Params / Query Params) `http://localhost:3333/users?search=Gabriel`
// Parâmetros de rota (Route Params) -> Identificação de recursos `DELETE http://localhost:3333/users/5`
// Cabeçalhos (Headers) -> Contexto

// Semântica = Significado

// Driver nativo / Query Builders / ORMs

// Object Relational Mapping (Hibernate / Doctrine / ActiveRecord)

app.get("/", () => {
  return "Hello NLW Unite!";
});

app.get("/users", () => {
  return "Users";
});

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
