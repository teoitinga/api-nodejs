const { Model, DataTypes } = require('sequelize');

class Mode extends Model {
 
  static init(connection) {
    super.init({
      description: DataTypes.STRING,
      nickname: DataTypes.STRING,
      maxDivision: DataTypes.INTEGER,
      maxUsers: DataTypes.INTEGER,
      valueContract: DataTypes.NUMBER,
      vigencyMonths: DataTypes.INTEGER,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'Mode',
    })
  }
};
module.exports = Mode;