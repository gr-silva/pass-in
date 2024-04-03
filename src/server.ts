import fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { generateSlug } from "./utils/generate-slug";

const app = fastify();
const prisma = new PrismaClient({
  log: ["query"],
});

// Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ...

// Corpo da requisição (Request Body)
// Parâmetros de busca (Search Params / Query Params) `http://localhost:3333/users?search=Gabriel`
// Parâmetros de rota (Route Params) -> Identificação de recursos `DELETE http://localhost:3333/users/5`
// Cabeçalhos (Headers) -> Contexto

// Semântica = Significado

// Driver nativo / Query Builders / ORMs

// Object Relational Mapping (Hibernate / Doctrine / ActiveRecord)

// JSON - JavaScript Object Notation

// 20x => Sucesso
// 30x => Redirecionamento
// 40x => Erro do cliente (Erro em alguma informação enviada por QUEM está fazendo chamada  p/ API)
// 50x => Erro do servidor (Um erro que está acontecendo INDEPENDENTE do que está sendo enviado p/ o servidor)

app.post("/events", async (request, reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  });

  const { title, details, maximumAttendees } = createEventSchema.parse(
    request.body
  );

  const slug = generateSlug(title);

  const eventWithSlug = await prisma.event.findUnique({
    where: {
      slug,
    },
  });

  if (eventWithSlug !== null) {
    throw new Error("Another event with same title already exists");
  }

  const event = await prisma.event.create({
    data: {
      title,
      details,
      maximumAttendees,
      slug,
    },
  });

  // return { eventId: event.id };
  return reply.status(201).send({ eventId: event.id });
});

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
