module.exports = class UsuarioDto {
    constructor(obj) {

            this.obj = obj || {}, 
            this.name = obj.name,
            this.registry = obj.registry,
            this.email = obj.email,
            this.user_city = obj.user_city
            this.password = obj.password,
            this.address = obj.address,
            this.num = obj.num,
            this.district = obj.district,
            this.complement = obj.complement,
            this.city = obj.city,
            this.cep = obj.cep,
            this.uf = obj.uf,
            this.phone = obj.phone,
            this.role_id = obj.role_id,
            this.role_type = obj.role_id,
            this.role_class = obj.role_id,

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
            this.division_theme = obj.division_theme,
                        
            this.expiresDate = obj.expiresDate,
            this.lockedDate = obj.lockedDate,
            this.createdby = obj.createdby,
            this.updatedby = obj.updatedby,
            this.created = obj.created,
            this.updated = obj.updated
    }
}