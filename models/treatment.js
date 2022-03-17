const { Model, DataTypes } = require('sequelize');

class Treatment extends Model {
 
  static init(connection) {
    super.init({
      local: DataTypes.STRING,
      data: DataTypes.DATE,
      situacao: DataTypes.STRING,
      orientacao: DataTypes.STRING,
      recomendacao: DataTypes.STRING,
      createdby: DataTypes.STRING,
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'Treatments',
    })
  }
};
module.exports = Treatment;