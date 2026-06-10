USE tiendaRopa;
/*proveedores*/
/*
insert into proveedores values(1,'Marble Lily',986456789,'www.marblelily.com');
insert into proveedores values(2,'April Bombom',987654321,'www.aprilbombom.com');
insert into proveedores values(3,'Chorale',986745123,'www.Chorale.com');
insert into proveedores values(4,'AZUSA',986123456,'www.azusa.com');
insert into proveedores values(5,'Enid Chien',986741523,'www.enidchien.com');
*/
insert into proveedores values(6,'Soy',976852140,'www.soy.com');
insert into proveedores values(7,'Streetflow',980451062,'www.streetflow.com');
insert into proveedores values(8,'Raven Candle',9640138020,'www.ravencandle.com');
insert into proveedores values(9,'Stage Dive',964032255,'www.stagedive.com');
insert into proveedores values(10,'BasicU',999888777,'www.basicu.com');
insert into proveedores values(11,'Ariadnna',911552660,'www.ariadnna.com');

/*clientes*/
/*
insert into clientes values('12345678A','An','Muros',3,3265,'Gondomar');
insert into clientes values('98765432B','Marina','Aragón',6,3145,'Vigo');
insert into clientes values('74185220C','Pepe','Santiago',12,3894,'Santiago');
insert into clientes values('96385201D','Ena','Calleado',9,3458,'Ramallosa');
insert into clientes values('45623183E','Marco','Ruísima',3,535,'Pontevedra');*/
insert into clientes values('64512398F','Lucía','Calleado',11,3458,'Ramallosa');
insert into clientes values('44552268G','Paco','Sitio',9,3457,'Ramallosa');
insert into clientes values('11660532H','Alex','Muros',4,3265,'Gondomar');
insert into clientes values('56652380I','Antía','Berjas',3,3266,'Gondomar');
insert into clientes values('56203148J','Manuel','Teis',6,3150,'Vigo');
insert into clientes values('45263158K','Perico','Aragón',10,3145,'Vigo');
/*ventas*/
/*
insert into ventas values(101,'2026/04/15','12345678A');
insert into ventas values(102,'2025/04/21','74185220C');
insert into ventas values(123,'1926/08/09','45623183E');
insert into ventas values(114,'2026/11/05','96385201D');
insert into ventas values(105,'2025/10/11','98765432B');*/
insert into ventas values(193,'2026/05/15','64512398F');
insert into ventas values(139,'2026/04/21','56652380I');
insert into ventas values(120,'2026/03/03','56652380I');
insert into ventas values(122,'2026/02/09','45263158K');
insert into ventas values(110,'2026/04/25','11660532H');
/*artículos*/
/*
insert into articulos values(11,'Falda',10.50,14,2);
insert into articulos values(21,'Camiseta',9.99,25,3);
insert into articulos values(23,'Pantalón',20,17,5);
insert into articulos values(14,'Calcetines',3.50,10,4);
insert into articulos values(25,'Camisetas',12.99,28,1);*/
insert into articulos values(39,'Camiseta',13.99,9,4);
insert into articulos values(26,'Bolso',60,5,11);
insert into articulos values(10,'Vestido',39.39,23,7);
insert into articulos values(30,'Pantalón',20.50,39,3);
insert into articulos values(22,'Falda',9.99,15,2);
insert into articulos values(13,'Bolso',30.50,10,7);
insert into articulos values(15,'Chaqueta',40,5,3);
/*artículosVentas*/
/*
insert into articulosVentas values(11,102);
insert into articulosVentas values(21,123);
insert into articulosVentas values(21,101);
insert into articulosVentas values(14,114);
insert into articulosVentas values(23,102);*/
insert into articulosVentas values(39,193);
insert into articulosVentas values(15,139);
insert into articulosVentas values(39,120);
insert into articulosVentas values(21,122);
insert into articulosVentas values(22,193);
insert into articulosVentas values(13,139);
insert into articulosVentas values(30,120);
insert into articulosVentas values(26,110);

/*Eliminar el contenido del las tablas*/
/*
DELETE FROM proveedores WHERE cod_proveedor;
DELETE FROM clientes WHERE DNI;
DELETE FROM ventas WHERE cod_venta;
DELETE FROM articulos WHERE cod_articulo;
DELETE FROM articulosVentas WHERE cod_articulo*/
/*Actualizar  datos*/
/*
UPDATE proveedores 
SET paginaWeb='www.chorale.com'
WHERE cod_proveedor=3;
/*
UPDATE ventas 
SET fecha='2026/08/09'
WHERE cod_venta=123;

UPDATE articulos 
SET tipo='Camiseta'
WHERE cod_articulo=25;
*/