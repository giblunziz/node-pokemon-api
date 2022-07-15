const {User} = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/privaye_key')

module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    console.log("login")

    User.findOne({where: {username: req.body.username}})
      .then(user => {
        if( !user) {
          return res.status(400).json({message: "Authentification invalide"})
        }
        bcrypt.compare(req.body.password, user.password)
          .then(isPasswordValid => {
            if (isPasswordValid) {
              // JWT
              const token = jwt.sign( {userId: user.id}, privateKey, { expiresIn: '24h'})

              const message = `L'utilisateur a été connecté avec succès`;
              return res.json({message, 'access-token': token})
            } else {
              return res.status(400).json({message: "Authentification invalide"})
            }
          })
      })
      .catch(error => {
        res.status(400).json({message: "Authentification invalide"})
      })
  })
}
