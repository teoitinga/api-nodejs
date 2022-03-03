const { Model, DataTypes } = require('sequelize');

class Action extends Model {
 
  static init(connection) {
    super.init({
      description: DataTypes.STRING,
      referency: DataTypes.STRING,
      project_id: DataTypes.STRING,
      objetivo: DataTypes.TEXT,
      qtdAtendimentos: DataTypes.INTEGER,
      valorPorAtendimento: DataTypes.NUMBER,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      createdby: DataTypes.STRING,
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'Action',
    })
  }
};
module.exports = Action;