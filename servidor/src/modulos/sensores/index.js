const database = require('../../../../modelo/database/crud');
const crearServicio = require('./sensoresServicio');
const crearControlador = require('./sensoresControlador');

const servicio = crearServicio(database);
const controlador = crearControlador(servicio);

module.exports = controlador;
