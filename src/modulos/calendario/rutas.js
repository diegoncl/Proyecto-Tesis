const express = require('express');
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador');

const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/:id', actualizar);

async function todos (req, res, next) {
    try{
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);    
    }catch(err){
        next(err);
    }
};

async function uno (req, res, next) {
    try{
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    }
};

async function agregar (req, res, next) {
    try{
        const items = await controlador.agregar(req.body);
        respuesta.success(req, res, 'Calendario agregado satisfactoriamente', 201);
    }catch(err){
        next(err);
    }
};

async function actualizar (req, res, next) {
    try{
        const items = await controlador.actualizar({ ...req.body, id: req.params.id });
        respuesta.success(req, res, 'Calendario actualizado satisfactoriamente', 200);
    }catch(err){
        next(err);
    }
};

module.exports = router;