module.exports = function (servicio) {
    async function obtenerDispositivos() {
        return await servicio.getAll();
    }
    async function insertarDispositivo(dispositivoData) {
        return await servicio.insert(dispositivoData);
    }
    async function actualizarDispositivo(dispositivoId, dispositivoData) {
        return await servicio.update(dispositivoId, dispositivoData);
    }
    async function eliminarDispositivo(dispositivoId) {
        return await servicio.remove(dispositivoId);
    }
    return {
        obtenerDispositivos,
        insertarDispositivo,
        actualizarDispositivo,
        eliminarDispositivo
    };
}