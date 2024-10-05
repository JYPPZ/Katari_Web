const express = require('express');
const { join } = require('node:path');
const app = express();
const crearTablas = require('./database/crearTablas');


// Servir archivos estáticos de la carpeta cliente
app.use(express.static(join(__dirname, '../cliente')));

// Crear las tablas de la base de datos
crearTablas();

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
