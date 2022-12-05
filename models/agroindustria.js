const { Model, DataTypes } = require('sequelize');

class AgroindustriaModel extends Model {
 
  static init(connection) {
    super.init({
      treatmentId: DataTypes.STRING,
      origemmp: DataTypes.STRING(50),
      produto: DataTypes.STRING(50),
      produtoUnid: DataTypes.STRING(10),
      materiaprima: DataTypes.STRING(50),
      materiaprimaunid: DataTypes.STRING(10),
      situacaocertif: DataTypes.STRING(50),
      tipoagro: DataTypes.STRING(50),
      mesfimprod: DataTypes.INTEGER,
      mesinicioprod: DataTypes.INTEGER,
      ppmp: DataTypes.INTEGER,
      prdanual: DataTypes.INTEGER,
      createdby: DataTypes.STRING, 
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'agroindustriaprods',
    })
  } 
}; 
module.exports = AgroindustriaModel;