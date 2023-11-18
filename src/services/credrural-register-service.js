const { ServerErrorException } = require('../exceptions/server-exception');
const { request } = require('express');
const uuid = require('uuid');

const CrPropostaDto = require('../../src/dtos/crproposta-dto');
const ItemFinanciaoDto = require('../../src/dtos/itemfinanciado-dto');
const ItemFinanciadoModel = require('../../models/itensfinanciados');
const crPropostaModel = require('../../models/credrural');

class CredRuralRegister {

    async regItem(i, id) {

        const proposta = await crPropostaModel.findOne({ where: { id } });
        let nitem = new ItemFinanciaoDto(i);

        nitem.id = uuid.v4().toUpperCase()
        nitem.idproposta = proposta.id;

        try {
            const newitem = ItemFinanciadoModel.create(nitem);
            nitem = undefined;
            return newitem;

        } catch (e) {
            throw new ServerErrorException(e);
        }
    };

    async regCredRural(cr) {

        let proposta = await new CrPropostaDto(cr);

        try {
            proposta = await crPropostaModel.create(proposta);
        } catch (e) {
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

            try {
                const newitem = ItemFinanciadoModel.create(nitem);
                nitem = undefined;
                // console.log('Registered item');
                // console.log('#################################');
                // console.log(newitem);
                return newitem;

            } catch (e) {
                throw new ServerErrorException(e);
            }
        })

    }
}
module.exports = CredRuralRegister;