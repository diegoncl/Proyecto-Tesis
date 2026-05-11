-- Script de datos base para pruebas

USE `mydb`;

-- Datos de prueba para roles
INSERT INTO `roles` (`nombre_rol`) VALUES ('administrador');
INSERT INTO `roles` (`nombre_rol`) VALUES ('auditor');
INSERT INTO `roles` (`nombre_rol`) VALUES ('responsable');

-- Datos de prueba para usuarios
INSERT INTO `usuarios` (`nombre`, `email`, `roles_id`) VALUES ('Admin User', 'admin@example.com', 1);
INSERT INTO `usuarios` (`nombre`, `email`, `roles_id`) VALUES ('Auditor User', 'auditor@example.com', 2);
INSERT INTO `usuarios` (`nombre`, `email`, `roles_id`) VALUES ('Responsable User', 'responsable@example.com', 3);

-- Datos de prueba para calendario
INSERT INTO `calendario` (`titulo`, `descripcion`, `fecha_inicio`, `fecha_fin`) 
VALUES ('Auditoría Q1 2024', 'Auditoría del primer trimestre', '2024-01-15 09:00:00', '2024-03-31 17:00:00');
INSERT INTO `calendario` (`titulo`, `descripcion`, `fecha_inicio`, `fecha_fin`) 
VALUES ('Auditoría Q2 2024', 'Auditoría del segundo trimestre', '2024-04-01 09:00:00', '2024-06-30 17:00:00');

-- Datos de prueba para planes_auditoria
INSERT INTO `planes_auditoria` (`nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`) 
VALUES ('Plan Anual 2024', 'Plan maestro de auditorías para el año 2024', '2024-01-01', '2024-12-31');

-- Datos de prueba para proyectos
INSERT INTO `proyectos` (`nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`) 
VALUES ('Proyecto de Calidad', 'Mejora de procesos de calidad', '2024-03-01', '2024-08-31');
INSERT INTO `proyectos` (`nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`) 
VALUES ('Proyecto de Cumplimiento', 'Asegurar cumplimiento normativo', '2024-02-01', '2024-10-31');


