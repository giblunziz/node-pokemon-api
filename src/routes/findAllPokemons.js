const {Pokemon} = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemon', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = {
          length: pokemons.length
        }
        res.json({message, data: pokemons})
      })
      .catch(error => {
        res.status(500).json({message: "Impossible de récupérer les données pour le moment", data: error})
      })
  })
}
