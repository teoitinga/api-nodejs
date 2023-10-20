
require('dotenv').config();
const moment = require('moment');

const uuid = require('uuid');

const TaskModel = require('../../models/task');

const CommentModel = require('../../models/comment');

const { ServerErrorException } = require('../exceptions/server-exception');

const UserCache = require('../core/cache-user');
const cache = new UserCache();


class TaskService {

    async create(task, credendial, transaction) {

        /**Define variáveis auxiliares */
        task.id = uuid.v4().toUpperCase();
        task.createdby = credendial.userId;
        task.created = moment();
        return await TaskModel.create(task);
    }

    async addComment(request) {

        const credendial = await cache.getCredencial(request);
        const activeUser = credendial.userId;

        const comment = request.body;

        comment.id = uuid.v4().toUpperCase();
        comment.fromuser = activeUser
        comment.createdby = activeUser
        comment.created = moment();

        //Verifica se existe o taskid

        //Verifica se existe o usuario que está encaminhando a mensagem
        //Ajusta a task para a responsabilidade do funcionário a quem se destina a mensagem
        let task = await TaskModel.findByPk(comment.taskid);
        
        await TaskModel.update({userDesigned_id: comment.touser}, {where: {id: comment.taskid}});
        
        await CommentModel.create(comment);

    }

}
module.exports = TaskService;