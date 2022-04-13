//DADOS DA CULTURA
const TBL_CULTURA =
    [
        {
            id: '001',
            cultura: 'Cana-de-açúcar',
            unidade_prod: 'ton/ha',
            sat_bases_ideal: 60
        },
        {
            id: '002',
            cultura: 'Feijão',
            unidade_prod: 'kg/ha',
            sat_bases_ideal: 60
        },
    ]

//ELEMENTOS A CALCULAR
TBL_ELEMENTOS = [
    {
        elem_disp: 'P',
        elem_nom: 'P2O5',
        unid: 'Kg P2O5/hectare',
        unid: 'mg/dm'
    },
    {
        elem_disp: 'K',
        elem_nom: 'K2O',
        unid: 'Kg K2O/hectare',
        unid: 'mg/dm'
    },
    {
        elem_disp: 'N',
        elem_nom: 'N',
        unid: 'Kg N/hectare',
        unid: 'mg/dm'
    }
]
//CLASSIF QUANTO AO TEOR DE ARGILA
TBL_TEOR_ARGILA = [
    {
        cultura_id:'001',
        lim_sup:150,
        tipo:1
    },
    {
        cultura_id:'001',
        lim_sup:350,
        tipo:2
    },
    {
        cultura_id:'001',
        lim_sup:600,
        tipo:3
    },
    {
        cultura_id:'001',
        lim_sup:1000,
        tipo:4
    }
]

