module.exports = function (servicio) {
    async function obtenerSensores() {
        return await servicio.getAll();
    }

    return {
        obtenerSensores,
    };
};
