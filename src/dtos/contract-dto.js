class ContractDto {

    constructor(obj) {

        this.obj = obj || {},
            this.payment = obj.payment,
            this.quota = obj.quota,
            this.partner_id = obj.partner_id,
            this.ps = obj.ps,
            this.expiresDate = obj.expiresDate,
            this.lockedDate = obj.lockedDate,
            this.createdby = obj.createdby,
            this.updatedby = obj.updatedby,
            this.created = obj.created,
            this.updated = obj.updated
    }
}
module.exports = ContractDto