const TABLE_NAME = 'tblSensor';

module.exports = function (db) {
    async function getAll() {
        return await db.getAll(TABLE_NAME);
    }
    async function getOne(id) {
        return await db.getOne(TABLE_NAME, 'id_sensor', id);
    }
    async function insert(sensorData) {
        return await db.insert(TABLE_NAME, sensorData);
    }
    async function update(id, sensorData) {
        return await db.update(TABLE_NAME, 'id_sensor', id, sensorData);
    }
    async function remove(id) {
        return await db.remove(TABLE_NAME, 'id_sensor', id);
    }
    return {
        getAll,
        getOne,
        insert,
        update,
        remove,
    };
};
