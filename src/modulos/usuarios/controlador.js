const db = require('../../DB/mysql');

const TABLA = 'usuarios';
const PK = 'idusuarios';

function todos () {
    return db.todos(TABLA);
}

function uno (id) {
    return db.uno(TABLA, id, PK);
}

function agregar (data) {
    return db.agregar(TABLA, data);
}

function actualizar (data) {
    return db.actualizar(TABLA, data, PK);
}

function eliminar (body) {
    return db.eliminar(TABLA, body, PK);
}

module.exports = {
    todos,
    uno,
    agregar,
    actualizar,
    eliminar,
}