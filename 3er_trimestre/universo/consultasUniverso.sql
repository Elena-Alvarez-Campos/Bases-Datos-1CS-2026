/*Consultas generales que muestran las tablas completass*/
SELECT * FROM proveedores;
SELECT * FROM clientes;
SELECT * FROM ventas;
SELECT * FROM articulos;
SELECT * FROM articulosVentas;
/*Agrupamiento (MIN 5)*/

/*1. Cuenta cuantos clientes han venido a la tienda*/
SELECT COUNT(clientes.DNI) AS numClientes FROM clientes;
/*2.Cuantos artículos hay en el stock en total*/
SELECT SUM(articulos.stock) AS stockTotal FROM articulos;
/*3.Cuanto custan los artículos de media*/
SELECT AVG(articulos.precio) AS mediaPrecio FROM articulos;
/*4.Cuantos artículos de cada tipo hay (no cuenta el stock) Ej: Vende 3 tipos de camisetas independientemente del stocks*/
SELECT COUNT(articulos.tipo),articulos.tipo AS numArticulos FROM articulos group by articulos.tipo;
/*5.Cunto cuesta el stock total*/
SELECT SUM(articulos.precio*stock) AS precioStock FROM articulos;
/*NOTA: Sin el SUM daría cuanto cuesta el stock de cada artículo*/

/*Conexiones a varias tablas (MIN 5)*/

/*6.Fecha en la quie se hizo una venta junto con el nombre del cliente que la ejecutó y el tipo de artículo de la compara*/

SELECT ventas.fecha, clientes.nombreCliente, articulos.tipo FROM ventas
INNER JOIN articulosVentas
ON ventas.cod_venta=articulosVentas.cod_venta
INNER JOIN articulos
ON articulosVentas.cod_articulo=articulos.cod_articulo
INNER JOIN clientes
ON ventas.DNI=clientes.DNI;
/*7.Los códigos de los artículos vendidos junto a su tipo de prenda (si hay un artículo que no ha aparecido en ninguna venta, este no aparece)*/

SELECT articulos.cod_articulo AS código, articulos.tipo AS prenda from articulos
INNER JOIN articulosVentas
ON articulosVentas.cod_articulo=articulos.cod_articulo;
/*8.Nombre y DNI de las parsonas que han comprado el artículo 21*/

SELECT clientes.DNI, clientes.nombreCliente AS nombre FROM clientes 
INNER JOIN ventas
ON ventas.DNI=clientes.DNI
INNER JOIN articulosVentas
ON ventas.cod_venta=articulosVentas.cod_venta
WHERE cod_articulo=21;
/*9.El código del artículo, su tipo y el nombre de su proveedor de todas las camisetas del local*/

SELECT articulos.cod_articulo, articulos.tipo, proveedores.nombreProv FROM articulos 
INNER JOIN proveedores
ON proveedores.cod_proveedor=articulos.cod_proveedor
WHERE articulos.tipo='Camiseta';
/*10. código, tipo y precio de todos los artículos que valen más de 10€ que se han vendido*/

SELECT articulos.cod_articulo, articulos.tipo,articulos.precio FROM articulos 
INNER JOIN articulosVentas
ON articulosVentas.cod_articulo=articulos.cod_articulo WHERE precio>10;
/*.Las páginas web de */

/*Operadores y funciones lógicas*/
/*11.Sacar todos los datos de los proveedores cuyos nombres empiezan por a ordenados por el código de forma descendente*/

SELECT * FROM proveedores WHERE proveedores.nombreProv LIKE 'A%' order by proveedores.cod_proveedor DESC;
/*12.Toda la información de las camisetas cuyo stock es mayor a 26*/

SELECT * FROM articulos WHERE articulos.tipo='Camiseta' AND articulos.stock>26;
/*13.Toda la información de los clientes que viven en Gondomar o Ramayosa*/

SELECT * FROM clientes WHERE clientes.ciudad='Gondomar' OR clientes.ciudad='Ramallosa';

/*fechas*/

/*14.Todos los datos sobre las ventas que se hicieron en 2025*/
SELECT * FROM ventas where YEAR(ventas.fecha)=2025;
/*15.Todos los datos sobre las ventas que se hicieron hace más de 3 meses*/
SELECT * FROM ventas WHERE (YEAR(current_date())>YEAR(ventas.fecha)) OR ((YEAR(current_date())=YEAR(ventas.fecha)) AND (MONTH(current_date()-3)>MONTH(ventas.fecha)));
/*16.Todos los datos sobre las ventas que se hicieron en abril de este año*/
SELECT * FROM ventas WHERE ((YEAR(current_date())=YEAR(ventas.fecha)) AND MONTH(ventas.fecha)=4);


