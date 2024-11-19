const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta al archivo SQLite
const dbPath = path.resolve(__dirname, 'database.db');

/**
 * Clase que maneja la conexión a la base de datos
 */
class Database {
    static db;

    /**
     * Abre la conexión a la base de datos
     * @returns {sqlite3.Database} - Retorna la instancia de la conexión a la base de datos
     */
    static open() {
        if (!this.db) {
            this.db = new sqlite3.Database(dbPath, (err) => {
                if (err) {
                    console.error('Error al abrir la base de datos:', err.message);
                    throw err;
                }
                console.log('Conectado a la base de datos.');
            });
        }
        return this.db;
    }

    /**
     * Cierra la conexión a la base de datos
     */
    static close() {
        if (!this.db) {
            console.log('No hay conexión abierta para cerrar.');
        }
    }
}

module.exports = Database;
