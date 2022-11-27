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

const City = require('../models/city');
City.init(connection);

const Schooling = require('../models/schooling');
Schooling.init(connection);

const Treatment = require('../models/treatment');
Treatment.init(connection);

const Customer = require('../models/customer');
Customer.init(connection);

const Treatment_Customer = require('../models/treatment-customers');
Treatment_Customer.init(connection);

const Task = require('../models/task');
Task.init(connection);

const R_Ater = require('../models/r_aters');
R_Ater.init(connection);

const route = require('../models/route');
route.init(connection);

const comment = require('../models/comment');
comment.init(connection);

const prodLeite = require('../models/prodleite');
prodLeite.init(connection);

module.exports = connection;