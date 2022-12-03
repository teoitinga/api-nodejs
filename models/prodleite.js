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
      custoopmensal: DataTypes.STRING(30),
      forrageiratipo: DataTypes.STRING,
      forrageiraarea: DataTypes.INTEGER,
      maodeobrautilizada: DataTypes.STRING(30),
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