//CLASSIFICAÇÃO QUANTOS À DISPONIBILIDADE DO ELEMENTO
TBL_CLASS_ELEM = [
    {
        cultura_id:'001',
        grupo_argila: 1,
        elemento: 'P',
        qtd: 20,
        class: 'B'
    },
    {
        cultura_id:'001',
        grupo_argila: 2,
        elemento: 'P',
        qtd: 15,
        class: 'B'
    },
    {
        cultura_id:'001',
        grupo_argila: 3,
        elemento: 'P',
        qtd: 10,
        class: 'B'
    },
    {
        cultura_id:'001',
        grupo_argila: 4,
        elemento: 'P',
        qtd: 5,
        class: 'B'
    },
    {
        cultura_id:'001',
        grupo_argila: 1,
        elemento: 'P',
        qtd: 30,
        class: 'M'
    },
    {
        cultura_id:'001',
        grupo_argila: 2,
        elemento: 'P',
        qtd: 20,
        class: 'M'
    },
    {
        cultura_id:'001',
        grupo_argila: 3,
        elemento: 'P',
        qtd: 15,
        class: 'M'
    },
    {
        cultura_id:'001',
        grupo_argila: 4,
        elemento: 'P',
        qtd: 10,
        class: 'M'
    },
    {
        cultura_id:'001',
        grupo_argila: 1,
        elemento: 'P',
        qtd: 300,
        class: 'A'
    },
    {
        cultura_id:'001',
        grupo_argila: 2,
        elemento: 'P',
        qtd: 200,
        class: 'A'
    },
    {
        cultura_id:'001',
        grupo_argila: 3,
        elemento: 'P',
        qtd: 150,
        class: 'A'
    },
    {
        cultura_id:'001',
        grupo_argila: 4,
        elemento: 'P',
        qtd: 100,
        class: 'A'
    },
    {
        cultura_id:'001',
        grupo_argila: undefined,
        elemento: 'K',
        qtd: 40,
        class: 'B'
    },
    {
        cultura_id:'001',
        grupo_argila: undefined,
        elemento: 'K',
        qtd: 90,
        class: 'M'
    },
    {
        cultura_id:'001',
        grupo_argila: undefined,
        elemento: 'K',
        qtd: 1000,
        class: 'A'
    },
    {
        cultura_id:'002',
        grupo_argila: undefined,
        elemento: 'P',
        qtd: undefined,
        class: undefined
    },
]
TBL_RECOMENDACOES = [
    {
        classe: 'B',
        elemento: 'P',
        cultura_id: '001',
        produtividade_esperada: 100,
        recomendacao: 120
    },
    {
        classe: 'M',
        elemento: 'P',
        cultura_id: '001',
        produtividade_esperada: 100,
        recomendacao: 180
    },
    {
        classe: 'A',
        elemento: 'P',
        cultura_id: '001',
        produtividade_esperada: 100,
        recomendacao: 60
    },
    {
        classe: 'B',
        elemento: 'P',
        cultura_id: '001',
        produtividade_esperada: 150,
        recomendacao: 150
    },
    {
        classe: 'M',
        elemento: 'P',
        cultura_id: '001',
        produtividade_esperada: 150,
        recomendacao: 120
    },
    {
        classe: 'A',
        elemento: 'P',
        cultura_id: '001',
        produtividade_esperada: 150,
        recomendacao: 90
    },
    {
        classe: 'B',
        elemento: 'P',
        cultura_id: '001',
        produtividade_esperada: 180,
        recomendacao: 180
    },
    {
        classe: 'M',
        elemento: 'P',
        cultura_id: '001',
        produtividade_esperada: 180,
        recomendacao: 150
    },
    {
        classe: 'A',
        elemento: 'P',
        cultura_id: '001',
        produtividade_esperada: 180,
        recomendacao: 120
    },
    {
        classe: 'B',
        elemento: 'P',
        cultura_id: '001',
        produtividade_esperada: 500,
        recomendacao: 200
    },
    {
        classe: 'M',
        elemento: 'P',
        cultura_id: '001',
        produtividade_esperada: 500,
        recomendacao: 180
    },
    {
        classe: 'A',
        elemento: 'P',
        cultura_id: '001',
        produtividade_esperada: 500,
        recomendacao: 150
    },
    {
        classe: 'B',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 90,
        recomendacao: 80
    },
    {
        classe: 'M',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 90,
        recomendacao: 60
    },
    {
        classe: 'A',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 90,
        recomendacao: 40
    },
    {
        classe: 'B',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 120,
        recomendacao: 100
    },
    {
        classe: 'M',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 120,
        recomendacao: 80
    },
    {
        classe: 'A',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 120,
        recomendacao: 60
    },
    {
        classe: 'B',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 150,
        recomendacao: 120
    },
    {
        classe: 'M',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 150,
        recomendacao: 100
    },
    {
        classe: 'A',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 150,
        recomendacao: 80
    },
    {
        classe: 'B',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 180,
        recomendacao: 140
    },
    {
        classe: 'M',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 180,
        recomendacao: 120
    },
    {
        classe: 'A',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 180,
        recomendacao: 100
    },
    {
        classe: 'B',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 500,
        recomendacao: 160
    },
    {
        classe: 'M',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 500,
        recomendacao: 140
    },
    {
        classe: 'A',
        elemento: 'K',
        cultura_id: '001',
        produtividade_esperada: 500,
        recomendacao: 120
    },
    {
        classe: 'B',
        elemento: 'P',
        cultura_id: '002',
        produtividade_esperada: 2500,
        recomendacao: 90
    },
    {
        classe: 'M',
        elemento: 'P',
        cultura_id: '002',
        produtividade_esperada: 2500,
        recomendacao: 70
    },
    {
        classe: 'A',
        elemento: 'P',
        cultura_id: '002',
        produtividade_esperada: 2500,
        recomendacao: 50
    },
    {
        classe: 'B',
        elemento: 'P',
        cultura_id: '002',
        produtividade_esperada: 5000,
        recomendacao: 110
    },
    {
        classe: 'M',
        elemento: 'P',
        cultura_id: '002',
        produtividade_esperada: 5000,
        recomendacao: 90
    },
    {
        classe: 'A',
        elemento: 'P',
        cultura_id: '002',
        produtividade_esperada: 5000,
        recomendacao: 70
    },
    {
        classe: 'B',
        elemento: 'K',
        cultura_id: '002',
        produtividade_esperada: 2500,
        recomendacao: 40
    },
    {
        classe: 'M',
        elemento: 'K',
        cultura_id: '002',
        produtividade_esperada: 2500,
        recomendacao: 30
    },
    {
        classe: 'A',
        elemento: 'K',
        cultura_id: '002',
        produtividade_esperada: 2500,
        recomendacao: 20
    },
    {
        classe: 'B',
        elemento: 'K',
        cultura_id: '002',
        produtividade_esperada: 5000,
        recomendacao: 50
    },
    {
        classe: 'M',
        elemento: 'K',
        cultura_id: '002',
        produtividade_esperada: 5000,
        recomendacao: 40
    },
    {
        classe: 'A',
        elemento: 'K',
        cultura_id: '002',
        produtividade_esperada: 5000,
        recomendacao: 20
    },
    {
        classe: undefined,
        elemento: 'N',
        cultura_id: '002',
        produtividade_esperada: 2500,
        recomendacao: 20
    },
    {
        classe: undefined,
        elemento: 'N',
        cultura_id: '002',
        produtividade_esperada: 5000,
        recomendacao: 60
    },
    {
        classe: undefined,
        elemento: 'N-COB',
        cultura_id: '002',
        produtividade_esperada: 2500,
        recomendacao: 40
    },
    {
        classe: undefined,
        elemento: 'N-COB',
        cultura_id: '002',
        produtividade_esperada: 5000,
        recomendacao: 60
    },
]