const jwt = require('jsonwebtoken');
const moment = require('moment');

const RoleService = require('../services/role-service');
const roleService = new RoleService();

const {
    TokenException,
    NotAuthorizedException,
    TokenIsExpired
} = require('../exceptions/token-exceptions')

let user = undefined;

async function _decodetoken(auth) {

    let usertoken = undefined;

    if (!auth) {
        return false;
    }

    const token = auth.split(' ')[1];

    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (!err) {
            usertoken = user;
        }
        else{
            console.log(err);
        }
    })
    return usertoken;
}

async function class_10(req, res, next) {

    nivel_minimo = 10;

    const user = await _decodetoken(req.headers.authorization);

    //verifica o token
    
    if (!user) {
        return res.status(401).json(new TokenException(401, 'Invalid Token.'));
    }

    const expired = moment().isBefore(user.expiresIn);

    if (!expired) {
        return res.status(401).json(new TokenIsExpired(401, 'Sua credendial expirou.'));
    }

    //confere a classe da permissão do usuario
    const role = await roleService.findOne(user.role_id);
    const classe = role.class;

    //Verifica se a permissão e comativel - classe de permissão menor ou igual
    if (classe < nivel_minimo) {
        //throw new NotAuthorizedException(403, 'Você não tem autorização para acessar esta URL.');
        return res.status(403).json(new NotAuthorizedException(403, 'Você não tem autorização para acessar esta URL.'));

    }

    next();
}
async function class_06(req, res, next) {

    nivel_minimo = 6;

    const user = await _decodetoken(req.headers.authorization);

    //verifica o token
    
    if (!user) {
        return res.status(401).json(new TokenException(401, 'Invalid Token.'));
    }

    const expired = moment().isBefore(user.expiresIn);

    if (!expired) {
        return res.status(401).json(new TokenIsExpired(401, 'Sua credendial expirou.'));
    }

    //confere a classe da permissão do usuario
    const role = await roleService.findOne(user.role_id);
    const classe = role.class;

    //Verifica se a permissão e comativel - classe de permissão menor ou igual
    if (classe < nivel_minimo) {
        //throw new NotAuthorizedException(403, 'Você não tem autorização para acessar esta URL.');
        return res.status(403).json(new NotAuthorizedException(403, 'Você não tem autorização para acessar esta URL.'));

    }

    next();
}
async function class_03(req, res, next) {

    nivel_minimo = 3;

    const user = await _decodetoken(req.headers.authorization);

    //verifica o token
    
    if (!user) {
        return res.status(401).json(new TokenException(401, 'Invalid Token.'));
    }

    const expired = moment().isBefore(user.expiresIn);

    if (!expired) {
        return res.status(401).json(new TokenIsExpired(401, 'Sua credendial expirou.'));
    }

    //confere a classe da permissão do usuario
    const role = await roleService.findOne(user.role_id);
    const classe = role.class;

    //Verifica se a permissão e comativel - classe de permissão menor ou igual
    if (classe < nivel_minimo) {
        //throw new NotAuthorizedException(403, 'Você não tem autorização para acessar esta URL.');
        return res.status(403).json(new NotAuthorizedException(403, 'Você não tem autorização para acessar esta URL.'));

    }

    next();
}
async function class_02(req, res, next) {

    nivel_minimo = 2;

    const user = await _decodetoken(req.headers.authorization);

    //verifica o token
    
    if (!user) {
        return res.status(401).json(new TokenException(401, 'Invalid Token.'));
    }

    const expired = moment().isBefore(user.expiresIn);

    if (!expired) {
        return res.status(401).json(new TokenIsExpired(401, 'Sua credendial expirou.'));
    }

    //confere a classe da permissão do usuario
    const role = await roleService.findOne(user.role_id);
    const classe = role.class;

    //Verifica se a permissão e comativel - classe de permissão menor ou igual
    if (classe < nivel_minimo) {
        //throw new NotAuthorizedException(403, 'Você não tem autorização para acessar esta URL.');
        return res.status(403).json(new NotAuthorizedException(403, 'Você não tem autorização para acessar esta URL.'));

    }

    next();
}
async function class_01(req, res, next) {

    nivel_minimo = 1;

    const user = await _decodetoken(req.headers.authorization);

    //verifica o token
    
    if (!user) {
        return res.status(401).json(new TokenException(401, 'Invalid Token.'));
    }

    const expired = moment().isBefore(user.expiresIn);

    if (!expired) {
        return res.status(401).json(new TokenIsExpired(401, 'Sua credendial expirou.'));
    }

    //confere a classe da permissão do usuario
    const role = await roleService.findOne(user.role_id);
    const classe = role.class;

    //Verifica se a permissão e comativel - classe de permissão menor ou igual
    if (classe < nivel_minimo) {
        //throw new NotAuthorizedException(403, 'Você não tem autorização para acessar esta URL.');
        return res.status(403).json(new NotAuthorizedException(403, 'Você não tem autorização para acessar esta URL.'));

    }

    next();
}
async function class_00(req, res, next) {

    nivel_minimo = 0;

    next();
} 
module.exports = {
    class_10, 
    class_06, 
    class_03,
    class_02,
    class_01,
    class_00,
};