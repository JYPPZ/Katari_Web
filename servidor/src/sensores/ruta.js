const express = require('express');
const index = require('./index');
const router = express.Router();
const respuesta = require('../../respuestas');

/**
 * Rutas para sensores
 */
router.get('/', getAll);

async function getAll(req, res) {
    try {
        const sensores = await index.getAll();

        if (!sensores || sensores.length === 0) {
            return respuesta.success(req, res, {
                success: true,
                message: 'No sensors found',
                data: [],
            }, 404);
        }

        respuesta.success(req, res, {
            success: true,
            message: 'Sensors fetched successfully',
            data: sensores,
        }, 200);
    } catch (error) {
        console.error('Error fetching sensors:', error);

        respuesta.error(req, res, {
            success: false,
            message: 'An error occurred while fetching sensors',
            error: error.message,
        }, 500);
    }
}


module.exports = router;