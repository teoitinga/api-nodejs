const moment = require('moment');

module.exports = class Token {
    constructor(obj) {
        this.obj = obj || {}
        this.name = obj.name;
        this.id = obj.id;
        this.partner_id = obj.partner_id;
        this.division_id = obj.division_id;
        this.partner = obj.partner;
        this.division = obj.division;
        this.registry = obj.registry;
        this.contact = obj.contact;
        this.address = obj.address;
        this.city = obj.city;
        this.expiresIn = moment().utc().add(process.env.JWT_EXPIRES, 'minutes').toDate();
    }

}