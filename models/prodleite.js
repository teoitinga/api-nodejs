const { Model, DataTypes } = require('sequelize');

class ProdLeite extends Model {
 
  static init(connection) {
    super.init({
      totalrebanho: DataTypes.INTEGER,
      totalvacas: DataTypes.INTEGER,
      totalvacasord: DataTypes.INTEGER,
      producaodiaria: DataTypes.INTEGER,
      precoporlitro: DataTypes.INTEGER,
      suplementacao: DataTypes.STRING,
      percentvendabezerros: DataTypes.INTEGER,
      percentboigordo: DataTypes.INTEGER,
      customensalestimado: DataTypes.INTEGER,
      forrageiratipo: DataTypes.STRING,
      forrageiraarea: DataTypes.INTEGER,
      maodeobracontratada: DataTypes.INTEGER,
      createdby: DataTypes.STRING,
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'leiteprods',
    })
  } 
}; 
module.exports = ProdLeite;