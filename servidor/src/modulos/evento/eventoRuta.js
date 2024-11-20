const express = require('express');
const router = express.Router();
const respuesta = require('../../utilidades/respuestas');
const controlador = require('./index');

router.get('/', async (req, res) => {
    try {
        const eventos = await controlador.obtenerEventos();

        respuesta.success(req, res, {
            success: true,
            message: eventos.length > 0 ? 'Eventos encontrados exitosamente' : 'Eventos no encontrados',
            data: eventos,
        }, eventos.length > 0 ? 200 : 404);
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al obtener los eventos',
            error: error.message,
        }, 500);
    }
});
router.post('/', async (req, res) => {
    try {
        const evento = await controlador.insertarEvento(req.body);

        respuesta.success(req, res, {
            success: true,
            message: 'Evento creado exitosamente',
            data: evento,
        }, 201);
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al crear el evento',
            error: error.message,
        }, 500);
    }
});
router.put('/:eventoId', async (req, res) => {
    try {
        const evento = await controlador.actualizarEvento(req.params.eventoId, req.body);
        if (evento.affectedItems !== 0) {
            respuesta.success(req, res, {
                success: true,
                message: 'Evento actualizado exitosamente',
                data: evento,
            }, 200);
        } else {
            respuesta.error(req, res, {
                success: false,
                message: 'Evento no encontrado',
            }, 404);
        }
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al actualizar el evento',
            error: error.message,
        }, 500);
    }
});
router.delete('/:eventoId', async (req, res) => {
    try {
        const evento = await controlador.eliminarEvento(req.params.eventoId);
        if (evento.affectedItems !== 0) {
            respuesta.success(req, res, {
                success: true,
                message: 'Evento eliminado exitosamente',
                data: evento,
            }, 200);
        } else {
            respuesta.error(req, res, {
                success: false,
                message: 'Evento no encontrado',
            }, 404);
        }
    } catch (error) {
        respuesta.error(req, res, {
            success: false,
            message: 'Ocurrio un error al eliminar el evento',
            error: error.message,
        }, 500);
    }
});




module.exports = router;
