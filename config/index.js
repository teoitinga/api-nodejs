require('dotenv').config();
const Sequelize = require('sequelize');

const dbconfig = require('../config/config.json')[process.env.ENVIRONMENT];

const connection = new Sequelize(dbconfig);

const User = require('../models/user');
User.init(connection);

const Role = require('../models/role');
Role.init(connection);

const Contract = require('../models/contract');
Contract.init(connection);

module.exports = connection;