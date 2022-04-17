const { Model, DataTypes } = require('sequelize');

class Rater extends Model {
 
  static init(connection) {
    super.init({
      local: DataTypes.STRING,
      data: DataTypes.DATE,
      situacao: DataTypes.STRING,
      orientacao: DataTypes.STRING,
      recomendacao: DataTypes.STRING,
      partnerId: DataTypes.STRING,
      divisionId: DataTypes.STRING,
      createdby: DataTypes.STRING,
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'r_aters',
    })
  }
};
module.exports = Rater;