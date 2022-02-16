module.exports = class DivisionDto {
    constructor(obj) {
        this.obj = obj || {}
        this.name = obj.partner_name;
        this.nickname = obj.partner_nickname
        this.registry = obj.partner_registry
        this.email = obj.partner_email
        this.address = obj.partner_address
        this.phone = obj.partner_phone
        this.city = obj.partner_city
    }
}