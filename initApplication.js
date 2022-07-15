const sequelize = require("./src/db/sequelize");

sequelize.initDb()
    .then(_=>console.log("Initialisation terminée"))
    .catch(error=>console.error("Erreur d'initialisation",error))

