const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app
  .use(favicon('./favicon.ico'))
  .use(morgan('dev'))
  .use(bodyParser.json())

require('./src/routes/createPokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/initDatabase')(app)

// Start listener
app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`)
})
