const {Pokemon} = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemon/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if (pokemon) {
          const message = 'Un pokémon a bien été trouvé.'
          res.json({message, data: pokemon})
        } else {
          res.status(404).json({error: `Pokemon ${req.params.id} not found`})
        }
      })
  })
}
