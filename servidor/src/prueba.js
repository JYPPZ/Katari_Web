const crud = require('../../modelo/database/crud');
//crud.getAll('tblDispositivo').then((rows) => {console.log(rows)});
const data = {
    nombre_dispositivo: 'prueba',
    tipo_dispositivo: 'cohete'
};
crud.insert('tblDispositivo', data).then((id) => {console.log(id)});