const TABLE_NAME = 'tblEvento';
module.exports = function (db) {
    async function getAll() {
        return await db.getAll(TABLE_NAME);
    }
    async function insert(eventoData) {
        return await db.insert(TABLE_NAME, eventoData);
    }
    async function update(eventoId, eventoData) {
        return await db.update(TABLE_NAME, 'id_evento', eventoId, eventoData);
    }
    async function remove(eventoId) {
        return await db.remove(TABLE_NAME, 'id_evento', eventoId);
    }
    return {
        getAll,
        insert,
        update,
        remove
    };
}