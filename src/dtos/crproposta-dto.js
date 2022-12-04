class CrPropostaDto {

    constructor(obj) {

        this.obj = obj || {},
            this.id = obj.id,
            this.banco = obj.banco,
            this.linha = obj.linha,
            this.anoprimpgm = obj.anoprimpgm,
            this.anoultpgm = obj.anoultpgm,
            this.txjurosaa = obj.txjurosaa,
            this.rda = obj.rda,
            this.rdaok = obj.rdaok,
            this.trtok = obj.trtok,
            this.trt = obj.trt,
            this.obs = obj.obs,
            this.createdby = obj.createdby,
            this.updatedby = obj.updatedby,
            this.created = obj.created,
            this.updated = obj.updated
    }
}
module.exports = CrPropostaDto