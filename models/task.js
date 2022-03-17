const { Model, DataTypes } = require('sequelize');

class Task extends Model {
 
  static init(connection) {
    super.init({
      description: DataTypes.STRING,
      action_id: DataTypes.INTEGER,
      treatment_id: DataTypes.STRING,
      status: DataTypes.STRING,
      userDesigned_id: DataTypes.STRING,
      qtd: DataTypes.NUMBER,
      valor: DataTypes.NUMBER,
      createdby: DataTypes.STRING,
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'Tasks',
    })
  }
}; 
module.exports = Task;