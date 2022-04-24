const moment = require('moment');
const uuid = require('uuid');

const UserCache = require('../core/cache-user');
const cache = new UserCache();

const ProjectModel = require('../../models/project');
const ActionModel = require('../../models/action');

const UserService = require('../services/user-service');
const userService = new UserService();

const CityModel = require('../../models/city');
const SchoolingModel = require('../../models/schooling');

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
    async findProjectByDivision(credendial) {
        const query = `SELECT 
        projects.id, sum(actions.qtdAtendimentos) as prev_atd, projects.description, count(actions.id) as qtd_acoes, min(actions.start) as inicio, max(actions.end) as fim
        FROM actions right join smart_dev.projects on actions.project_id = projects.id
            where 
            projects.partner_id = '${credendial.partnerId}'
            and projects.division_id = '${credendial.divisionId}'
            group by projects.id
        `;
        return await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });
    }
    async findProjectByPartner(credendial) {
        const query = `SELECT 
        projects.id, sum(actions.qtdAtendimentos) as prev_atd, projects.description, count(actions.id) as qtd_acoes, min(actions.start) as inicio, max(actions.end) as fim
        FROM actions right join smart_dev.projects on actions.project_id = projects.id
            where 
            projects.partner_id = '${credendial.partnerId}'
            group by projects.id
        `;
        return await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });
    }
    async findProjectByAdmin(credendial) {
        const query = `SELECT 
        projects.id, sum(actions.qtdAtendimentos) as prev_atd, projects.description, count(actions.id) as qtd_acoes, min(actions.start) as inicio, max(actions.end) as fim
        FROM actions right join smart_dev.projects on actions.project_id = projects.id
        group by projects.id
        `;
        return await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });
    }
    async findProjectByUser(credendial) {
        return this.findProjectByDivision(credendial);
    }
    async findProjectByPublic(credendial) {
        return [];
    }

    async findById(request) {

        const projectId = request.params['projectId'];

        const query = `SELECT * from projects where projects.id='${projectId}'
        `;

        return await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });
    }
    async findAllActions(request) {

        const projectId = request.params['projectId'];

        const query = `SELECT * from actions where actions.project_id='${projectId}'
        `;

        return await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });
    }
    async findAll(request) {
        /**
         * Retorna todos os projetos que pertencam a empresa logada, ou departamento, conforme o caso
         */
        const credendial = await cache.getCredencial(request);
        const c = credendial.role_class;
        /**
         * Caso classe for Administrador da plataforma (8-10)
         */

        if (c > 7)
            return await this.findProjectByAdmin(credendial);

        /**
         * Caso classe for Gestor (6-7)
         */
        if ((c > 5) && (c <= 7))
            return await this.findProjectByPartner(credendial);

        /**
         * Caso classe for Diretor (3-5)
         */
        if ((c > 2) && (c <= 5))
            return await this.findProjectByDivision(credendial);

        /**
         * Caso classe for Funcionario (1-3)
         */
        if ((c > 0) && (c <= 2))
            return await this.findProjectByUser(credendial);

        /**
         * Caso classe for publico (0 )
         */
        return await this.findProjectByPublic(credendial);
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

        if (!representative) {
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