const jwt = require('jsonwebtoken');
const moment = require('moment');

const RoleService = require('../services/role-service');
const roleService = new RoleService();

const {
    NotAuthorizedException,
    TokenIsExpired,
    TokenException
} = require('../exceptions/token-exceptions');


async function decode(token) {
    const dados = await _decode(token);
    return dados;
}

let user = undefined;

async function _decodetoken(req) {
    const authorization = req.headers.authorization;

    let usertoken = undefined;

    if (!authorization) {
        throw new TokenException('Não há token válido.');
    }

    const token = authorization.split(' ')[1];

    return await _decode(token);
}

async function _decode(token) {
    
    let usertoken = '';

    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return false;

        usertoken = user;
    })

    if (usertoken) {
        return usertoken;
    }
 
    throw new TokenException('Não há token válido.');
}

async function class_10(req, res, next) {
    await _class_level_access(req, res, next, 10);
    next();
}

async function class_7(req, res, next) {
    await _class_level_access(req, res, next, 7);
    next();
}

async function class_0(req, res, next) {
    next();
}

async function _class_level_access(req, res, next, level = 1) {

    nivel_minimo = level;

    const user = await _decodetoken(req)

    //verifica o token

    if (!user) {
        throw new NotAuthorizedException('Sem autorização para prosseguir.');
    }

    const dtatual = moment().utc();
    const expiradt = user.expiresIn;

    const dtExpires = moment.utc(expiradt);
    const notExpired = await dtExpires.isBefore(dtatual);

    if (notExpired) {
        throw new TokenIsExpired('Sua credendial expirou.');
    }

    //confere a classe da permissão do usuario
    const role = await roleService.findOne(user.role_id);
    const classe = role.class;

    //Verifica se a permissão e comativel - classe de permissão menor ou igual
    if (classe < nivel_minimo) {
        throw new NotAuthorizedException('Você não tem autorização para acessar esta URL.');
    }

    req.user = user;

    return req.user;
}

module.exports = {
    decode,
    //getCredencial,
    class_10,
    class_7,
    class_0
};