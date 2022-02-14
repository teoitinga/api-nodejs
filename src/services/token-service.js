const jwt = require('jsonwebtoken');
const moment = require('moment');

const RoleService = require('../services/role-service');
const roleService = new RoleService();

const {
    TokenException,
    NotAuthorizedException,
    TokenIsExpired,
    TokenHeaderException
} = require('../exceptions/token-exceptions');


async function decode(token){
    const dados = await _decode(token);
    return dados;
}

let user = undefined;

async function _decodetoken(req) {
    const authorization = req.headers.authorization;

    let usertoken = undefined;

    if (!authorization) {
        return undefined;
    }

    const token = authorization.split(' ')[1];

    return await _decode(token);
}
async function _decode(token) {
    let usertoken = '';
    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (!err) {
            usertoken = user;
        }
        else {
            return false;
        }
    })
    console.log(usertoken);
    return usertoken;
}
async function getCredencial(token) {
    const user = this._decodetoken(token);
    const userId = user.id;
    const partnerId = user.partner_id;
    const divisionId = user.division_id;
    return userid, partnerId, divisionId;
}

async function class_10(req, res, next) {
    _class_level_access(req, res, next, 8);
}
async function class_0(req, res, next) {
    next();
}
async function _class_level_access(req, res, next, level = 1) {

    nivel_minimo = level;

    const user = await _decodetoken(req)

    //verifica o token

    if (!user) {
        throw new TokenIsExpired('Sem autorização');
    }

    const dtatual = moment().utc();
    const expiradt = user.expiresIn;

    const dtExpires = moment.utc(expiradt);
    const notExpired = dtExpires.isBefore(dtatual);

    if (notExpired) {
        return next(TokenIsExpired('Sua credendial expirou.'));
    }

    //confere a classe da permissão do usuario
    const role = await roleService.findOne(user.role_id);
    const classe = role.class;

    //Verifica se a permissão e comativel - classe de permissão menor ou igual
    if (classe < nivel_minimo) {
        return next(new NotAuthorizedException('Você não tem autorização para acessar esta URL.'));
    }
    req.user = user;
    return next();
}

module.exports = {
    decode,
    class_10,
    class_0
};