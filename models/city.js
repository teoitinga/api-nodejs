const { Model, DataTypes } = require('sequelize');

class City extends Model {
 
  static init(connection) {
    super.init({
      city: DataTypes.STRING,
      uf: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'Cities',
    })
  }
};
module.exports = City;