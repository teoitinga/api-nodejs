const moment = require('moment');
const uuid = require('uuid');


const UserCache = require('../core/cache-user');
const cache = new UserCache();

const ActionModel = require('../../models/action');

const { ServerErrorException } = require('../exceptions/server-exception');
const { Op } = require("sequelize");

class TreatmentService {

    async findByAction(request){

        const action = request.params['action'];
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;

        console.log(credendial)
        const query = `
        SELECT * FROM smart.actions left join projects on actions.project_id = projects.id
        where referency like('%${action}%')
        and projects.lockedDate is null
        and now()>start
        and now()<end
        and projects.partner_id = '${partner_id}'
        and projects.division_id = '${division_id}'
        ;
        `;

        const actions = await ActionModel.sequelize.query(query);
        return actions[0];
    }
    async create(request) {

        const credendial = await cache.getCredencial(request);

        const activeUser = credendial.userId;

        const treatment = request.body;

        try {

            treatment.id = uuid.v4().toUpperCase();
            treatment.createdby = activeUser;
            treatment.created = moment();

            await treatmentModel.create(treatment);

            treatment = await treatmentModel.findByPk(role.id);

            let dto = await new RoleDto(role)
            return dto.obj;
        } catch (e) {
            return new ServerErrorException(e.errors);
        }
    }

}
module.exports = TreatmentService;