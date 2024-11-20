module.exports = function (servicio) {
    async function obtenerEventos() {
        return await servicio.getAll();
    }
    async function insertarEvento(eventoData) {
        return await servicio.insert(eventoData);
    }
    async function actualizarEvento(eventoId, eventoData) {
        return await servicio.update(eventoId, eventoData);
    }
    async function eliminarEvento(eventoId) {
        return await servicio.remove(eventoId);
    }
    return {
        obtenerEventos,
        insertarEvento,
        actualizarEvento,
        eliminarEvento
    };
}