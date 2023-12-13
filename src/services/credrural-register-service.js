const { ServerErrorException } = require('../exceptions/server-exception');
const { request } = require('express');
const uuid = require('uuid');
const moment = require('moment');

const CrPropostaDto = require('../../src/dtos/crproposta-dto');
const ItemFinanciaoDto = require('../../src/dtos/itemfinanciado-dto');
const ItemFinanciadoModel = require('../../models/itensfinanciados');
const crPropostaModel = require('../../models/credrural');

class CredRuralRegister {
    async quitDaeOnProject(id, valor, credendial) {

        let proposta = await crPropostaModel.findOne({ where: { id } });

        let dtpgm = valor ? valor : 0;

        if(!proposta.rdaok) {
            dtpgm = moment().format('YYYY-MM-DD HH:mm:ss');

        } else{
            dtpgm = null;
            valor = 0;

        }

        await crPropostaModel.update({
            rdaok: dtpgm,
            rda: valor,
            updated: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedby: credendial.userId
        }, {
            where: {
                id
            },
        });
        
        proposta = await crPropostaModel.findOne({ where: { id } });

        return {proposta: proposta.id, valor: proposta.rda, rdaok: proposta.rdaok };

    }
    async riskItemOnProject(id, credendial, toRisked) {
        
        let risked = moment().format('YYYY-MM-DD HH:mm:ss');
        
        if(!toRisked) risked = null;

        await ItemFinanciadoModel.update({
            risked,
            updated: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedby: credendial.userId
        }, {
            where: {
                id
            },
        });
        const itemfinanciado = await ItemFinanciadoModel.findOne({ where: { id } });
        
        return itemfinanciado.risked;
    }
    async quitArtOnProject(id, valor, credendial) {

        let proposta = await crPropostaModel.findOne({ where: { id } });

        let dtpgm = valor ? valor : 0;

        if(!proposta.trtok) {
            dtpgm = moment().format('YYYY-MM-DD HH:mm:ss');

        } else{
            dtpgm = null;
            valor = 0;

        }

        await crPropostaModel.update({
            trtok: dtpgm,
            trt: valor,
            updated: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedby: credendial.userId
        }, {
            where: {
                id
            },
        });
        
        proposta = await crPropostaModel.findOne({ where: { id } });

        return {proposta: proposta.id, valor: proposta.trt, trtok: proposta.trtok };
    }
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