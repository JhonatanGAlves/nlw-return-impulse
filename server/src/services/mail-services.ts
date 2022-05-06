export interface SendMail {
  subject: string
  body: string
}

export interface MailServices {
  sendMail: (data: SendMail) => Promise<void>
}