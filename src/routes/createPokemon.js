const {Pokemon} = require('../db/sequelize')
const {ValidationError} = require("sequelize");
const detail = require('../helpers/validationErrorHelper')

module.exports = (app) => {
  app.post('/api/pokemon', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({message, data: pokemon})
      })
      .catch(error => {
        if( error instanceof ValidationError) {
          return res.status(400).json({message: error.message, data: new detail(error)})
        }
        res.status(500).json({message: `Impossible de créer votre pokemon`, data: error})
      })

  })
}
