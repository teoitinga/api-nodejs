const { Model, DataTypes } = require('sequelize');

class CredRural extends Model {
  
  static init(connection) {
    super.init({
      banco: DataTypes.STRING(30),//banco que concedeu a proposta de financiamento
      linha: DataTypes.STRING(30),//linha de crédito
      anoprimpgm: DataTypes.DATE,//ano do primeiro pagamento
      anoultpgm: DataTypes.DATE,//ano do ultimo pagamento
      txjurosaa: DataTypes.DECIMAL(4,2),//taxa de juros ao ano
      rda: DataTypes.DECIMAL(4,2),//valor do dae emitido
      rdaok: DataTypes.DATE,//datapgm DAE
      trtok: DataTypes.DATE,//Data do pgm do ART/TRT
      trt: DataTypes.DECIMAL(4,2),//Valor do ART/TRT
      obs: DataTypes.STRING, //Alguma observação importante

      createdby: DataTypes.STRING, 
      updatedby: DataTypes.STRING,
      created: DataTypes.DATE,
      updated: DataTypes.DATE
    }, {
      createdAt: 'created',
      updatedAt: 'updated',
      sequelize: connection,
      modelName: 'crpropostas',
    })
  } 
}; 
module.exports = CredRural;