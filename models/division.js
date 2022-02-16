const { Model, DataTypes } = require('sequelize');

class Division extends Model {

  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      nickname: DataTypes.STRING,
      registry: DataTypes.STRING,
      email: DataTypes.STRING,
      representative_id: DataTypes.STRING,
      partner_id: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      city: DataTypes.STRING,
      theme: DataTypes.STRING,
      expiresDate: DataTypes.DATE,
      lockedDate: DataTypes.DATE,
      createdby: DataTypes.STRING,
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'Division',
    })
  }
};
module.exports = Division;