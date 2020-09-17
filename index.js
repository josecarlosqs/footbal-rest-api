require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined'))

const { doApiRequest } = require('./inc/football-data')
const { configureResponses } = require('./inc/middlewares')

app.use(configureResponses)

const port = process.env.APP_PORT || 8080

app.get('/competitions', async ({res}) => {
  try{
    const response = await doApiRequest('/competitions')
    return res.success(response)
  }catch(e){
    console.error(e)
    res.fail(500, {
      error: 'No se pudo acceder a la data del servidor.'
    })
  }
})

app.get('/competitions/:competition_id([0-9]+)', async (req, res) => {
  try{
    const response = await doApiRequest('/competitions/' + req.params.competition_id)
    return res.success(response)
  }catch(e){
    console.error(e.response.data)
    res.fail(500, {
      error: 'No se pudo acceder a la data del servidor.'
    })
  }
})

app.get('*', function(req, res){
  return res.fail(404)
})

app.listen(port, '127.0.0.1', () => {
  console.log(`Service started and accessible through http://127.0.0.1:${port}/`)
})