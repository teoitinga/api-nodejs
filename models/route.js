const { Model, DataTypes } = require('sequelize');

class Route extends Model {
 
  static init(connection) {
    super.init({
      route: DataTypes.STRING,
      createdby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'Route',
    })
  }
}; 
module.exports = Route;