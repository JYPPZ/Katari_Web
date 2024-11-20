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
router.get('/:sensorId', async (req, res) => {
    try {
        const sensor = await controlador.obtenerSensorPorId(req.params.sensorId);

        respuesta.success(req, res, {
            success: true,
            message: sensor ? 'Sensor encontrado exitosamente' : 'Sensor no encontrado',
            data: sensor,
        }, sensor ? 200 : 404);
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al obtener el sensor',
            error: error.message,
        }, 500);
    }
});
router.post('/', async (req, res) => {
    try {
        const sensor = await controlador.insertarSensor(req.body);

        respuesta.success(req, res, {
            success: true,
            message: 'Sensor insertado exitosamente',
            data: sensor,
        }, 201);
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al insertar el sensor',
            error: error.message,
        }, 500);
    }
});
router.put('/:sensorId', async (req, res) => {
    try {
        const sensor = await controlador.actualizarSensor(req.params.sensorId, req.body);

        respuesta.success(req, res, {
            success: true,
            message: 'Sensor actualizado exitosamente',
            data: sensor,
        }, 200);
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al actualizar el sensor',
            error: error.message,
        }, 500);
    }
});
router.delete('/:sensorId', async (req, res) => {
    try {
        const sensor = await controlador.eliminarSensor(req.params.sensorId);

        respuesta.success(req, res, {
            success: true,
            message: 'Sensor eliminado exitosamente',
            data: sensor,
        }, 200);
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al eliminar el sensor',
            error: error.message,
        }, 500);
    }
});


module.exports = router;

