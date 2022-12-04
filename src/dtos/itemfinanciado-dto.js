class ItemFinanciaoDto {

    constructor(obj) {

        this.obj = obj || {},
            this.id = obj.id,
            this.finalidade = obj.finalidade,
            this.atividade = obj.atividade,
            this.descricao = obj.descricao,
            this.unidade = obj.unidade,
            this.qtditemfinanc = obj.qtditemfinanc,
            this.valorunit = obj.valorunit,
            this.idproposta = obj.idproposta,
            this.createdby = obj.createdby,
            this.updatedby = obj.updatedby,
            this.created = obj.created,
            this.updated = obj.updated
    }
}
module.exports = ItemFinanciaoDto