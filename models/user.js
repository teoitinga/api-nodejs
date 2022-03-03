const {Model, DataTypes, Op} = require('sequelize');

class User extends Model {

  static init(connection){
    super.init({
      name: DataTypes.STRING,
      registry: DataTypes.STRING,
      email: DataTypes.STRING,
      role_id: DataTypes.STRING,
      partner_id: DataTypes.STRING,
      division_id: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      num: DataTypes.STRING,
      district: DataTypes.STRING,
      complement: DataTypes.STRING,
      cep: DataTypes.STRING,
      phone: DataTypes.STRING,
      city: DataTypes.STRING,
      uf: DataTypes.STRING,
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
      modelName: 'User',
    })
  }
};
module.exports = User;