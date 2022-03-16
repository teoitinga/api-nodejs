const moment = require('moment');
const uuid = require('uuid');

const UserCache = require('../core/cache-user');
const cache = new UserCache();

const ProjectModel = require('../../models/project');
const ActionModel = require('../../models/action');

const UserService = require('../services/user-service');
const userService = new UserService();

const CityModel  =require('../../models/city');
const SchoolingModel  =require('../../models/schooling');

const { Op } = require("sequelize");
const { UserNotFoundException } = require('../exceptions/user-exception');

class ProjectService {
    async findByName(req) { 
        /**
         * Retorna todos os usuários que pertencam a empresa logada
         */
        const city = req.params['name'];

        return await CityModel.findAll({
            where: {
                city: {
                    [Op.like]: `%${city}%`
                }
            }
        });

    }
    async findbySchooling(req) { 
        /**
         * Retorna todos as escolaridades
         */
        const schooling = req.params['name'];

        return await SchoolingModel.findAll({
            where: {
                schooling: {
                    [Op.like]: `%${schooling}%`
                }
            }
        });

    }
    async create(request) {

        const id_project = uuid.v4().toUpperCase();

        const credendial = await cache.getCredencial(request);

        const activeUser = credendial.userId;

        const project = request.body;
        const actions = project.actions;

        /**
         * Verifica se o representante informado existe
         */
        const representative = await userService.findById(project.representative_id);
        
        if(!representative){
            throw new UserNotFoundException('Este representante não está cadastrado.');
        }

        const obj = {
            id: id_project,
            description: project.description,
            representative_id: project.representative_id,
            partner_id: credendial.partnerId,
            division_id: credendial.divisionId,
            objetivo: project.objetivo,
            publicoAlvo: project.publicoAlvo,
            justificativa: project.justificativa,
            resultado: project.resultado,
            city: project.city,
            lockedDate: null,
            createdby: activeUser,
            updatedby: null,
            created: moment().utc(),
            updated: null
        }

        /**
         * Percorre o array de ACTIONS, configurando e persistindo cada registro
         */
        const ac = actions.map(a => {
            const action = a;
            action.id = uuid.v4().toUpperCase();
            action.project_id = id_project;
            action.createdby = activeUser;
            action.created = moment().utc();
            return action;
        });
        //console.log(ac);
        obj.actions = ac;
        await ProjectModel.create(obj);
        await ActionModel.bulkCreate(ac);
        return obj;
    }
}
module.exports = ProjectService;