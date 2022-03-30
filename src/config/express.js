const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../../routes');
const Sequelize = require('../../config/index');




require('dotenv').config()

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.APP_PORT);

  // MIDDLEWARES
  // create application/x-www-form-urlencoded parser
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(
    express.urlencoded({
      extended: true
    })
  )

  //Importa as configurações de conexão com o banco de dados
  require('../../config');

  // parse application/json
  app.use(bodyParser.json({
    limit: '50mb'
  }));

  app.use(cors({
    origin: '*',
    credentials: true,
    //origin: ['http://45.174.40.217:3000/'],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  }))

  //Routes
  app.use(routes);

  return app;
};