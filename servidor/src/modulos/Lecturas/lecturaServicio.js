const TABLE_NAME = 'tblLectura';

module.exports = function (db) {
    async function getAll() {
        return await db.getAll(TABLE_NAME);
    }
    async function getAllBySensor(sensorId) {
        return await db.getOne(TABLE_NAME, 'id_sensor', sensorId);
    }
    async function getAllById(lacturaId) {
        return await db.getOne(TABLE_NAME, 'id_lectura', lacturaId);
    }
    async function insert(lecturaData) {
        return await db.insert(TABLE_NAME, lecturaData);
    }
    return {
        getAll,
        getAllBySensor,
        getAllById,
        insert
    };
};
