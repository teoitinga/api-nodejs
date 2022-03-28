const moment = require('moment');
const uuid = require('uuid');

const UserCache = require('../core/cache-user');
const cache = new UserCache();

const { ServerErrorException } = require('../exceptions/server-exception');

const { Op } = require("sequelize");
/**
 * Rotas de upload de arquivos
 */
/**
 * Responsável por gravar os arquivos vindos por upload
 */

const multer = require('multer');


class UploadService {

    async createRater(request) {
        console.log(request.body);

        const upload = multer({
            fileFilter: (req, file, cb) => {
                if (file.mimetype === 'image/png') {
                    cb(null, true);
                }
                else {
                    cb(new multer.MulterError('not a PNG'));
                }
            },
            limits: {
                fieldSize: 1024 * 512,
                fieldNameSize: 200
            },
            dest: './uploads/'
        })
        upload.single('rater');
        return '';
    }


}
module.exports = UploadService;