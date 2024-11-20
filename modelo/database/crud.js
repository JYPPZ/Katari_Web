const Database = require('./conexion');

/**
 * Ejecutar una consulta SELECT en la base de datos
 * @param query - Consulta SQL
 * @param params - Parámetros de la consulta
 * @returns {Promise<unknown>} - Promesa que se resuelve con los resultados de la consulta
 */
function executeSelectQuery(query, params = []) {
    const db = Database.open();
    return new Promise((resolve, reject) => {
        db.all(query, params, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows); // Devuelve los resultados
            }
        });
    });
}

/**
 * Ejecutar una consulta que no sea SELECT en la base de datos
 * @param query - Consulta SQL
 * @param params - Parámetros de la consulta
 * @returns {Promise<unknown>} - Promesa que se resuelve con los resultados de la consulta
 */
function executeNonSelectQuery(query, params = []) {
    const db = Database.open();
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this); // Devuelve `this`, que contiene `lastID` y `changes`
            }
        });
    });
}

/**
 * Obtener todas las filas de una tabla
 * @param table - Nombre de la tabla
 * @returns {Promise<unknown>} - Promesa que se resuelve con todas las filas de la tabla
 */
async function getAll(table) {
    const query = `SELECT * FROM ${table}`;
    return await executeSelectQuery(query, []);
}

/**
 * Obtener una fila específica por clave primaria
 * @param table - Nombre de la tabla
 * @param primaryKey - Nombre de la clave primaria
 * @param id - Valor de la clave primaria
 * @returns {Promise<*>} - Promesa que se resuelve con la fila solicitada
 */
async function getOne(table, primaryKey, id) {
    const query = `SELECT * FROM ${table} WHERE ${primaryKey} = ?`;
    return await executeSelectQuery(query, [id]);
}

/**
 * Insertar una fila en una tabla
 * @param table - Nombre de la tabla
 * @param data - Datos a insertar
 * @returns {Promise<number>} - Promesa que se resuelve con el ID de la fila insertada
 */
async function insert(table, data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    const result = await executeNonSelectQuery(query, Object.values(data));
    return result.lastID; // Devuelve el ID de la fila insertada
}

/**
 * Actualizar una fila en una tabla
 * @param table - Nombre de la tabla
 * @param primaryKey - Nombre de la clave primaria
 * @param data - Datos a actualizar
 * @param id - Valor de la clave primaria
 * @returns {Promise<{affectedItems: number}>} - Promesa que se resuelve con el número de filas afectadas
 */
async function update(table, primaryKey, data, id) {
    const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const query = `UPDATE ${table} SET ${updates} WHERE ${primaryKey} = ?`;
    const result = await executeNonSelectQuery(query, [...Object.values(data), id]);
    return { affectedItems: result.changes }; // Devuelve el número de filas afectadas
}

/**
 * Eliminar una fila de una tabla
 * @param table - Nombre de la tabla
 * @param primaryKey - Nombre de la clave primaria
 * @param id - Valor de la clave primaria
 * @returns {Promise<{affectedItems: number}>} - Promesa que se resuelve con el número de filas afectadas
 */
async function remove(table, primaryKey, id) {
    const query = `DELETE FROM ${table} WHERE ${primaryKey} = ?`;
    const result = await executeNonSelectQuery(query, [id]);
    return { affectedItems: result.changes }; // Devuelve el número de filas afectadas
}

module.exports = {
    getAll,
    getOne,
    insert,
    update,
    remove,
    executeSelectQuery,
    executeNonSelectQuery
};
