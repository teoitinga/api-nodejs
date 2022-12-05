require('dotenv').config();
const Sequelize = require('sequelize');
const dbconfig = require('../../config/config.js');
const connection = new Sequelize(dbconfig);

const User = require('../../models/user');
User.init(connection);

const Role = require('../../models/role');
Role.init(connection);

const Contract = require('../../models/contract');
Contract.init(connection);

const Partner = require('../../models/partner');
Partner.init(connection);

const Division = require('../../models/division');
Division.init(connection);

const Project = require('../../models/project');
Project.init(connection);

const Theme = require('../../models/theme');
Theme.init(connection);

const Comment = require('../../models/comment');
Comment.init(connection);

const prodLeite = require('../models/prodleite');
prodLeite.init(connection);


const credruralproposta = require('../models/crPropostaModel');
credruralproposta.init(connection);

const critemfinanciado = require('../models/ItemFinanciadoModel');
critemfinanciado.init(connection);

const agroindustria = require('../models/agroindustriaModel');
agroindustria.init(connection);

module.exports = connection;