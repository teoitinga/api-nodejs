const { ServerErrorException } = require('../exceptions/server-exception');
const { request } = require('express');
const uuid = require('uuid');

const CrPropostaDto = require('../../src/dtos/crproposta-dto');
const ItemFinanciaoDto = require('../../src/dtos/itemfinanciado-dto');
const ItemFinanciadoModel = require('../../models/itensfinanciados');
const crPropostaModel = require('../../models/credrural');


class CredRuralRegister {

    async regCredRural(cr) {

        let proposta = await new CrPropostaDto(cr);
        
        try{
            proposta = await crPropostaModel.create(proposta);
        }catch(e){
            throw new ServerErrorException(e);
        }

        let itens = cr.itens;

        itens = await itens.map(i => {

            let nitem = new ItemFinanciaoDto(i);

            nitem.id = uuid.v4().toUpperCase()
            nitem.idproposta = proposta.id;
            nitem.createdby = proposta.createdby;
            nitem.updatedby = proposta.updatedby;
            nitem.created = proposta.created;
            nitem.updated = proposta.updated;

            try{
                return ItemFinanciadoModel.create(nitem);
            }catch(e){
                throw new ServerErrorException(e);
            }
        })

    }
}
module.exports = CredRuralRegister;