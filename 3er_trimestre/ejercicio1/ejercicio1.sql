
CREATE TABLE proveedores(
	cod_preoveedor char(5),
    nombre_proveedor varchar(25),
    domicilio varchar(25),
    pais_procedencia varchar(15),
    sucursal_espana boolean,
    primary key(cod_preoveedor)
);


CREATE TABLE productos(
	cod_entrada int,
    nombre_producto varchar(25),
    cantidades int,
    precio decimal(2,2),
    fecha_entrada date,
    proveedor char(5),
    primary key(cod_entrada),
    foreign key(proveedor) references proveedores(cod_preoveedor)
);

