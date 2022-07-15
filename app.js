const express = require('express')
const bodyParser = require('body-parser')


const app = express()
const port = process.env.PORT || 3000

app
  .use(bodyParser.json())

app.get('/', (req, res) => res.json('Server up'))

require('./src/routes/createPokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/initDatabase')(app)

require('./src/routes/login')(app)

// Start listener
app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`)
})
