const { Model, DataTypes } = require('sequelize');

class Treatment_Customer extends Model {
 
  static init(connection) {
    super.init({
      treatment_id: DataTypes.STRING,
      customer_id: DataTypes.INTEGER,
      createdby: DataTypes.STRING,
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'Treatment_Customers',
    })
  }
}; 
module.exports = Treatment_Customer;