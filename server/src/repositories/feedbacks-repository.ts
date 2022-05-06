// Aplicando a letra D do método SOLID.
// Está parte seria o contrato, ou seja, este é o cara que vai dizer para a nossa aplicação (rotas, casos de uso), quais
// são as operações que a gente pode realiza no banco de dados, mas ele não vai implementar essas operações.
// A implementação foi separada e está no arquivo prisma-feedbacks-repository.ts

export interface FeedbacksCreateData {
  type: string
  comment: string
  screenshot?: string
}

export interface FeedbacksRepository {
  create: (data: FeedbacksCreateData) => Promise<void>
}