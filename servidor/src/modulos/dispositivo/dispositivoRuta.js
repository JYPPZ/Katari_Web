const express = require('express');
const router = express.Router();
const respuesta = require('../../utilidades/respuestas');
const controlador = require('./index');

router.get('/', async (req, res) => {
    try {
        const dispositivo = await controlador.obtenerDispositivos();

        respuesta.success(req, res, {
            success: true,
            message: dispositivo.length > 0 ? 'Datos encontrados exitosamente' : 'Datos no encontrados',
            data: dispositivo,
        }, dispositivo.length > 0 ? 200 : 404);
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al obtener los datos',
            error: error.message,
        }, 500);
    }
});
router.post('/', async (req, res) => {
    try {
        const dispositivo = await controlador.insertarDispositivo(req.body);

        respuesta.success(req, res, {
            success: true,
            message: 'Dispositivo creado exitosamente',
            data: dispositivo,
        }, 201);
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al crear el dispositivo',
            error: error.message,
        }, 500);
    }
});
router.put('/:dispositivoId', async (req, res) => {
    try {
        const dispositivo = await controlador.actualizarDispositivo(req.params.dispositivoId, req.body);

        if (dispositivo.affectedItems !== 0) {
            respuesta.success(req, res, {
                success: true,
                message: 'Dispositivo actualizado exitosamente',
                data: dispositivo,
            }, 200);
        } else {
            respuesta.error(req, res, {
                success: false,
                message: 'Dispositivo no encontrado',
            }, 404);
        }
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al actualizar el dispositivo',
            error: error.message,
        }, 500);
    }
});
router.delete('/:dispositivoId', async (req, res) => {
    try {
        const dispositivo = await controlador.eliminarDispositivo(req.params.dispositivoId);
        if (dispositivo.affectedItems !== 0) {
            respuesta.success(req, res, {
                success: true,
                message: 'Dispositivo eliminado exitosamente',
                data: dispositivo,
            }, 200);
        } else {
            respuesta.error(req, res, {
                success: false,
                message: 'Dispositivo no encontrado',
            }, 404);
        }
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al eliminar el dispositivo',
            error: error.message,
        }, 500);
    }
});
module.exports = router;