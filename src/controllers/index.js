
class IndexController {

    async welcome(req, res) {
            res.status(200).json({message: "O servidor está conectado!"});
    };
    
}
module.exports = IndexController;