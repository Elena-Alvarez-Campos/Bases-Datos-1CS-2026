
CREATE SCHEMA concesionarioBD;
USE concesionarioBD;

CREATE TABLE cliente(
	codcliente int,
    nombre varchar(15),
    apellidos varchar(30),
    direccion varchar(30),
    provincia varchar(30) DEFAULT 'Valencia',
    telefono char(9),
    nacimiento date,
    primary key (codcliente)
);
CREATE TABLE cochesVendidos(
	matricula char(7),
    marca varchar(15),
    modelo varchar(20),
    color varchar(15) check(color='Rojo' or color='Blanco' or color='Negro' or color='Azul' or color='Verde'),
    precio decimal(9,3),
    extras text,
    codcliente int,
    foreign key (codcliente) references cliente(codcliente),
    primary key (matricula)
);
CREATE TABLE revisiones(
	numrevision int auto_increment,
    cambioaceite boolean,
    cambiofiltro boolean,
    revisionfrenos boolean,
    otros text,
    matricula char(7),
    foreign key (matricula) references cochesVendidos(matricula),
    primary key (numrevision)
);