const database = require('../../../../modelo/database/crud');
const crearServicio = require('./lecturaServicio');
const crearControlador = require('./lecturasControlador');

const servicio = crearServicio(database);
const controlador = crearControlador(servicio);

module.exports = controlador;
