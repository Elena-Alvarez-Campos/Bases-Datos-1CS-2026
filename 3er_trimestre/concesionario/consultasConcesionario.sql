/*HOJA 1*/
/*1*/
select cochesVendidos.matricula,cochesVendidos.marca,cochesvendidos.modelo FROM cochesVendidos;
/*2*/
select * from cochesVendidos where marca='Ford';
/*3*/
select * from cochesVendidos where marca='Ford' AND precio>15600;
/*4*/
select cochesVendidos.codcliente from cochesVendidos where marca='Ford' OR marca='Citroen';
/*5*/
select cochesVendidos.matricula,cochesVendidos.modelo from cochesVendidos WHERE matricula IN (select revisiones.matricula AS cohesRev FROM revisiones where cambiofiltro=true AND cambioaceite=true); 
/*6*/
select cliente.nombre,cliente.apellidos FROM cliente where codcliente IN(select cochesVendidos.codcliente FROM cochesVendidos WHERE marca='Ford' AND extras IS NOT NULL);
/*7*/
SELECT  cochesVendidos.marca, cochesVendidos.modelo FROM cochesVendidos INNER JOIN revisiones ON cochesVendidos.matricula=revisiones.matricula WHERE cambioaceite=true AND cambiofiltro=true AND revisionfrenos=true;
/*8*/
SELECT  cochesVendidos.marca, cochesVendidos.modelo FROM cochesVendidos INNER JOIN revisiones ON cochesVendidos.matricula=revisiones.matricula WHERE cambioaceite=true AND revisionfrenos=FALSE;
/*9/
SELECT  cochesVendidos.marca, cochesVendidos.modelo FROM cochesVendidos INNER JOIN revisiones ON cochesVendidos.matricula=revisiones.matricula WHERE cambioaceite=FALSE AND cambiofiltro=FALSE AND revisionfrenos=FALSE;
/*10*/
SELECT COUNT(cochesVendidos.matricula) FROM cochesVendidos INNER JOIN revisiones ON revisiones.matricula=cochesVendidos.matricula WHERE revisiones.cambioaceite=true;
/*11*/
SELECT COUNT(cochesVendidos.matricula) FROM cochesVendidos INNER JOIN revisiones ON revisiones.matricula=cochesVendidos.matricula WHERE revisiones.revisionfrenos=false;
/*12*/
SELECT revisiones.matricula FROM revisiones WHERE otros LIKE '%Cambiar limpias%';
/*13*/
SELECT cochesVendidos.marca ,MAX(cochesVendidos.precio) from cochesVendidos group by cochesVendidos.marca;
/*14*/
SELECT COUNT(cochesVendidos.codcliente) FROM cochesVendidos WHERE color='Rojo';
/*15*/
SELECT cliente.nombre, cochesVendidos.marca, revisiones.numrevision FROM cliente INNER JOIN cochesVendidos ON cliente.codcliente=cochesVendidos.codcliente
	INNER JOIN revisiones ON revisiones.matricula=cochesVendidos.matricula WHERE cochesVendidos.matricula='V4578OB';

