import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

// Estou criando uma função espiã (jest.fn()) para as minhas duas funcionalidades existentes no meu caso de uso
// somente para saber se ela foi chamada ou não, e não para saber se deu tudo certo com o envio para o banco de dados
// e e-mail.
const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

// Lembrando que SubmitFeedbackUseCase ele tem duas dependencias, porém, elas são externas, que são os serviços
// para conectar com o meu banco de dados e o de envio de e-mails, e o teste unitário não é para testar essas
// conexões externas. Somente as funcionalidades do SubmitFeedbackUseCase.
// Então eu passo essas duas dependencias, chamo as funcionalidades delas, porém, vazias '() => {}', pois eu não quero
// testalas, somente o meu caso de uso.
const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

// É um switch de testes. Crio vários testes pra uma única funcionalidade ('Submit feedback').
describe('Submit feedback', () => {
  // Posso usar a key word it ou test.
  // Estou testando se eu consigo enviar um feedback na minha aplicação!
  it('Should be able to submit a feedback', async () => {
    // Ou seja, eu espero que quando eu chamar o meu novo SubmitFeedbackUseCase que é o submitFeedback e chamar o
    // método execute deste caso de uso, passando os parâmetros, eu espero que ele resolva e não dispare nenhum
    // erro toThrow().
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64'
    })).resolves.not.toThrow()

    // Ou seja, eu espero que as minhas funções tenham sido chamadas.
    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('Should not be able to submit a feedback without type', async () => {

    // Se não houver um type, eu espero que este teste não chegue até o final (rejects) e ele dispare um error
    // erro toThrow().
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow()
  })

  it('Should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow()
  })

  it('Should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Ta tudo bugado.',
      screenshot: 'test.jpg'
    })).rejects.toThrow()
  })
})