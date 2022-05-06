import nodemailer from 'nodemailer'
import { MailServices, SendMail } from "../mail-services"

// Usando o serviço mailtrap.io e a lib nodemailer. Preciso ter essas informações.
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "00188b19a4fcce",
    pass: "bf0338f273b008"
  }
})

export class NodemailerMailServices implements MailServices {
  async sendMail({ body, subject }: SendMail) {
    // Por aqui passo as informações do e-mail, para quem vai, de onde está vindo, assunto, corpo do e-mail.
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Jhonatan Gabriel Alves <jhonatangalves96@gmail.com>',
      subject,
      html: body
    })
  }
}