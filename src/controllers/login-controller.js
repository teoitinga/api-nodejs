const Service = require('../services/user-service');
const service = new Service();

class LoginController {

    async login(req, res) {
        try{
            const stored = await service.login(req.body)
            res.status(200).json(stored);
        }catch (e){
            console.error(e);
            res.status(e.status || 500 ).json(e);
        }
    };
    
    async create(req, res) {

        try{
            const stored = await service.create(req)
            res.status(201).json(stored);
        }catch(e){
            console.error(e);
            res.status(e.status || 500).json(e || {errors: ['Não foi possível fazer o login. Devido a um erro inesperado, tente novamente mais tarde.']});
        }
    };
    async findall(req, res) {

        try{
            const stored = await service.findall()
            res.status(200).json(stored);
        }catch(e){
            console.error(e);
            res.status(e.status || 500).json(e || {errors: ['Registros não encontrados.']});
        }
    };
}
module.exports = LoginController;