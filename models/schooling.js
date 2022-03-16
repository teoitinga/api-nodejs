const { Model, DataTypes } = require('sequelize');

class Schooling extends Model {
 
  static init(connection) {
    super.init({
      schooling: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'Schoolings',
    })
  }
}; 
module.exports = Schooling;