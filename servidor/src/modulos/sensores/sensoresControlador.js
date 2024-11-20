module.exports = function (servicio) {
    async function obtenerSensores() {
        return await servicio.getAll();
    }
    async function obtenerSensorPorId(sensorId) {
        return await servicio.getOne(sensorId);
    }
    async function insertarSensor(sensorData) {
        return await servicio.insert(sensorData);
    }
    async function actualizarSensor(sensorId, sensorData) {
        return await servicio.update(sensorId, sensorData);
    }
    async function eliminarSensor(sensorId) {
        return await servicio.remove(sensorId);
    }
    return {
        obtenerSensores,
        obtenerSensorPorId,
        insertarSensor,
        actualizarSensor,
        eliminarSensor,
    };
};
