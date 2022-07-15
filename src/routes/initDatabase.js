const sequelize = require("../db/sequelize");

module.exports = (app) => {
  app.patch('/api/admin/pokemon', (req, res) => {
    sequelize.initDb()
      .then(_ => {
        console.log("Initialisation terminée")
        res.json({message: "Base de données initialisée"})
      })
      .catch(error => {
        console.error("Erreur d'initialisation", error)
        res.status(500)
        res.json({error: error})
      })

  })
}
