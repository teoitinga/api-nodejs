const moment = require('moment');
 
module.exports = class Token {
    constructor(obj) {
        this.obj = obj || {}
        this.name = obj.name;
        this.id = obj.id;
        this.registry = obj.registry;
        this.contact = obj.contact;
        this.address = obj.address;
        this.city = obj.city;
        this.expiresIn = moment().utc().add(process.env.JWT_EXPIRES, 'minutes').toDate();

        this.role_id = obj.role_id,
        this.role_type = obj.role_type,
        this.role_class = obj.role_class,

        this.partner_id = obj.partner_id,
        this.partner_name = obj.partner_name,
        this.partner_address = obj.partner_address,
        this.partner_fone = obj.partner_fone,
        this.partner_email = obj.partner_email,
        this.partner_city = obj.partner_city,
        
        this.division_id = obj.division_id,
        this.division_name = obj.division_name,
        this.division_address = obj.division_address,
        this.division_fone = obj.division_fone,
        this.division_email = obj.division_email,
        this.division_city = obj.division_city,
        this.division_theme = obj.division_theme

    }

}