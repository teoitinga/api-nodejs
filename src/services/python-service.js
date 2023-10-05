require('dotenv').config();
const axios = require('axios');
const moment = require('moment');
const uuid = require('uuid');

const UserCache = require('../core/cache-user');
const cache = new UserCache();

const DivisionService = require('../services/division-service');
const divisionService = new DivisionService();

const R_Aters = require('../../models/r_aters');

const {
    ServerErrorException,
    NotFoundErrorException } = require('../exceptions/server-exception');

class PythonService {
    //API_PATH = 'http://localhost:5000/'; 
    API_PATH = process.env.API_PATH_PYTHON;

    API_QUERY_TITULOS = 'titulos';
    API_QUERY_CAR = 'cars';
    API_QUERY_ATER = 'ater';

    API_QUERY_SIMULA = 'simula';
    API_QUERY_NIVEIS = 'niveis';

    API_QUERY_CEPEA_DATA = 'cepea-update';//Atualiza as tabelas dom o CEPEA
    API_QUERY_CEPEA_RELOAD_DATA = 'cepea-reload-data';//Recarrega os dados
    API_QUERY_CEPEA_DATA_PRICES = 'cepea-atual-prices';//Obtem os principais precos atualizados
    API_QUERY_CEPEA_MEDIA_ANUAL_LEITE = 'media-anual-leite';//Obtem os principais precos atualizados
    API_QUERY_CEPEA_MEDIA_ANUAL_BOI = 'media-anual-boi';//Obtem os principais precos atualizados
    API_QUERY_CEPEA_MEDIA_ANUAL_BEZERRO = 'media-anual-bezerro';//Obtem os principais precos atualizados
    API_QUERY_CEPEA_MEDIA_ANUAL_MILHO = 'media-anual-milho';//Obtem os principais precos atualizados
    API_QUERY_CEPEA_MEDIA_ANUAL_CAFE_ARABICA = 'media-anual-cafe-arabica';//Obtem os principais precos atualizados
    API_QUERY_CEPEA_MEDIA_ANUAL_CAFE_ROBUSTA = 'media-anual-cafe-robusta';//Obtem os principais precos atualizados
    API_QUERY_CEPEA_RELOAD_DATA = 'cepea-reload-data';//Recarrega os dados das planilhas
    API_QUERY_CEPEA_UPDATE = 'cepea-update';//Sicroniza as planilhas do portal Ares com os dados do CEPEA

    async reloadCepea() {

        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_CEPEA_RELOAD_DATA}`
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com o servidor de dados e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );

        return response;

    }
    async updateCepea() {

        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_CEPEA_UPDATE}`
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com o servidor de dados e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );

        return response;

    }
    async getMediaAnualCafeRobusta() {

        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_CEPEA_MEDIA_ANUAL_CAFE_ROBUSTA}`
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com o servidor de dados conexão e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );

        return response.data.data;

    }
    async getMediaAnualCafeArabica() {

        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_CEPEA_MEDIA_ANUAL_CAFE_ARABICA}`
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com o servidor de dados conexão e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );

        return response.data.data;

    }
    async getMediaAnualMilho() {

        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_CEPEA_MEDIA_ANUAL_MILHO}`
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com o servidor de dados conexão e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );

        return response.data.data;

    }
    async getMediaAnualBezerro() {

        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_CEPEA_MEDIA_ANUAL_BEZERRO}`
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com o servidor de dados conexão e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );

        return response.data.data;

    }
    async getMediaAnualBoi() {

        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_CEPEA_MEDIA_ANUAL_BOI}`
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com o servidor de dados conexão e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );

        return response.data.data;

    }
    async getMediaAnualLeite() {

        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_CEPEA_MEDIA_ANUAL_LEITE}`
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com o servidor de dados e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );

        return response.data.data;

    }
    async getActualPrices() {

        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_CEPEA_DATA_PRICES}`
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com o servidor de dados e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );

        return response.data.data;

    }
    async getTitulos(prop) {

        const payload = prop;

        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_TITULOS}?prop=${payload}`,
            data: payload
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com a conexão e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );

        const data = response.data;
        if (data.length == 0)
            throw new NotFoundErrorException(`Não localizamos nenhuma propriedade para ${prop}`);

        return response.data.data;

    }

    async simula(value) {
        const payload = value;

        const response = await axios({
            method: 'post',
            url: `${this.API_PATH}${this.API_QUERY_SIMULA}`,
            data: payload
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com e não foi possivel fazer a simulação. Tente novamente mais tarde.');
            }
            );

            console.log(response)
            return response.data.data;

    }
    async niveis() {
        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_NIVEIS}`,
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com e não foi possivel obter os registros.');
            }
            );

            return response.data;
    }
    async findCar(value) {
        const payload = value;

        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_CAR}?data=${payload}`,
            data: payload
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com a conexão e não foi possivel conectar. Tente novamente mais tarde.');
            }
            );
            
            //const data = response.data;
            //if (data == '')
            //    throw new NotFoundErrorException(`Não localizamos nenhuma propriedade para ${prop}`);
            
            //return { car: `Função de busca para [${data}] não implementada!`}
            return response.data.data;

    }
    async sendReportAter(request) {
        const credendial = await cache.getCredencial(request);

        const activeUser = credendial.userId;

        const situacao = request.body['situacao'];
        const orientacao = request.body['orientacao'];
        const recomendacao = request.body['recomendacao'];

        let r_ater = {
            situacao: situacao,
            orientacao: orientacao,
            recomendacao: recomendacao
        }

        try {

            r_ater.id = uuid.v4().toUpperCase();
            r_ater.createdby = activeUser;
            r_ater.data = moment();
            r_ater.local = (await divisionService.findById(credendial.divisionId)).city;
            r_ater.created = moment();
            r_ater.createdby = await credendial.userId;
            r_ater.partnerId = await credendial.partnerId;
            r_ater.divisionId = await credendial.divisionId;

            await R_Aters.create(r_ater);

            return { sucess: 'Registrado com sucesso' };

        } catch (e) {
            return new ServerErrorException(e.errors);
        }
    }

    async generateRater(mapa) {

        const payload = mapa;

        const response = await axios({
            method: 'get',
            url: `${this.API_PATH}${this.API_QUERY_ATER}?mapa=${payload}`,
            data: payload
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com a conexão e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );

        const data = response.data.data;

        if (data.length == 0)
            throw new NotFoundErrorException('Não encontramos nenhum modelo parecido com a sua solicitação.');

        return data

    }

}
module.exports = PythonService;