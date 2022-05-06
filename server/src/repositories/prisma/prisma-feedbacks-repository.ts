// Um dos principais motivos da implementação estar rolando dentro deste arquivo é pelo fato de se um dia eu quiser
// usar uma outra lib que faz a mesma coisa do Prisma, eu simplesmente crio uma nova classe.
// Desta forma, minhas operações com o banco de dados não são afetadas.

import { prisma } from "../../prisma";
import { FeedbacksCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbacksCreateData) {
    await prisma.feedback.create({
      data: {
        // Se não tivesse desestruturado, poderia ser data.type.
        // E quando a chave é igual ao valor (type: type), posso usar o método short sintaxe.
        type,
        comment,
        screenshot
      }
    })
  }
}