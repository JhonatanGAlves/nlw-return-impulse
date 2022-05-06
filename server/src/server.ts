import cors from 'cors'
import express from 'express'
import { routes } from './routes'

const app = express()

// Eu digo para o meu backend quais aplicações frontend pode acessa-lo. Vazio quer dizer todas aplicações.
// Mas se estivesse em produção, o correto seria passar a origem da minha aplicação.
// É preciso ao menos declarar ele pois sem ele nenhuma aplicação consegue ter acesso.
app.use(cors(
  // {
  //   origin: 'https://minhaaplicacao.com'
  // }
))

// Express, vá nas requisições e veja se tem algum body em formato JSON.
app.use(express.json())

// Usando as rotas vindo de routes.
app.use(routes)

// Minha função express está ouvindo a porta 3333.
app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP server running!')
})