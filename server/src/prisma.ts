// Criando um novo feedback!

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  // Log seria para mostrar no terminal as query (INSERT, UPDATE, DELETE) sendo realizadas.
  log: ['query'],
})