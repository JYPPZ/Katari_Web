const express = require('express');
const router = express.Router();
const respuesta = require('../../utilidades/respuestas');
const controlador = require('./index');

router.get('/', async (req, res) => {
    try {
        const sensores = await controlador.obtenerSensores();

        respuesta.success(req, res, {
            success: true,
            message: sensores.length > 0 ? 'sensores encontrados exitosamente' : 'Sensores no encontrados',
            data: sensores,
        }, sensores.length > 0 ? 200 : 404);
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al obtener los sensores',
            error: error.message,
        }, 500);
    }
});

module.exports = router;
