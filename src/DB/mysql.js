const mysql = require('mysql2/promise');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    waitForConnections: true,
    connectionLimit: 10,
};

const pool = mysql.createPool(dbconfig);

// Obtener todos
async function todos(tabla) {
    const [rows] = await pool.query(
        'SELECT * FROM ??',
        [tabla]
    );
    return rows;
}

// Obtener uno
async function uno(tabla, id, pkField = 'id') {
    const [rows] = await pool.query(
        'SELECT * FROM ?? WHERE ?? = ?',
        [tabla, pkField, id]
    );
    return rows[0];
}

// Insertar
async function agregar(tabla, data) {
    const [result] = await pool.query(
        'INSERT INTO ?? SET ?',
        [tabla, data]
    );
    return result;
}

// Actualizar
async function actualizar(tabla, data, pkField = 'id') {
    const [result] = await pool.query(
        'UPDATE ?? SET ? WHERE ?? = ?',
        [tabla, data, pkField, data.id]
    );
    return result;
}

// Eliminar
async function eliminar(tabla, data, pkField = 'id') {
    const [result] = await pool.query(
        'DELETE FROM ?? WHERE ?? = ?',
        [tabla, pkField, data.id]
    );
    return result;
}

module.exports = {
    todos,
    uno,
    agregar,
    actualizar,
    eliminar,
};