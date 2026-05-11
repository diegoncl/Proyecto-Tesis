const db = require('../../DB/mysql');
const TABLA = 'auditorias';
const PK = 'idauditorias';

async function todos() {
    return db.query(
        `SELECT a.*, p.nombre AS plan_nombre, pr.nombre AS proyecto_nombre, u.nombre AS auditor_nombre
         FROM auditorias a
         LEFT JOIN planes_auditoria p ON a.plan_auditoria_id = p.idplanes_auditoria
         LEFT JOIN proyectos pr ON p.proyecto_id = pr.idproyectos
         LEFT JOIN usuarios u ON a.auditor_id = u.idusuarios`
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