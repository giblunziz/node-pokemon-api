const {Pokemon} = require('../db/sequelize')
const {ValidationError} = require("sequelize");
const detail = require("../helpers/validationErrorHelper");

module.exports = (app) => {
  app.put('/api/pokemon/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    let unsetId = false
    if( body.id ) {
      body.id = undefined
      unsetId = true
    }
    Pokemon.update(body, {
      where: {id: id}
    })
      .then(_ => {
        Pokemon.findByPk(id)
          .then(pokemon => {
            let response = {
              message: `Le pokémon ${pokemon.name} a bien été modifié.`,
              data: pokemon
            }
            if( unsetId )
              response = { ...response, warning:"L'ID du Pokemon n'a pas été modifié" }
            res.json(response)
          })
          .catch(error => {
            res.status(404).json({error: `Pokemon ${id} not found`})
          })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          const detailObject = new detail(error)
          return res.status(400).json({message: error.message, data: detailObject})
        }
        return res.status().json({message: "Unable to update data", data: error})
      })
  })
}
