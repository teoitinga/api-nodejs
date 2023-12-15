const httpStatusCode = require('../exceptions/httpStatusCode');

const Service = require('../services/user-service');
const service = new Service();



class LoginController {

    async regroute(req, res) {
        const stored = await service.regroute(req)
        res.status(httpStatusCode.OK).json(stored);
    };

    async login(req, res) {
        const stored = await service.login(req.body)
        res.status(httpStatusCode.OK).json(stored);

    };

    async create(req, res) {
        const stored = await service.save(req)
        res.status(httpStatusCode.CREATED).json(stored);
    };

    async riskItemOnProject(req, res) {
        const stored = await service.riskItemOnProject(req);
        res.status(httpStatusCode.OK).json(stored);

    };

    async addItemOnProject(req, res) {
        const stored = await service.addItemOnProject(req);
        res.status(httpStatusCode.CREATED).json(stored);

    }
    async quitDaeOnProject(req, res) {
        const stored = await service.quitDaeOnProject(req);
        res.status(httpStatusCode.OK).json(stored);

    }
    async quitArtOnProject(req, res) {
        const stored = await service.quitArtOnProject(req);
        res.status(httpStatusCode.OK).json(stored);

    }
    async addtaskOnTreatment(req, res) {
        const stored = await service.addtaskOnTreatment(req);
        res.status(httpStatusCode.CREATED).json(stored);

    }
    async findall(req, res) {
        const stored = await service.findall(req)
        res.status(200).json(stored);
    };

    async findbyid(req, res) {
        const id = req.params['id'];
        const stored = await service.findById(id);
        res.status(200).json(stored);
    };
    async recoverypassword(req, res) {
        const stored = await service.recoverypassword(req);
        res.status(200).json(stored);
    };

    async findByItensDescription(req, res) {
        const stored = await service.findByItensDescription(req);
        res.status(200).json(stored);
    };
    
    async findbyname(req, res) {
        const stored = await service.findByName(req);
        res.status(200).json(stored);
    };
    async findbyfunc(req, res) {
        const stored = await service.findByFuncionario(req);
        res.status(200).json(stored);
    };
    async countMyTasks(req, res) {
        const stored = await service.countMyActions(req);
        res.status(200).json(stored);
    };
    async acompMyProjects(req, res) {
        const stored = await service.acompMyProjects(req);
        res.status(200).json(stored);
    };
    async managerRoutes(req, res) {
        const stored = await service.managerRoutes(req);
        res.status(200).json(stored);
    };
    async myProjectsWithActions(req, res) {
        const stored = await service.myProjectsWithActions(req);
        res.status(200).json(stored);
    };
    async addProject(req, res) {
        const stored = await service.addProject(req);
        res.status(200).json(stored);
    };
    async findMyProjects(req, res) {
        const stored = await service.findMyProjects(req);
        res.status(200).json(stored);
    };
    async findMyTasks(req, res) {
        const stored = await service.findMyActions(req);
        res.status(200).json(stored);
    };
    async recovery(req, res) {
        const id = req.params['id'];
        const stored = await service.recovery(req, id);
        res.status(200).json(stored);
    };

    async update(req, res) {
        const id = req.params['id'];
        const body = req.body;
        const stored = await service.update(req, id);
        res.status(200).json(stored);
    };

    async toggleLock(req, res) {
        const id = req.params['id'];
        const stored = await service.toggleLock(req, id);
        res.status(200).json(stored);
    };
    async extend(req, res) {
        const id = req.params['id'];
        const stored = await service.extend(req, id);
        res.status(200).json(stored);
    };
    async taksUpdateValor(req, res) {
        const id = req.params['id'];
        const stored = await service.taksUpdateValor(req, id);
        res.status(200).json(stored);
    };

    // Retorna os ações registradas referentes ao id da visita informada
    async tasksByTreatment(req, res) {
        const id = req.params['id'];
        const stored = await service.tasksByTreatment(id);
        res.status(200).json(stored);
    };

    // Retorna os itens do projeto referentes ao id da visita informada
    async projectsCrByTreatment(req, res) {
        const id = req.params['id'];
        const stored = await service.projectsCrByTreatment(id);
        res.status(200).json(stored);
    };

    // Retorna a Visita com os dados de tasks e projetos referentes ao id da visita informada
    async taksAndProjectsCrByTreatment(req, res) {
        const id = req.params['id'];

        let projects = await service.projectsCrByTreatment(id);
        let tasks = await service.tasksByTreatment(id);
        let customer = await service.customerByTreatment(id);

        let nomes = ''
        let cpfs = ''

        let resta = customer.length

        customer.map(c=>{
            
            if(resta > 1){
                nomes += `${c.nome} (${c.cpf}) / `
            }else{
                nomes += `${c.nome} (${c.cpf})`
            }

            resta = resta-1;    
        })

        const datavis = {
            id: tasks[0].visitaId,
            local: tasks[0].local,
            data: tasks[0].data,
            // produtor: tasks[0].nome,
            produtor: nomes,
            // cpf: tasks[0].cpf,
            // cpf: cpfs,
        }

        tasks = tasks.map(t => {
            return {
                id: t.taskId,
                description: t.description,
                qtd: t.qtd,
                valor: t.valor,
                status: t.status,
                user: t.user,
            }
        });

        const stored = {
            id: datavis.id,
            local: datavis.local,
            data: datavis.data,
            produtor: datavis.produtor,
            // cpf: datavis.cpf,
            tasks: tasks,
            project: undefined
        }

        if (projects.length > 0) {
            stored.project = {
                idprojeto: projects[0].visitaId,
                banco: projects[0].banco,
                linha: projects[0].linha,
                pgmrda: projects[0].pgmrda,
                pgmtrt: projects[0].pgmtrt,
                valorrda: projects[0].valorrda,
                valortrt: projects[0].valortrt,
                observacoes: projects[0].observacoes,
            }

            projects = projects.map(p => {

                return {
                    iditemfinanciado: p.iditemfinanciado,
                    descricao: p.descricao,
                    unidade: p.unidade,
                    qtditemfinanc: p.qtditemfinanc,
                    valorunit: p.valorunit,
                    valorTotalItem: p.valorTotalItem,
                    risked: p.risked
                }
            })
            stored.project.itensfinanciados = projects;
        }


        res.status(200).json(stored);
    };
    async restartTasks(req, res) {
        const id = req.params['id'];
        const stored = await service.restartTasks(req, id);
        res.status(200).json(stored);
    };

    async allCustomers(req, res) {
        const stored = await service.allCustomers(req);
        res.status(200).json(stored);
    };
    async allTreatmentsByDate(req, res) {
        const stored = await service.allTreatmentsByDate(req);
        res.status(200).json(stored);
    };

    async allTreatments(req, res) {
        const stored = await service.allTreatments(req);
        res.status(200).json(stored);
    };
    async countProjects(req, res) {
        const stored = await service.countProjects(req);
        res.status(200).json(stored);
    };
    async finalizeTasks(req, res) {
        const id = req.params['id'];
        const stored = await service.finalizeTasks(req, id);
        res.status(200).json(stored);
    };
    async expireTasks(req, res) {
        const id = req.params['id'];
        const stored = await service.expireTasks(req, id);
        res.status(200).json(stored);
    };
    async cancelTasks(req, res) {
        const id = req.params['id'];
        const stored = await service.cancelTasks(req, id);
        res.status(200).json(stored);
    };
}
module.exports = LoginController;