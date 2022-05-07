import express from 'express'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository'
import { NodemailerMailServices } from './services/nodemailer/nodemailer-mail-services'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case'

export const routes = express.Router()

// O express bate no endpoint e nos trás a requisição é tudo que vem de informação no momento em que o usuário chama
// essa rota. Já a resposta é o mesmo conteúdo das requisições, porém com a resposta a gente passa a ter como
// manipular essas informações.
routes.post('/feedbacks', async (req, res) => {
  // Estou desestruturando o req.body.
  const { type, comment, screenshot } = req.body

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailService = new NodemailerMailServices()
    // Inversão é isso, é passar o PrismaFeedbacksRepository como parâmetro para o SubmitFeedbackUseCase e não fazer
    // com que o SubmitFeedbackUseCase seja dependente de PrismaFeedbacksRepository
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailService
    )

    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot
    })

    // 201 é o status padrão quando quero sinalizar que alguma coisa foi criada no Backend.
    return res.status(201).send()
  } catch {

  }
})