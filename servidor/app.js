const express = require('express');
const { join } = require('node:path');
const app = express();
/**
 * Modulos de la aplicacion
 * @type {Router | {}}
 */
const sensores = require('./src/modulos/sensores/sensoresRuta');
const Lecturas = require('./src/modulos/lecturas/lecturaRuta');

/**
 * configuracion de la aplicacion
 */
app.use(express.static(join(__dirname, '../cliente'))); // Servir archivos estáticos de la carpeta cliente
app.use(express.json()); // Habilitar el uso de JSON en las peticiones

/**
 * Rutas de la aplicacion
 */
app.use('/sensores', sensores);
app.use('/lecturas', Lecturas);




module.exports = app;