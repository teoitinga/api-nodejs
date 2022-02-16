const moment = require('moment');
const brcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const ContractModel = require('../../models/contract');
const PartnerModel = require('../../models/partner');

const ContractDto = require('../dtos/contract-dto');
const tenderDto = require('../dtos/tender-dto');

const { ServerErrorException } = require('../exceptions/server-exception');
const { NotAuthorizedException } = require('../exceptions/token-exceptions');
const PartnerDto = require('../dtos/partner-dto');

const DivisionService = require('../services/division-service');
const divisionService = new DivisionService();

const PartnerService = require('../services/partner-service');
const partnerService = new PartnerService();

const UserService = require('../services/user-service');
const userService = new UserService();

const RoleService = require('../services/role-service');
const roleService = new RoleService();

const ThemeService = require('../services/theme-service');
const themeService = new ThemeService();

const ModeService = require('../services/mode-service');
const modeService = new ModeService();

class ContractService {
    async create(request) {
        const contract = await request.body;
        contract.id = await uuid.v4().toUpperCase();
        contract.created = await moment();

        return this.storage(contract);
    }
    async storage(contract) {

        await ContractModel.create(contract);
        const c = await ContractModel.findByPk(contract.id);

        let dto = await new ContractDto(c)

        return dto.obj;
    }
    async calcExpires(quota) {
        if (quota == 12)
            return 1;
        if (quota == 6)
            return 6;
        if (quota == 4)
            return 3;
        if (quota == 3)
            return 4;
        if (quota == 1)
            return 12;

        throw new ServerErrorException('Só é permitido parcelamentos em 12, 6, 4, 3 e parcela única.');
    }
    async tender(request) {

        const tenderDto = await request.body;

        const id = uuid.v4().toUpperCase();
        const date = moment().utc();
        const dateExp = moment().utc().add(await this.calcExpires(tenderDto.quota), 'month');

        //const token = await request.headers.authorization.split(' ')[1];
        //const userActive = await cache.userLogged(token);
        const activeUser = 'jp-teo';

        /**Verifica consistencia das informações */
        //Existe a empresa?
        const partner_exists = await partnerService.exists(tenderDto.partner_registry);
        console.log(partner_exists);
        if( partner_exists ){
            throw new ServerErrorException(`O registro da empresa: ${tenderDto.partner_registry} já existe no banco de dados.`)
        }
        
        //Exite o usuário?
        const user_exists = await userService.exists(tenderDto.user_registry);
        if( user_exists ){
            throw new ServerErrorException(`O registro de usuário: ${tenderDto.user_registry} já existe no banco de dados.`)
        }
        
        //Existe o plano informado?
        /** Verifica o plano de contrato informado */
        const plan = await modeService.findOne(tenderDto.mode_contract);
        console.log(plan);

        if(!( plan ))
            throw new ServerErrorException(`O plano definido neste contrato não existe.`)


        /**Configura e Cria os registros */
        /**Cria a empresa */
        const partner = {};

        partner.id = id;
        partner.name = tenderDto.partner_name;
        partner.nickname = tenderDto.partner_nickname;
        partner.registry = tenderDto.partner_registry;
        partner.email = tenderDto.partner_email;
        partner.idRepresentative = id;
        partner.address = tenderDto.partner_address.concat(
            ', ',
            tenderDto.partner_address_num,
            ' - Compl: ',
            tenderDto.partner_address_complement,
            ' - Bairro: ',
            tenderDto.partner_address_district,
            ' - CEP: ',
            tenderDto.partner_address_cep
        );
        partner.phone = tenderDto.partner_phone;
        partner.city = tenderDto.partner_city + '/' + tenderDto.partner_uf;

        partner.expiresDate = dateExp;
        partner.createdby = activeUser;

        /**A empresa inicia com status bloqueado para averiguações e 
         * um dos administradores da plataforma possuem acesso para desbloquear. 
         */
        partner.lockedDate = date;

        const created_partner = await partnerService.storage(partner);

        /**Cria o Departamento */
        const division = {};
        division.id = id;
        division.partner_id = id;
        division.name = tenderDto.division_name;
        division.representative_id = id;
        division.nickname = tenderDto.division_name;
        division.registry = tenderDto.partner_registry;
        division.email = tenderDto.partner_email;
        division.address = tenderDto.partner_address;
        division.phone = tenderDto.partner_phone;
        division.city = tenderDto.partner_city;

        /**Define o tema deste primeiro departamento/divisão */
        const theme_type = 'ADMIN';
        const theme = await themeService.findByType(theme_type);
        division.theme = theme.id;

        division.expiresDate = dateExp;
        division.createdby = activeUser;

        const created_division = await divisionService.storage(division);

        /**Cria o Usuário */
        const user = {};
        user.id = id;
        user.name = tenderDto.user_name;
        user.registry = tenderDto.user_registry;
        user.email = tenderDto.partner_email
        
        user.address = tenderDto.partner_address;
        user.num = tenderDto.partner_address_num;
        user.complement = tenderDto.partner_address_complement;
        user.district = tenderDto.partner_address_district;
        user.cep = tenderDto.partner_address_cep;

        user.phone = tenderDto.partner_phone;
        user.city = tenderDto.partner_city;
        user.uf = tenderDto.partner_uf;

        /**Define um password aleatório e envia no email posteriormente */
        user.password = await this.generatehashPassword();

        user.partner_id = id;
        user.division_id = id;
        user.expiresDate = dateExp;
        user.createdby = activeUser;

        /**Define a role de classe 7 para o primeiro Gestor a contratar os serviços*/
        const role_class = 7;
        const role = await roleService.findByClass(role_class);
        user.role_id = role.id;

        /**Registra o usuário no banco de dados */
        const created_user = await userService.storage(user);
        console.log(created_user);

        /**Cria o contrato */
        const contract = {};
        contract.id = id;
        contract.payment = tenderDto.payment;
        contract.quota = tenderDto.quota;
        contract.ps = tenderDto.ps;



        contract.mode_id = plan.id;
        contract.partner_id = id;
        contract.division_id = id;

        contract.expiresDate = dateExp.add(tenderDto.quota, 'month');
        contract.createdby = activeUser;

        const created_contract = await this.storage(contract);

        /**Finaliza a operação */

        return tenderDto;
    }
    async generatehashPassword() {

        const lower = [...'abcdefghijklmnopqrstuvwzyz'];
        const upper = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
        const numbers = [...'0123456789'];
        const chars = [...'#$&*()@'];

        const vetor = [...lower, ...upper, ...numbers, ...chars];
        const hashpass = [...'12345678'];
        const size = hashpass.length;

        let hash = [];
        hashpass.forEach(h => {
            h = vetor[(Math.floor(Math.random() * vetor.length))];
            hash = hash.concat(h);
        });

        return ''.concat(...hash);

    }
    async findall() {

        try {

            const users = await ContractModel.findAll();

            let dto = [];
            users.map(async function (user) {
                dto.push(await new ContractDto(user).obj);
            });

            return dto;

        } catch (e) {
            console.error(e);
        }
    }

}
module.exports = ContractService;