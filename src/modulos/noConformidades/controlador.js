const db = require('../../DB/mysql');
const TABLA = 'no_conformidades';
const PK = 'idno_conformidades';

async function todos() {
    return db.query(
        `SELECT nc.*, a.codigo AS auditoria_codigo, a.tipo AS auditoria_tipo, p.nombre AS plan_nombre
         FROM no_conformidades nc
         LEFT JOIN auditorias a ON nc.auditoria_id = a.idauditorias
         LEFT JOIN planes_auditoria p ON a.plan_auditoria_id = p.idplanes_auditoria`
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