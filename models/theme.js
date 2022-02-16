const { Model, DataTypes } = require('sequelize');

class Theme extends Model {
 
  static init(connection) {
    super.init({
      description: DataTypes.STRING,
      class: DataTypes.STRING,
      type: DataTypes.STRING,
      createdby: DataTypes.STRING,
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'Theme',
    })
  }
};
module.exports = Theme;