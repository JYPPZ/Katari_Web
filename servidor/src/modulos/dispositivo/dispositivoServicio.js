const TABLE_NAME = 'tblDispositivo';
module.exports = function (db) {
    async function getAll() {
        return await db.getAll(TABLE_NAME);
    }
    async function insert(dispositivoData) {
        return await db.insert(TABLE_NAME, dispositivoData);
    }
    async function update(dispositivoId, dispositivoData) {
        return await db.update(TABLE_NAME, 'id_dispositivo', dispositivoId, dispositivoData);
    }
    async function remove(dispositivoId) {
        return await db.remove(TABLE_NAME, 'id_dispositivo', dispositivoId);
    }
    return {
        getAll,
        insert,
        update,
        remove
    };
}