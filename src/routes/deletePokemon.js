const {Pokemon} = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.delete('/api/pokemon/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        const pokemonDeleted = pokemon;
        return Pokemon.destroy({
          where: {id: pokemon.id}
        })
          .then(_ => {
            const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
            res.json({message, data: pokemonDeleted})
          })

      })
      .catch(error => {
        res.status(404).json({message: `Pokemon ${req.params.id} not found`, data: error.message})
      })
  })
}
