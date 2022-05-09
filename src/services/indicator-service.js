const moment = require('moment');
const uuid = require('uuid');

const PythonService = require('../services/python-service');
const pythonService = new PythonService();

class IndicatorService {
    async updateCepea(){
        const response = await pythonService.updateCepea();
        return response;
    }
    async reloadCepea(){
        const response = await pythonService.reloadCepea();
        return response;
    }
    async actualPrices(){
        const response = await pythonService.getActualPrices();
        return response;
    }
    async cepeaBezerro() {
        const response = await pythonService.getMediaAnualBezerro();
        return {
            dados: response,
            titulo: 'Evolução dos precos do Bezerro',
            fonte: 'CEPEA'
        }
    }

    async cepeaMilho() {
        const response = await pythonService.getMediaAnualMilho();
        return {
            dados: response,
            titulo: 'Evolução dos precos da saca de milho',
            fonte: 'CEPEA'
        }
    }
    async cepeaCafeArabica() {
        const response = await pythonService.getMediaAnualCafeArabica();
        return {
            dados: response,
            titulo: 'Evolução dos precos da saca de Café Arábica',
            fonte: 'CEPEA'
        }
    }
    
    async cepeaCafeRobusta() {
        const response = await pythonService.getMediaAnualCafeRobusta();
        return {
            dados: response,
            titulo: 'Evolução dos precos da saca de Café Robusta',
            fonte: 'CEPEA'
        }
    }

    async cepeaBoi() {
        const response = await pythonService.getMediaAnualBoi();
        return {
            dados: response,
            titulo: 'Evolução dos precos do Boi gordo',
            fonte: 'CEPEA'
        }
    }
    async cepeaLeiteMg() {
        const response = await pythonService.getMediaAnualLeite();
        return {
            dados: response,
            titulo: 'Evolução dos precos do leite em MG',
            fonte: 'CEPEA'
        }
    }
}
module.exports = IndicatorService;