const {Pokemon} = require('../db/sequelize')
const {Op} = require('sequelize')

module.exports = (app) => {
  app.get('/api/pokemon', (req, res) => {
    let query = {}
    const limit = parseInt(req.query.limit) || 5

    if (req.query.name) {
      if ( req.query.name.length > 1 ) {
        query['name'] = {[Op.like]: `%${req.query.name}%`}
      } else {
        return res.status(400).json({message: 'Le critère de recherche par nom doit comporter un minimum de 2 caractères.'})
      }
    }

    if (req.query.hp) {
      query['hp'] = {[Op.gte]: req.query.hp}
    }

    if (Object.keys(query).length) {
      query = {where: query, limit: limit, order: ['name']}
    }
    Pokemon.findAndCountAll(query)
      .then(({count, rows}) => {
        const message = {
          length: rows.length,
          total: count
        }
        res.json({message, data: rows})
      })
      .catch(error => {
        res.status(500).json({message: "Impossible de récupérer les données pour le moment", data: error})
      })
  })
}
