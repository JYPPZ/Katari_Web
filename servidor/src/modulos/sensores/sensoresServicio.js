const TABLE_NAME = 'tblSensor';

module.exports = function (db) {
    async function getAll() {
        return await db.getAll(TABLE_NAME);
    }

    return {
        getAll,
    };
};
