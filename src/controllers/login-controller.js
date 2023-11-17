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
        const stored = await service.tasksByTreatment( id );
        res.status(200).json(stored);
    };

    // Retorna os itens do projeto referentes ao id da visita informada
    async projectsCrByTreatment(req, res) {
        const id = req.params['id'];
        const stored = await service.projectsCrByTreatment( id );
        res.status(200).json(stored);
    };

    // Retorna a Visita com os dados de tasks e projetos referentes ao id da visita informada
    async taksAndProjectsCrByTreatment (req, res) {
        const id = req.params['id'];
        
        let projects = await service.projectsCrByTreatment( id );
        let tasks = await service.tasksByTreatment( id );

        tasks = tasks.map(t=>{
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
            id: projects[0].visitaId,
            local: projects[0].local,
            data: projects[0].data,
            produtor: projects[0].nome,
            cpf: projects[0].cpf,
            tasks: tasks,
        }

        projects = projects.map(p=>{

            return {
                id: p.visitaId,
                local: p.local,
                data: p.data,
                nome: p.nome,
                cpf: p.cpf,
                banco: p.banco,
                linha: p.linha,
                pgmrda: p.pgmrda,
                pgmtrt: p.pgmtrt,
                valorrda: p.valorrda,
                valortrt: p.valortrt,
                observacoes: p.observacoes,
                iditemfinanciado: p.iditemfinanciado,
                descricao: p.descricao,
                unidade: p.unidade,
                qtditemfinanc: p.qtditemfinanc,
                valorunit: p.valorunit,
                valorTotalItem: p.valorTotalItem
            }
        })
        
        stored.projects = projects;

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