const database = require('../../../../modelo/database/crud');
const crearServicio = require('./eventoServicio');
const crearControlador = require('./eventoControlador');

const servicio = crearServicio(database);
const controlador = crearControlador(servicio);

module.exports = controlador;
