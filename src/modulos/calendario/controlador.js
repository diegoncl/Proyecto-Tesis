const db = require('../../DB/mysql');
const TABLA = 'calendario';
const PK = 'idcalendario';

async function todos() {
    return db.todos(TABLA);
}

async function uno(id) {
    return db.uno(TABLA, id, PK);
}

async function agregar(data) {
    return db.agregar(TABLA, data);
}

async function actualizar(data) {
    return db.actualizar(TABLA, data, PK);
}

async function eliminar(body) {
    return db.eliminar(TABLA, body, PK);
}

module.exports = { todos, uno, agregar, actualizar, eliminar };