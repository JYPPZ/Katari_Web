const app = require('./app');
const crearTablas = require('../modelo/database/crearTablas');

crearTablas.then(() => {
    app.listen(app.get('port'), () => {
        console.log("Servidor escuchando en el puerto", app.get('port'));
    });
}).catch(err => {
    console.error('Error durante la inicialización de la base de datos:', err);
});