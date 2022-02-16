
class TenderDto {

    constructor(obj) {
        /**Dados do contrato */
        this.payment = obj.payment,
        this.quota = obj.quota,
        this.ps = obj.ps,

        /**Dados da Empresa */
        this.partner_name = obj.name,
        this.partner_nickname = obj.nickname,
        this.partner_registry = obj.registry,
        this.partner_email = obj.email,
        this.partner_address = obj.address,
        this.partner_phone = obj.phone,
        this.partner_city = obj.city,

        /**Dados do Departamento principal */
        this.division_name = obj.name,

        /** Dados do representante */
        this.user_name = obj.user_name,
        this.user_registry = obj.user_registry,

        this.expiresDate = obj.expiresDate,
        this.lockedDate = obj.lockedDate,
        this.createdby = obj.createdby,
        this.updatedby = obj.updatedby,
        this.created = obj.created,
        this.updated = obj.updated
    }
}
module.exports = TenderDto