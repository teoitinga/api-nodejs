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

    API_PATH = 'http://localhost:5000/';
    API_QUERY_TITULOS = 'titulos';
    API_QUERY_ATER = 'ater';

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
        if(data.length==0)
            throw new NotFoundErrorException(`Não localizamos nenhuma propriedade para ${prop}`);

        return response.data.data;

    }

    async sendReportAter(request){
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

            return {sucess: 'Registrado com sucesso'};

        } catch (e) {
            console.log(e);
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
        
        if(data.length==0)
            throw new NotFoundErrorException('Não encontramos nenhum modelo parecido com a sua solicitação.')  ;

        return data

    }

}
module.exports = PythonService;