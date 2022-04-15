const axios = require('axios');
const moment = require('moment');

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
        return response.data.data;

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
        return response.data.data[0];

    }

}
module.exports = PythonService;