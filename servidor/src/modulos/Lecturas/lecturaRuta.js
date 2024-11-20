const express = require('express');
const router = express.Router();
const respuesta = require('../../utilidades/respuestas');
const controlador = require('./index');

router.get('/', async (req, res) => {
    try {
        const lectura = await controlador.obtenerLecturas();

        respuesta.success(req, res, {
            success: true,
            message: lectura.length > 0 ? 'Datos encontrados exitosamente' : 'Datos no encontrados',
            data: lectura,
        }, lectura.length > 0 ? 200 : 404);
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al obtener los datos',
            error: error.message,
        }, 500);
    }
});
router.get('/sensor/:sensorId', async (req, res) => {
    try {
        const lectura = await controlador.obtenerLecturasPorSensor(req.params.sensorId);

        respuesta.success(req, res, {
            success: true,
            message: lectura.length > 0 ? 'Datos encontrados exitosamente' : 'Datos no encontrados',
            data: lectura,
        }, lectura.length > 0 ? 200 : 404);
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al obtener los datos',
            error: error.message,
        }, 500);
    }
});
router.get('/:lecturaId', async (req, res) => {
    try {
        const lectura = await controlador.obtenerLecturasPorId(req.params.lecturaId);

        respuesta.success(req, res, {
            success: true,
            message: lectura.length > 0 ? 'Datos encontrados exitosamente' : 'Datos no encontrados',
            data: lectura,
        }, lectura.length > 0 ? 200 : 404);
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al obtener los datos',
            error: error.message,
        }, 500);
    }
});
module.exports = router;