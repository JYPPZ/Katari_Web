const Database = require('./conexion');
/**
 * crear definiciones de tablas
 */
const tablas = [
    {
        nombre: 'tblDispositivo',
        query: 'CREATE TABLE IF NOT EXISTS tblDispositivo ' +
            '(id_dispositivo INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'nombre_dispositivo TEXT, ' +
            'tipo_dispositivo TEXT,' +
            'CHECK (tipo_dispositivo IN ("cohete", "satelite")));'
    },
    {
        nombre: 'tblSsensor',
        query: 'CREATE TABLE IF NOT EXISTS tblSsensor ' +
            '(id_sensor INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'id_dispositivo INTEGER,' +
            'nombre_sensor TEXT, ' +
            'tipo_sensor TEXT,' +
            'referencia_sensor TEXT,' +
            'estado_sensor TEXT,' +
            'FOREIGN KEY (id_dispositivo) REFERENCES dispositivo(id_dispositivo),' +
            'CHECK (tipo_sensor IN ("altimetro", "acelerometro", "gps", "Movimiento Inercial", "temperatura", "presion")),' +
            'CHECK (estado_sensor IN ("bueno", "malo", "calibrando", "intermitente")));'
    },
    {
        nombre: 'tblEvento',
        query: 'CREATE TABLE IF NOT EXISTS tblEvento ' +
            '(id_evento INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'tipo_evento TEXT,' +
            'nombre_evento TEXT,' +
            'descripcion_evento TEXT,' +
            'fecha_inicio_evento TEXT,' +
            'fecha_fin_evento TEXT,' +
            'estado_evento TEXT,' +
            'CHECK (tipo_evento IN ("despegue", "prueba")),' +
            'CHECK (estado_evento IN ("completado", "fallido")));'
    },
    {
        nombre: 'tblLectura',
        query: 'CREATE TABLE IF NOT EXISTS tblLectura ' +
            '(id_lectura INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'id_sensor INTEGER,' +
            'id_evento INTEGER,' +
            'valor_lectura REAL,' +
            'fecha_lectura TEXT,' +
            'FOREIGN KEY (id_sensor) REFERENCES tblSensor(id_sensor),' +
            'FOREIGN KEY (id_evento) REFERENCES tblEvento(id_evento));'
    },
    {
        nombre: 'tblEventoSensor',
        query: 'CREATE TABLE IF NOT EXISTS tblEventoSensor ' +
            '(id_evento_sensor INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'id_evento INTEGER,' +
            'id_sensor INTEGER,' +
            'FOREIGN KEY (id_evento) REFERENCES tblEvento(id_evento),' +
            'FOREIGN KEY (id_sensor) REFERENCES tblSensor(id_sensor));'
    }
];

/**
 * Función para crear las tablas
 */
const crearTablas = () => {
    const db = Database.open();

    // Iterar sobre las definiciones de las tablas
    tablas.forEach(({ nombre, query }) => {
        db.run(query, (err) => {
            if (err) {
                console.error(`Error al crear la tabla "${nombre}":`, err.message);
            } else {
                console.log(`Tabla "${nombre}" creada o ya existe.`);
            }
        });
    });
    Database.close();
};


module.exports = crearTablas;