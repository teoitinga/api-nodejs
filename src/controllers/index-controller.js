module.exports = () => {
    const controller = {};
  
    controller.hello = (req, res) => res.status(200).json({'message':'API Ares - conectado com sucesso!'});
  
    return controller;
  }