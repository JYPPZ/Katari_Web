const database = require('../../../../modelo/database/crud');
const crearServicio = require('./dispositivoServicio');
const crearControlador = require('./dispositivoControlador');

const servicio = crearServicio(database);
const controlador = crearControlador(servicio);

module.exports = controlador;
