const { Model, DataTypes } = require('sequelize');

class CredRuralItensFinanciaveis extends Model {

    static init(connection) {
        super.init({
            representacaobd: DataTypes.STRING,//banco que concedeu a proposta de financiamento
            atividade: DataTypes.STRING,//
            descricao: DataTypes.STRING,//
            unidade: DataTypes.STRING,//custeio, investimento
            createdby: DataTypes.STRING,
            updatedby: DataTypes.STRING,
            created: DataTypes.DATE,
            updated: DataTypes.DATE
        }, {
            createdAt: 'created',
            updatedAt: 'updated',
            sequelize: connection,
            modelName: 'itensfinanciaveis',
        })
    }
};
module.exports = CredRuralItensFinanciaveis;