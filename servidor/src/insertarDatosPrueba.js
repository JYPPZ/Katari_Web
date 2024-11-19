const sensorDataJson = require('./demoSensores.json');
const crud = require('../../modelo/database/crud');

/**
 * Inserta los datos de los sensores en la base de datos.
 * @param sensorDataJson {Object} - Datos de los sensores en formato JSON.
 * @returns {Promise<void>} - Promesa que se resuelve cuando se han insertado los datos.
 */
async function insertSensorData(sensorDataJson) {

    const sensores = sensorDataJson.sensors;
    const query = 'SELECT id_sensor FROM tblSensor WHERE referencia_sensor = ?';
    // Iterar sobre los sensores
    for (const [nombre,datos] of Object.entries(sensores)) {

        const readingsString = JSON.stringify(datos.readings); // Convertir a string para insertar en la BD
        const id_sensor = await crud.executeSelectQuery(query, [datos.sensor_id]); // Extraer id de sensor dado su referencia

        const lecturaData = {
            id_sensor: id_sensor[0].id_sensor,
            id_evento: 1,     // TODO: cambiar valor en frontend
            valor_lectura: readingsString,
            fecha_lectura: datos.timestamp
        };

        crud.insert('tblLectura', lecturaData).then((id) => {
            console.log(id);
        });
    }
}

// Llama a la función
insertSensorData(sensorDataJson).then(() => {
    console.log("valores insertados correctamente");
}).catch(console.error);
