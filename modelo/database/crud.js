const Database = require('./conexion');

// Función auxiliar para ejecutar consultas con un resultado único
function executeQuery(query, params = []) {
    const db = Database.open();
    return new Promise((resolve, reject) => {
        if (query.trim().toUpperCase().startsWith('SELECT')) {
            // Para consultas SELECT, usa `db.all()`
            db.all(query, params, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows); // Devuelve los resultados
                }
            });
        } else {
            // Para otras consultas (INSERT, UPDATE, DELETE), usa `db.run()`
            db.run(query, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this); // Devuelve `this`, que contiene `lastID` y `changes`
                }
            });
        }
    });
}
/*
function executeQuery(query, params = []) {
    const db = Database.open();
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this); // this contiene información de la ejecución
            }
        });
    });
}*/


// Obtener todas las filas de una tabla
async function getAll(table) {
    const query = `SELECT * FROM ${table}`;
    const db = Database.open();

    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Obtener una fila específica por clave primaria
async function getOne(table, primaryKey, id) {
    const query = `SELECT * FROM ${table} WHERE ${primaryKey} = ?`;
    return await executeQuery(query, [id]);
}

// Insertar una nueva fila en la tabla
async function insert(table, data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    const result = await executeQuery(query, Object.values(data));
    return result.lastID; // Devuelve el ID de la fila insertada
}

// Actualizar una fila específica por clave primaria
async function update(table, primaryKey, data, id) {
    const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const query = `UPDATE ${table} SET ${updates} WHERE ${primaryKey} = ?`;
    const result = await executeQuery(query, [...Object.values(data), id]);
    return { affectedItems: result.changes }; // Devuelve el número de filas afectadas
}

// Eliminar una fila específica por clave primaria
async function remove(table, primaryKey, id) {
    const query = `DELETE FROM ${table} WHERE ${primaryKey} = ?`;
    const result = await executeQuery(query, [id]);
    return { affectedItems: result.changes }; // Devuelve el número de filas afectadas
}

module.exports = {
    getAll,
    getOne,
    insert,
    update,
    remove,
    executeQuery
};
