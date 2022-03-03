const { Model, DataTypes } = require('sequelize');

class Project extends Model {
 
  static init(connection) {
    super.init({
      description: DataTypes.STRING,
      representative_id: DataTypes.STRING,
      partner_id: DataTypes.STRING,
      division_id: DataTypes.STRING,
      objetivo: DataTypes.STRING,
      publicoAlvo: DataTypes.STRING,
      justificativa: DataTypes.STRING,
      resultado: DataTypes.STRING,
      city: DataTypes.STRING,
      lockedDate: DataTypes.DATE,
      createdby: DataTypes.STRING,
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'Project',
    })
  }
};
module.exports = Project;