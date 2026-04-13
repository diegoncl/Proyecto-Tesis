-- Esquema de base de datos para el proyecto tesis
-- Tablas corregidas para los módulos existentes y las claves primarias usadas por el backend

CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8;
USE `mydb`;

-- Tabla roles (ya definida en tu script original)
CREATE TABLE IF NOT EXISTS `roles` (
  `idroles` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(45) NULL,
  PRIMARY KEY (`idroles`)
) ENGINE=InnoDB;

-- Tabla usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idusuarios` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL,
  `roles_id` INT NOT NULL,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
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

-- Tabla planes_auditoria
CREATE TABLE IF NOT EXISTS `planes_auditoria` (
  `idplanes_auditoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NULL,
  `descripcion` TEXT NULL,
  `fecha_inicio` DATE NULL,
  `fecha_fin` DATE NULL,
  PRIMARY KEY (`idplanes_auditoria`)
) ENGINE=InnoDB;

-- Tabla proyectos
CREATE TABLE IF NOT EXISTS `proyectos` (
  `idproyectos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NULL,
  `descripcion` TEXT NULL,
  `fecha_inicio` DATE NULL,
  `fecha_fin` DATE NULL,
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
  `codigo` VARCHAR(45) NULL,
  `tipos_auditorias_id` INT NOT NULL,
  `fecha_programada` DATE NULL,
  `fecha_ejecucion` DATE NULL,
  `auditor_id` INT NULL,
  `estado` VARCHAR(1000) NULL,
  `puntuacion_total` VARCHAR(45) NULL,
  PRIMARY KEY (`idauditorias`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC),
  INDEX `fk_auditorias_tipos_auditorias1_idx` (`tipos_auditorias_id` ASC),
  CONSTRAINT `fk_auditorias_tipos_auditorias1`
    FOREIGN KEY (`tipos_auditorias_id`)
    REFERENCES `tipos_auditorias` (`idtipos_auditorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Tabla biblioteca_evidencias
CREATE TABLE IF NOT EXISTS `biblioteca_evidencias` (
  `idbiblioteca_evidencias` INT NOT NULL AUTO_INCREMENT,
  `nombre_archivo` VARCHAR(200) NULL,
  `ruta_almacenamiento` VARCHAR(500) NULL,
  `tipo` VARCHAR(100) NULL,
  `tamanio_bytes` BIGINT NULL,
  `subido_por` INT NULL,
  PRIMARY KEY (`idbiblioteca_evidencias`)
) ENGINE=InnoDB;

-- Tabla no_conformidades
CREATE TABLE IF NOT EXISTS `no_conformidades` (
  `idno_conformidades` INT NOT NULL AUTO_INCREMENT,
  `codigo` INT NULL,
  `auditoria_id` INT NOT NULL,
  `descripcion` VARCHAR(2000) NULL,
  `criticidad` VARCHAR(45) NULL,
  `responsable_id` INT NOT NULL,
  `fecha_limite` DATE NULL,
  `no_conformidadescol` VARCHAR(45) NULL,
  PRIMARY KEY (`idno_conformidades`),
  INDEX `fk_no_conformidades_auditorias_idx` (`auditoria_id`),
  INDEX `fk_no_conformidades_usuarios1_idx` (`responsable_id`),
  CONSTRAINT `fk_no_conformidades_auditorias`
    FOREIGN KEY (`auditoria_id`)
    REFERENCES `auditorias` (`idauditorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_no_conformidades_usuarios1`
    FOREIGN KEY (`responsable_id`)
    REFERENCES `usuarios` (`idusuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;
