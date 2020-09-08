DROP DATABASE delilahdb;

CREATE DATABASE IF NOT EXISTS delilahdb;

USE delilahdb;

CREATE TABLE producto(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	descripcion VARCHAR(1000) NOT NULL,
	precio FLOAT NOT NULL,
	imagen VARCHAR(1000) 
);

CREATE TABLE usuario(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(1000) NOT NULL,
	apellido VARCHAR(1000) NOT NULL,
	email VARCHAR(1000) NOT NULL,
	telefono VARCHAR(1000) NOT NULL,
	direccion VARCHAR(1000) NOT NULL,
	user VARCHAR(1000) NOT NULL,
	password VARCHAR(1000) NOT NULL,
	admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE forma_pago(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	descripcion VARCHAR(1000) NOT NULL 
);

CREATE TABLE estado_pedido(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	descripcion_estado_admin VARCHAR(1000) NOT NULL,
	descripcion_estado_cliente VARCHAR(1000) 
);

CREATE TABLE favoritos(
	id_usuario INT(11) NOT NULL,
	id_producto INT(11) NOT NULL,
	PRIMARY KEY (id_usuario, id_producto),
	FOREIGN KEY (id_producto) REFERENCES producto(id),
	FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE pedido(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_usuario INT(11) NOT NULL,
	id_estado INT(11) NOT NULL,
	id_forma_pago INT(11) NOT NULL,
	fecha DATETIME,
	FOREIGN KEY (id_usuario) REFERENCES usuario(id),
	FOREIGN KEY (id_estado) REFERENCES estado_pedido(id),
	FOREIGN KEY (id_forma_pago) REFERENCES forma_pago(id)	
);

CREATE TABLE detalle_pedido(
	id_pedido INT(11) NOT NULL,
	id_producto INT(11) NOT NULL,
	cantidad INT(11) NOT NULL,
	PRIMARY KEY (id_pedido, id_producto),
	FOREIGN KEY (id_pedido) REFERENCES pedido(id),
	FOREIGN KEY (id_producto) REFERENCES producto(id)
);

INSERT INTO producto (id, descripcion, precio, imagen) VALUES (NULL, "Pizza", 300, "imagen 1");
INSERT INTO producto (id, descripcion, precio, imagen) VALUES (NULL, "Hamburguesa", 350, "imagen 2");
INSERT INTO producto (id, descripcion, precio, imagen) VALUES (NULL, "Lomito", 400.5, "imagen 3");
INSERT INTO producto (id, descripcion, precio, imagen) VALUES (NULL, "Coca", 150, "imagen 4");

INSERT INTO usuario (id, nombre, apellido, email, telefono, direccion, USER, PASSWORD, admin) 
VALUES (1, "admin", "admin", "admin@delilah.com", "111", "admin", "admin", "admin", TRUE);

INSERT INTO usuario (id, nombre, apellido, email, telefono, direccion, USER, PASSWORD) 
VALUES (NULL, "Ricardo", "Ruben", "rf@hotmail.com", "1467", "Miami 123", "ricardo", "123");

INSERT INTO usuario (id, nombre, apellido, email, telefono, direccion, USER, PASSWORD) 
VALUES (NULL, "Pedro", "Perez", "lm@hotmail.com", "52345", "Barza 312", "pedro", "321");

INSERT INTO usuario (id, nombre, apellido, email, telefono, direccion, USER, PASSWORD) 
VALUES (NULL, "Roberto", "Gomez", "rg@hotmail.com", "3211233331231", "Chacabuco 4234", "gomez", "111");

insert into forma_pago (id, descripcion) VALUES (NULL, 'Efectivo');
insert into forma_pago (id, descripcion) VALUES (NULL, 'Tarjeta de Credito');
insert into forma_pago (id, descripcion) VALUES (NULL, 'Tarjeta de Debito');

INSERT INTO estado_pedido (id, descripcion_estado_admin, descripcion_estado_cliente) 
VALUES(NULL, 'NUEVO', NULL);
INSERT INTO estado_pedido (id, descripcion_estado_admin, descripcion_estado_cliente) 
VALUES(NULL, 'CONFIRMADO', 'CONFIRMADO');
INSERT INTO estado_pedido (id, descripcion_estado_admin, descripcion_estado_cliente) 
VALUES(NULL, 'PREPARANDO', 'EN PREPARACION');
INSERT INTO estado_pedido (id, descripcion_estado_admin, descripcion_estado_cliente) 
VALUES(NULL, 'ENVIANDO', 'EN CAMINO');
INSERT INTO estado_pedido (id, descripcion_estado_admin, descripcion_estado_cliente) 
VALUES(NULL, 'CANCELADO', NULL);
INSERT INTO estado_pedido (id, descripcion_estado_admin, descripcion_estado_cliente) 
VALUES(NULL, 'ENTREGADO', 'ENTREGADO');