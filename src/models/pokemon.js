const validTypes = ['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée']
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le nom de votre Pokemon doit être unique"
      },
      validate: {
        notNull: {msg: "Le nom du Pokemon doit petre renseigné"},
        notEmpty: {msg: "Le nom du Pokemon est obligatoire"},
        len: {args: [3,30], msg: "Le nom du Pokemon doit contenir 3 caractère au minimum"}
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "La valeur doit être un entier"},
        notNull: {msg: "La propriété est obligatoire"},
        min: { args: 1, msg: "Le nombre de point de vie doit être supérieur à ZERO"},
        max: { args: 999, msg: "Le nombre de point de vie maximum est de 999 HP"}
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    types: {
      type: DataTypes.STRING,
      default: [],
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypesValid(value) {
          if(!value) {
            throw new Error('Un Pokemon doit avoir au moins UN type')
          }
          if(value.split(',').length>3) {
            throw new Error('Un Pokemon ne peux pas avoir plus de 3 types')
          }
          value.split(',').forEach(t => {
            if ( !validTypes.includes(t) ) {
              throw new Error(`Les types authorisés sont: ${validTypes}`)
            }
          })
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated'
  })
}
