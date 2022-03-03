require('dotenv').config();
const Sequelize = require('sequelize');

const dbconfig = require('../config/config.js')[process.env.NODE_ENV];

const connection = new Sequelize(dbconfig);

const User = require('../models/user');
User.init(connection);

const Role = require('../models/role');
Role.init(connection);

const Contract = require('../models/contract');
Contract.init(connection);

const Partner = require('../models/partner');
Partner.init(connection);

const Division = require('../models/division');
Division.init(connection);

const Project = require('../models/project');
Project.init(connection);

const Action = require('../models/action');
Action.init(connection);

const Theme = require('../models/theme');
Theme.init(connection);

const Mode = require('../models/mode');
Mode.init(connection);

module.exports = connection;