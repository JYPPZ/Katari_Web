const db = require('../../../modelo/database/crud');
const ctrl = require('./controlador');

module.exports = ctrl(db);