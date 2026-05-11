const db = require('../../DB/mysql');
const TABLA = 'biblioteca_evidencias';
const PK = 'idbiblioteca_evidencias';

async function todos() {
    return db.query(
        `SELECT be.*, nc.titulo AS no_conformidad_titulo, a.codigo AS auditoria_codigo
         FROM biblioteca_evidencias be
         LEFT JOIN no_conformidades nc ON be.no_conformidad_id = nc.idno_conformidades
         LEFT JOIN auditorias a ON nc.auditoria_id = a.idauditorias`
    );
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