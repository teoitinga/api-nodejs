const { ServerErrorException } = require('../exceptions/server-exception');
const { request } = require('express');
const ProdLeiteModel = require('../../models/prodleite');

class ProducaoRegister{

    async regProdLeite(producao){
        return await ProdLeiteModel.create(producao);
    }    
}
module.exports = ProducaoRegister;