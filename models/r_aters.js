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
      
      origin_id: DataTypes.STRING,
      rate1: DataTypes.INTEGER,
      rate2: DataTypes.INTEGER,
      rate3: DataTypes.INTEGER,
      rate4: DataTypes.INTEGER,
      rate5: DataTypes.INTEGER,

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