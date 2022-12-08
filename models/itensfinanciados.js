const { Model, DataTypes } = require('sequelize');

class CredRuralItens extends Model {
 
  static init(connection) {
    super.init({
      finalidade: DataTypes.STRING(30),//banco que concedeu a proposta de financiamento
      atividade: DataTypes.STRING(50),//
      descricao: DataTypes.STRING(20),//
      unidade: DataTypes.STRING(10),//custeio, investimento
      qtditemfinanc: DataTypes.DECIMAL(4,2),//ano do primeiro pagamento
      valorunit: DataTypes.DECIMAL(4,2),//taxa de juros ao ano
      idproposta: DataTypes.STRING,
      createdby: DataTypes.STRING, 
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'itensfinanciados',
    })
  } 
}; 
module.exports = CredRuralItens;