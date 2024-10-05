const express = require('express');
const { join } = require('node:path');
const app = express();
const config = require('./config');


/**
 * configuracion de la aplicacion
 */
app.use(express.static(join(__dirname, '../cliente')));// Servir archivos estáticos de la carpeta cliente

app.set('port', config.app.port);

module.exports = app;