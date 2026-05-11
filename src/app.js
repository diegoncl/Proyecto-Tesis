const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');

const usuarios = require('./modulos/usuarios/rutas');
const calendario = require('./modulos/calendario/rutas');
const planesAuditoria = require('./modulos/planesAuditoria/rutas');
const proyectos = require('./modulos/proyectos/rutas');
const auditorias = require('./modulos/auditorias/rutas');
const noConformidades = require('./modulos/noConformidades/rutas');
const bibliotecaEvidencias = require('./modulos/bibliotecaEvidencias/rutas');
const error = require('./red/errors.js');

const app = express();
const path = require('path');

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

//configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/usuarios', usuarios);
app.use('/api/calendario', calendario);
app.use('/api/planesAuditoria', planesAuditoria);
app.use('/api/proyectos', proyectos);
app.use('/api/auditorias', auditorias);
app.use('/api/noConformidades', noConformidades);
app.use('/api/bibliotecaEvidencias', bibliotecaEvidencias);
app.use(error);

module.exports = app;
             