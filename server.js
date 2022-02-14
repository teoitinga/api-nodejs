const app = require('./src/config/express')();
const port = app.get('port');

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
    console.log(`JP-Ares Server is runnig on port ${port}`)
});