const multer = require('multer');
const path = require('path');
const fs = require('fs');
const UserCache = require('../core/cache-user');
const cache = new UserCache();

// Vamos exportar nosso módulo multer, executando com as nossas configurações em um objeto.
module.exports = (multer({

    // Como vai ser feito o armazenamento de aruqivos:
    storage: multer.diskStorage({

        // Destino do arquivo:
        destination: async function(req, file, cb) {

            const credendial = await cache.getCredencial(req);
            const partner_id = credendial.partnerId;
            const division_id = credendial.divisionId;

            //const partner_id = 'PARTNERID';
            //const path = `./RATERS/${partner_id}/${division_id}/`
            const path = `./RATERS/`
            fs.mkdirSync(path, { recursive: true })

            return cb(null, path)
        },

        // Como os arquivos vão ser chamados:
        filename: (req, file, cb) => {
            
            // Setando o nome do arquivo que vai ser salvado no segundo paramêtro
            // Apenas concatenei a data atual como o nome original do arquivo, que a biblioteca nos disponibiliza.
            const treatment = JSON.parse(req.body.treatment);
            const file_id = treatment.id;
            const tipo = file.originalname.split('.')[1];

            const filename = `${file_id}.${tipo}`;

            treatment.pathFileName = filename;
            req.body.treatment = JSON.stringify(treatment);

            cb(null, filename);

        },

        // Formatos aceitos:
        fileFilter: (req, file, cb) => {

            const isAccepted = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'].find(formatoAceito => {
                formatoAceito == file.mimetype
            });

            // Formato aceito:
            if (isAccepted) {

                return cb(null, true);
            }

            // Formato inválido:
            return cb(null, false);
        }

    }),


}));