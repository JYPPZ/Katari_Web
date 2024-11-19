require('dotenv').config();
module.exports = {
    app: {
        port: process.env.PORT || 3000,
        dbPath: process.env.DB_PATH
    }
}