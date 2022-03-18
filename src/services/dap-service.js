const moment = require('moment');
const axios = require('axios');
const https = require('https');

const { ServerErrorException } = require('../exceptions/server-exception');

class DapService {
    
    DAP_API_PATH = 'http://smap14.mda.gov.br/extratodap/PesquisarDAP/CarregarExtratoDap/CarregaExtratoDAP?Token=Y3BmPTY4NzAxOTE4NjcyJk51bWVyb0RBUD0mdGlwbz1GaXNpY2E=';

    async findByCpf(cpf) {

        const dapHead = {
            cpf: cpf,
            numeroControleExterno: ''
          };
      
          try {
            const response = await axios({
                method: 'post',
                url: `${this.DAP_API_PATH}`, 
                data: dapHead
            });
            const dap = response.data.DAP[0]
            //return dap;
            return {
                titular: {
                    cpf:dap.Titular1DAP.Cpf.trim(),
                    nome:dap.Titular1DAP.Nome.trim(),
                    mae:dap.Titular1DAP.NomeDaMae.trim(),
                    naturalidade:dap.Titular1DAP.Naturalidade.trim(),
                    genero:dap.Titular1DAP.Sexo.trim(),
                    endereco: dap.Titular1DAP.Endereco.trim(),
                    municipio:dap.Titular1DAP.NomeMunicipio.trim(),
                    nascimento:dap.Titular1DAP.DataNasc.trim(),
                    classEndereco:dap.Titular1DAP.TipoEndereco.trim(),
                    cep:dap.Titular1DAP.CEP.trim(),
                },
                titular2: {
                    cpf:dap.Titular2DAP?.Cpf.trim(),
                    nome:dap.Titular2DAP?.Nome.trim(),
                    mae:dap.Titular2DAP?.NomeDaMae.trim(),
                    naturalidade:dap.Titular2DAP?.Naturalidade.trim(),
                    genero:dap.Titular2DAP?.Sexo.trim(),
                    endereco: dap.Titular2DAP?.Endereco.trim(),
                    municipio:dap.Titular2DAP?.NomeMunicipio.trim(),
                    nascimento:dap.Titular2DAP?.DataNasc.trim(),
                    classEndereco:dap.Titular2DAP?.TipoEndereco.trim(),
                    cep:dap.Titular2DAP?.CEP.trim(),
                },
                qtdmoradores: dap.NMembrosFamilia,
                qtdImoveis: dap.NImoveisExplorados,
                nomeImovelPrincipal: dap.DenominacaoImovelPrincipal.trim(),
                municipio: dap.MunicipioUF.trim(),
                areaDaPropriedade: dap.AreaEstabelecimento,
                areaImovelPrincipal: dap.AreaImovelPrincipal,
                localizacaoImovelPrincipal: dap.LocalizacaoImovelPrincipal.trim(),
                caracterizacao: dap.CaracterizacaoDAP.map(c=>{
                    return c.CaracterizacaoDoBeneficiario.trim()
                }),
                emissor:{
                    cnpj: dap.EmissorDAP.CNPJ.trim(),
                    cpfEmissor: dap.EmissorDAP.CPFRepresentante.trim(),
                    funcionario: dap.EmissorDAP.NomeRepresentante.trim(),
                    empresa: dap.EmissorDAP.RazaoSocial.trim(),
                },
                rendas:dap.DAPRendas.map(r=>{
                    return {producao: r.NomeProduto.trim(),
                    auferida: r.rendaAuferida,
                    estimada: r.rendaEstimada
                    }
                })

            };

          } catch (error) {
            console.log('error');
            console.log(error);
          }

    }



}
module.exports = DapService;