const express = require('express');
const { join } = require('node:path');
const app = express();
const sensores = require('./src/sensores/ruta');


/**
 * configuracion de la aplicacion
 */
app.use(express.static(join(__dirname, '../cliente'))); // Servir archivos estáticos de la carpeta cliente
app.use(express.json()); // Habilitar el uso de JSON en las peticiones

/**
 * Rutas de la aplicacion
 */
app.use('/sensores', sensores);





module.exports = app;