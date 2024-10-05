require('dotenv').config();
module.exports = {
    app: {
        port: process.env.PORT,
        dbPath: process.env.DB_PATH || 'database.db'
    }
}