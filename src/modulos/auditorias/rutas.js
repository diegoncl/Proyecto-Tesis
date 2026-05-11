const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/:id', actualizar);

async function todos(req, res, next) {
    try {
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

async function uno(req, res, next) {
    try {
        const item = await controlador.uno(req.params.id);
        respuesta.success(req, res, item, 200);
    } catch (err) {
        next(err);
    }
};

async function agregar(req, res, next) {
    try {
        await controlador.agregar(req.body);
        respuesta.success(req, res, 'Auditoría agregada satisfactoriamente', 201);
    } catch (err) {
        next(err);
    }
};

async function actualizar(req, res, next) {
    try {
        await controlador.actualizar({ ...req.body, id: req.params.id });
        respuesta.success(req, res, 'Auditoría actualizada satisfactoriamente', 200);
    } catch (err) {
        next(err);
    }
};

module.exports = router;