/*HOJA 2*/
/*1*/
select * from cliente;
/*2*/
select * from cochesVendidos;
/*3*/
select * from revisiones;
/*4*/
SELECT cliente.nombre, cliente.apellidos, cliente.nacimiento FROM cliente;
/*5*/
SELECT cliente.nombre, cliente.apellidos, cliente.nacimiento FROM cliente order by nombre;
/*6*/
SELECT cliente.nombre, cliente.apellidos, cliente.nacimiento FROM cliente order by nombre ASC;
/*7*/
SELECT * FROM cochesVendidos where marca!= 'Ford';
/*8*/
SELECT * FROM cochesVendidos where precio>15000;
/*9*/
SELECT * FROM cochesVendidos where precio>15000 order by precio ASC;
/*10*/
SELECT * FROM cochesVendidos ORDER BY precio DESC LIMIT 0,2;
/*11*/
SELECT * FROM cochesVendidos where color='Rojo' ORDER BY precio DESC LIMIT 0,2;
/*12*/
SELECT * FROM cochesVendidos WHERE precio BETWEEN 15000 AND 18000 ORDER BY precio ASC;
/*13*/
SELECT * FROM cochesVendidos WHERE color='Rojo' OR color='Blanco' ORDER BY color;
/*14*/
SELECT * FROM cochesVendidos WHERE color!='Negro';
/*15*/
SELECT * FROM cochesVendidos where (color='Rojo' OR color='Blanco') AND precio>12000;
/*16*/
SELECT * FROM cochesVendidos where extras IS NOT NULL;
/*17*/
SELECT * FROM cliente where nacimiento>'1964/06/25';
/*18*/
SELECT * FROM cliente where apellidos LIKE 'a%' ORDER BY apellidos ASC;
/*19*/
SELECT revisiones.numrevision FROM revisiones where otros IS NULL;
/*20*/
SELECT COUNT(cliente.codcliente) FROM cliente;
/*21 No funciona bien*/
SELECT *,COUNT(cliente.codcliente) FROM cliente;
/*22*/
SELECT SUM(precio) FROM cochesVendidos;
/*23*/
SELECT cliente.codcliente,cochesVendidos.matricula FROM cliente INNER JOIN cochesVendidos ON cliente.codcliente=cochesVendidos.codcliente;
/*24*/
SELECT cochesVendidos.marca ,COUNT(cochesVendidos.matricula) from cochesVendidos group by cochesVendidos.marca;
/*25*/
SELECT cochesVendidos.codcliente,cochesVendidos.matricula FROM cochesVendidos INNER JOIN revisiones ON revisiones.matricula=cochesVendidos.matricula;
/*26*/
SELECT revisiones.matricula FROM revisiones WHERE cambioaceite=true;
/*27*/
SELECT cochesVendidos.marca,cochesVendidos.modelo FROM cochesVendidos INNER JOIN revisiones ON revisiones.matricula=cochesVendidos.matricula WHERE cambioaceite=true;
/*28*/
SELECT cochesVendidos.marca,cochesVendidos.modelo FROM cochesVendidos INNER JOIN revisiones ON revisiones.matricula=cochesVendidos.matricula WHERE cambioaceite=true AND cambiofiltro=FALSE AND revisionfrenos=FALSE AND otros IS NOT NULL;
/*29*/
SELECT cochesVendidos.codcliente,cochesVendidos.matricula FROM cochesVendidos INNER JOIN revisiones ON revisiones.matricula=cochesVendidos.matricula;
/*30*/
SELECT revisiones.matricula, COUNT(revisiones.matricula) FROM revisiones GROUP BY revisiones.matricula;
/*31*/
SELECT cochesVendidos.matricula FROM cochesVendidos WHERE matricula LIKE '%NX';
/*32*/
SELECT revisiones.matricula FROM revisiones WHERE (cambioaceite=true OR cambiofiltro=true) AND otros IS NOT NULL;
/*33*/
SELECT cliente.nombre, cliente.apellidos, cochesVendidos.matricula, cochesVendidos.marca, cochesVendidos.modelo, revisiones.cambioaceite, revisiones.cambioaceite, revisiones.cambiofiltro, revisiones.revisionfrenos, revisiones.otros
	FROM cliente INNER JOIN cochesVendidos ON cliente.codcliente=cochesVendidos.codcliente
    INNER JOIN revisiones ON cochesVendidos.matricula=revisiones.matricula;
/*34*/
SELECT cochesVendidos.marca, COUNT(cochesVendidos.modelo) FROM cochesVendidos group by marca;
/*35*/
SELECT COUNT(cochesVendidos.matricula) FROM cochesVendidos WHERE marca='Ford' AND color='Blanco';
/*36*/
SELECT COUNT(cliente.codcliente) FROM cliente WHERE nacimiento<'1976/00/00';
/*37*/
SELECT cliente.codcliente FROM cliente WHERE nacimiento=(select MIN(cliente.nacimiento) FROM cliente);
/*38*/
SELECT * From cliente WHERE nacimiento=(select MIN(cliente.nacimiento) FROM cliente);
/*39*/
SELECT COUNT(matricula) FROM cochesVendidos WHERE color='Azul' AND extras IS NOT NULL;
/*40*/
SELECT * FROM cochesVendidos WHERE extras IS NULL;
