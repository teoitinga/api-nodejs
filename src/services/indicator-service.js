const moment = require('moment');
const uuid = require('uuid');


class IndicatorService {
    async actualPrices(){
        return [
            {data: '03/2022', producao: 'Leite MG', unidade: 'lt', valor:2.2403, coments: '*fonte CEPEA MG - link: https://www.cepea.esalq.usp.br/br/indicador/leite.aspx'},
            {data: '01/04/2022', producao: 'Boi gordo', unidade: '@', valor:341.60, coments: '*fonte CEPEA - link: https://www.cepea.esalq.usp.br/br/indicador/boi-gordo.aspx'},
            {data: '01/04/2022', producao: 'Bezerro', unidade: 'Cab-217.56Kg', valor:2880.50, coments: '*fonte CEPEA - link: https://www.cepea.esalq.usp.br/br/indicador/bezerro.aspx'},
            {data: '01/04/2022', producao: 'Milho', unidade: 'Sc', valor:92.04, coments: '*fonte CEPEA - link: https://www.cepea.esalq.usp.br/br/indicador/milho.aspx'},
            {data: '01/04/2022', producao: 'Café arábica', unidade: 'Sc', valor:1245.32, coments: '*fonte CEPEA - link: https://www.cepea.esalq.usp.br/br/indicador/cafe.aspx'},
            {data: '01/04/2022', producao: 'Café robusta', unidade: 'Sc', valor:807.75, coments: '*fonte CEPEA - link: https://www.cepea.esalq.usp.br/br/indicador/cafe.aspx'}
        ]
    }
    async cepeaBoi() {
        return {
            dados: [
                {
                    ano: '2006',
                    preco: 52.75,
                    obs: ''
                },
                {
                    ano: '2007',
                    preco: 60.80,
                    obs: ''
                },
                {
                    ano: '2008',
                    preco: 84.34,
                    obs: ''
                },
                {
                    ano: '2009',
                    preco: 78.87,
                    obs: ''
                },
                {
                    ano: '2010',
                    preco: 88.51,
                    obs: ''
                },
                {
                    ano: '2011',
                    preco: 101.74,
                    obs: ''
                },
                {
                    ano: '2012',
                    preco: 94.80,
                    obs: ''
                },
                {
                    ano: '2013',
                    preco: 102.64,
                    obs: ''
                },
                {
                    ano: '2014',
                    preco: 126.29,
                    obs: ''
                },
                {
                    ano: '2015',
                    preco: 145.42,
                    obs: ''
                },
                {
                    ano: '2016',
                    preco: 152.90,
                    obs: ''
                },
                {
                    ano: '2017',
                    preco: 138.80,
                    obs: ''
                },
                {
                    ano: '2018',
                    preco: 144.91,
                    obs: ''
                },
                {
                    ano: '2019',
                    preco: 162.68,
                    obs: ''
                },
                {
                    ano: '2020',
                    preco: 226.18,
                    obs: ''
                },
                {
                    ano: '2021',
                    preco: 304.07,
                    obs: ''
                },
            ],
            titulo: 'Evolução dos precos do Boi gordo',
            fonte: 'CEPEA'
        }
    }
    async cepeaLeiteMg() {
        return {
            dados: [
                {
                    ano: '2006',
                    preco: 0.46,
                    obs: ''
                },
                {
                    ano: '2007',
                    preco: 0.62,
                    obs: ''
                },
                {
                    ano: '2008',
                    preco: 0.68,
                    obs: ''
                },
                {
                    ano: '2009',
                    preco: 0.64,
                    obs: ''
                },
                {
                    ano: '2010',
                    preco: 0.69,
                    obs: ''
                },
                {
                    ano: '2011',
                    preco: 0.77,
                    obs: ''
                },
                {
                    ano: '2012',
                    preco: 0.81,
                    obs: ''
                },
                {
                    ano: '2013',
                    preco: 0.96,
                    obs: ''
                },
                {
                    ano: '2014',
                    preco: 0.99,
                    obs: ''
                },
                {
                    ano: '2015',
                    preco: 0.95,
                    obs: ''
                },
                {
                    ano: '2016',
                    preco: 1.26,
                    obs: ''
                },
                {
                    ano: '2017',
                    preco: 1.18,
                    obs: ''
                },
                {
                    ano: '2018',
                    preco: 1.31,
                    obs: ''
                },
                {
                    ano: '2019',
                    preco: 1.41,
                    obs: ''
                },
                {
                    ano: '2020',
                    preco: 1.73,
                    obs: ''
                },
                {
                    ano: '2021',
                    preco: 2.18,
                    obs: ''
                },
            ],
            titulo: 'Evolução dos precos do leite em MG',
            fonte: 'CEPEA'
        }
    }
}
module.exports = IndicatorService;