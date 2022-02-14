module.exports = class UsuarioDto {
    constructor(obj) {

            this.obj = obj || {}, 
            this.name = obj.name,
            this.registry = obj.registry,
            this.email = obj.email,
            this.user_city = obj.user_city
            this.password = obj.password,
            this.address = obj.address,
            this.phone = obj.phone,

            this.role_id = obj.role_id,
            this.role_name = obj.role_id,
            this.role_class = obj.role_id,

            this.partner_id = obj.partner_id,
            this.partner_name = obj.partner_name,
            this.partner_address = obj.partner_address,
            this.partner_fone = obj.partner_fone,
            this.partner_email = obj.partner_email,
            this.partner_city = obj.partner_city,
            
            this.section_id = obj.section_id,
            this.section_name = obj.section_name,
            this.section_address = obj.section_address,
            this.section_fone = obj.section_fone,
            this.section_email = obj.section_email,
            this.section_city = obj.section_city,
                        
            this.expiresDate = obj.expiresDate,
            this.lockedDate = obj.lockedDate,
            this.createdby = obj.createdby,
            this.updatedby = obj.updatedby,
            this.created = obj.created,
            this.updated = obj.updated
    }
}