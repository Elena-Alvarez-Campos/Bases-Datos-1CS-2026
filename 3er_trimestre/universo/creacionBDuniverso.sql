CREATE DATABASE tiendaRopa;
USE tiendaRopa;

CREATE TABLE proveedores(
	cod_proveedor int,
    nombreProv varchar(15),
    tlfn int,
    paginaWeb text,
    primary key (cod_proveedor)
);
CREATE TABLE clientes(
	DNI char(9),
    nombreCliente varchar(15),
    calle varchar(10),
    num int,
    cod_postal int,
    ciudad varchar(10),
    primary key (DNI)
);
CREATE TABLE ventas(
	cod_venta int,
    fecha date,
    DNI char(9),
    primary key (cod_venta),
    foreign key(DNI) references clientes(DNI)
);

CREATE TABLE articulos(
	cod_articulo int,
    tipo varchar(15),
    precio double(5,2),
    stock int,
    cod_proveedor int,
    primary key (cod_articulo),
    foreign key (cod_proveedor) references proveedores(cod_proveedor)
);
CREATE TABLE articulosVentas(
	cod_articulo int,
    cod_venta int,
    foreign key (cod_articulo) references articulos(cod_articulo),
    foreign key (cod_venta) references ventas(cod_venta)
);