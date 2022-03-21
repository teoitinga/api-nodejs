const axios = require('axios');
const moment = require('moment');

const {
    ServerErrorException,
    NotFoundErrorException } = require('../exceptions/server-exception');

class DapService {

    DAP_API_PATH = 'http://smap14.mda.gov.br/extratodap/PesquisarDAP/CarregarExtratoDap/CarregaExtratoDAP?Token=Y3BmPTY4NzAxOTE4NjcyJk51bWVyb0RBUD0mdGlwbz1GaXNpY2E=';
    DAP_API_QUERY_PATH = 'http://dap.mda.gov.br/ConsultaPublicaIrregularidade/Home/Consulta';

    async convertToDate(date) {
        const regex = new RegExp(/^\/Date\((.*)\)\//);
        if (date) {
            return new Date(Number(regex.exec(date)[1]));
        }
        return '';
    }

    async queryAcerbity(cpf) {
        const prd = await this.findByCpf(cpf);
        const dtnascimento = (prd.titular.nascimento);

        const payload = {
            cpf: cpf,
            cnpj: '',
            dataNascimento: moment(dtnascimento).format('DD/MM/YYYY')
        };

        const response = await axios({
            method: 'post',
            url: `${this.DAP_API_QUERY_PATH}`,
            data: payload
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com a conexão e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );
        return response.data.listaIrregularidade;

    }
    async findByCpf(cpf) {
        const dapHead = {
            cpf: cpf,
            numeroControleExterno: ''
        };


        const response = await axios({
            method: 'post',
            url: `${this.DAP_API_PATH}`,
            data: dapHead
        }).catch(
            function (err) {
                throw new NotFoundErrorException('Houve um erro com a conexão e não foi possivel conectar. Tente novamente mais tarde.');
            }
        );
        if (response.data.DAP == null) {
            throw new ServerErrorException('Documento não encontrado.');
        }

        //return response.data.DAP;
        const dap = response.data.DAP[0];

        return {
            titular: {
                cpf: dap.Titular1DAP.Cpf.trim(),
                nome: dap.Titular1DAP.Nome.trim(),
                mae: dap.Titular1DAP.NomeDaMae.trim(),
                naturalidade: dap.Titular1DAP.Naturalidade.trim(),
                genero: dap.Titular1DAP.Sexo.trim(),
                endereco: dap.Titular1DAP.Endereco.trim(),
                municipio: dap.Titular1DAP.NomeMunicipio.trim(),
                nascimento: await this.convertToDate(dap.Titular1DAP.DataNasc.trim()),
                classEndereco: dap.Titular1DAP.TipoEndereco.trim(),
                cep: dap.Titular1DAP.CEP.trim(),
            },
            titular2: {
                cpf: dap.Titular2DAP?.Cpf.trim(),
                nome: dap.Titular2DAP?.Nome.trim(),
                mae: dap.Titular2DAP?.NomeDaMae.trim(),
                naturalidade: dap.Titular2DAP?.Naturalidade.trim(),
                genero: dap.Titular2DAP?.Sexo.trim(),
                endereco: dap.Titular2DAP?.Endereco,
                municipio: dap.Titular2DAP?.NomeMunicipio,
                nascimento: await this.convertToDate(dap.Titular2DAP?.DataNasc.trim()),
                classEndereco: dap.Titular2DAP?.TipoEndereco?.trim(),
                cep: dap.Titular2DAP?.CEP?.trim(),
            },
            numDap: dap.numeroControleExterno,
            rendaEstabelecimento: dap.RendaEstabelecimento,
            rendaForaEstabelecimento: dap.RendaForaEstabelecimento,
            rendaAgroindustriTurismo: dap.RendaAgroIndustriaTurismo,
            rendaPrevidenciaria: dap.RendaPrevidenciaria,
            status: dap.Status,
            grupo: dap.enquadramento,
            validade: await this.convertToDate(dap.validade),
            emissao: await this.convertToDate(dap.dataEmissao),
            qtdmoradores: dap.NMembrosFamilia,
            qtdImoveis: dap.NImoveisExplorados,
            nomeImovelPrincipal: dap.DenominacaoImovelPrincipal.trim(),
            municipio: dap.MunicipioUF.trim(),
            areaDaPropriedade: dap.AreaEstabelecimento,
            areaImovelPrincipal: dap.AreaImovelPrincipal,
            localizacaoImovelPrincipal: dap.LocalizacaoImovelPrincipal.trim(),
            caracterizacao: dap.CaracterizacaoDAP.map(c => {
                return c.CaracterizacaoDoBeneficiario.trim()
            }),
            emissor: {
                cnpj: dap.EmissorDAP.CNPJ.trim(),
                cpfEmissor: dap.EmissorDAP.CPFRepresentante.trim(),
                funcionario: dap.EmissorDAP.NomeRepresentante.trim(),
                empresa: dap.EmissorDAP.RazaoSocial.trim(),
            },
            rendas: dap.DAPRendas.map(r => {
                return {
                    producao: r.NomeProduto.trim(),
                    auferida: r.rendaAuferida,
                    estimada: r.rendaEstimada
                }
            })

        };


    }



}
module.exports = DapService;