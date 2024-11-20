const {error} = require("../../utilidades/respuestas");
module.exports = function (servicio) {
    async function obtenerLecturas() {
        return await servicio.getAll();
    }
    async function obtenerLecturasPorSensor(sensorId) {
        return await servicio.getAllBySensor(sensorId);
    }
    async function obtenerLecturasPorFecha(fecha) {
        return new error(501, "No implementado"); // TODO: Implementar función
    }
    async function obtenerLecturasPorSensorYFecha(sensorId, fecha) {
        return new error(501, "No implementado"); // TODO: Implementar función
    }
    async function obtenerLecturasPorId(lecturaId) {
        return await servicio.getAllById(lecturaId);
    }
    async function insertarLectura(lecturaData) {
        return await servicio.insert(lecturaData);
    }
    return {
        obtenerLecturas,
        obtenerLecturasPorSensor,
        obtenerLecturasPorId,
        insertarLectura
    };
};
