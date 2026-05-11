-- Esquema mejorado para el sistema de gestión de auditorías
-- Con soporte completo para todos los módulos

CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `mydb`;

-- Tabla roles
CREATE TABLE IF NOT EXISTS `roles` (
  `idroles` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(45) NULL,
  PRIMARY KEY (`idroles`)
) ENGINE=InnoDB;

-- Tabla usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idusuarios` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL UNIQUE,
  `roles_id` INT NOT NULL,
  PRIMARY KEY (`idusuarios`),
  INDEX `fk_usuarios_roles1_idx` (`roles_id` ASC),
  CONSTRAINT `fk_usuarios_roles1`
    FOREIGN KEY (`roles_id`)
    REFERENCES `roles` (`idroles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Tabla calendario
CREATE TABLE IF NOT EXISTS `calendario` (
  `idcalendario` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(200) NULL,
  `descripcion` TEXT NULL,
  `fecha_inicio` DATETIME NULL,
  `fecha_fin` DATETIME NULL,
  PRIMARY KEY (`idcalendario`)
) ENGINE=InnoDB;

-- Tabla proyectos
CREATE TABLE IF NOT EXISTS `proyectos` (
  `idproyectos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` TEXT NULL,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idproyectos`)
) ENGINE=InnoDB;

-- Tabla tipos_auditorias
CREATE TABLE IF NOT EXISTS `tipos_auditorias` (
  `idtipos_auditorias` INT NOT NULL AUTO_INCREMENT,
  `nombre_tipo` VARCHAR(45) NULL,
  PRIMARY KEY (`idtipos_auditorias`)
) ENGINE=InnoDB;

-- Tabla auditorias
CREATE TABLE IF NOT EXISTS `auditorias` (
  `idauditorias` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(45) NULL UNIQUE,
  `tipos_auditorias_id` INT NULL,
  `tipo` VARCHAR(100) NULL,
  `auditor` VARCHAR(200) NULL,
  `fecha_programada` DATE NULL,
  `fecha_ejecucion` DATE NULL,
  `auditor_id` INT NULL,
  `plan_auditoria_id` INT NULL,
  `estado` VARCHAR(1000) NULL,
  `puntuacion_total` VARCHAR(45) NULL,
  PRIMARY KEY (`idauditorias`),
  INDEX `fk_auditorias_tipos_auditorias1_idx` (`tipos_auditorias_id` ASC),
  INDEX `fk_auditorias_planes_auditoria_idx` (`plan_auditoria_id` ASC),
  INDEX `fk_auditorias_usuario_idx` (`auditor_id` ASC),
  CONSTRAINT `fk_auditorias_tipos_auditorias1`
    FOREIGN KEY (`tipos_auditorias_id`)
    REFERENCES `tipos_auditorias` (`idtipos_auditorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_auditorias_planes_auditoria1`
    FOREIGN KEY (`plan_auditoria_id`)
    REFERENCES `planes_auditoria` (`idplanes_auditoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_auditorias_usuarios1`
    FOREIGN KEY (`auditor_id`)
    REFERENCES `usuarios` (`idusuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Tabla planes_auditoria (Mejorada)
CREATE TABLE IF NOT EXISTS `planes_auditoria` (
  `idplanes_auditoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` TEXT NULL,
  `alcance` TEXT NULL,
  `objetivos` TEXT NULL,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  `responsable` VARCHAR(200) NULL,
  `proyecto_id` INT NULL,
  `estado` VARCHAR(50) DEFAULT 'Planificación',
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idplanes_auditoria`),
  INDEX `fk_planes_auditoria_proyectos_idx` (`proyecto_id` ASC),
  CONSTRAINT `fk_planes_auditoria_proyectos1`
    FOREIGN KEY (`proyecto_id`)
    REFERENCES `proyectos` (`idproyectos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Tabla biblioteca_evidencias (Mejorada)
CREATE TABLE IF NOT EXISTS `biblioteca_evidencias` (
  `idbiblioteca_evidencias` INT NOT NULL AUTO_INCREMENT,
  `nombre_evidencia` VARCHAR(200) NOT NULL,
  `descripcion` TEXT NULL,
  `tipo_evidencia` VARCHAR(100) NULL,
  `url_evidencia` VARCHAR(500) NULL,
  `fecha_obtencion` DATE NULL,
  `autor_auditor` VARCHAR(200) NULL,
  `proceso_relacionado` VARCHAR(300) NULL,
  `hallazgo_asociado` TEXT NULL,
  `no_conformidad_id` INT NULL,
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idbiblioteca_evidencias`),
  INDEX `fk_biblioteca_evidencias_no_conformidades_idx` (`no_conformidad_id` ASC),
  CONSTRAINT `fk_biblioteca_evidencias_no_conformidades1`
    FOREIGN KEY (`no_conformidad_id`)
    REFERENCES `no_conformidades` (`idno_conformidades`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Tabla no_conformidades (Mejorada)
CREATE TABLE IF NOT EXISTS `no_conformidades` (
  `idno_conformidades` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(500) NOT NULL,
  `descripcion` VARCHAR(2000) NULL,
  `causa_raiz` TEXT NULL,
  `severidad` VARCHAR(50) NULL,
  `plan_accion` TEXT NULL,
  `fecha_limite_correccion` DATE NULL,
  `responsable` VARCHAR(200) NULL,
  `auditoria_id` INT NULL,
  `estado` VARCHAR(50) DEFAULT 'Abierta',
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idno_conformidades`),
  INDEX `fk_no_conformidades_auditorias_idx` (`auditoria_id` ASC),
  CONSTRAINT `fk_no_conformidades_auditorias1`
    FOREIGN KEY (`auditoria_id`)
    REFERENCES `auditorias` (`idauditorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Inserciones de datos iniciales
INSERT INTO `roles` (`nombre_rol`) VALUES
('Auditor'),
('Jefe Auditoría'),
('Responsable Proceso'),
('Administrador');

INSERT INTO `tipos_auditorias` (`nombre_tipo`) VALUES
('Auditoría Interna'),
('Auditoría Externa'),
('Auditoría de Conformidad'),
('Auditoría de Desempeño');
