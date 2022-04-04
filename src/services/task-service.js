
require('dotenv').config();
const moment = require('moment');

const uuid = require('uuid');

const TaskModel = require('../../models/task');

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

}
module.exports = TaskService;