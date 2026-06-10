
/*Cliente*/
insert into cliente values(100, 'Antonio', 'García Pérez','Astilleros, 3',default,'963689521','1960/08/15');
insert into cliente values(101,'Carlos','Pérez Ruiz','Magallanes, 21',default,'962485147','1958/04/26');
insert into cliente values(105,'Luis','Rodrígez Más','Juan de Mena, 11',default,'962965478','1961/03/30');
insert into cliente values(112,'Jaime','Juangrán Sornes','Balmes, 21',default,'963684596','1968/01/31');
insert into cliente values(225,'Alfonso','Prats Montolla','Séneca, 23',default,'963547852','1969/04/28');
insert into cliente values(260,'José','Navarro Lard','Río Segura, 14',default,'963874569','1964/04/15');
insert into cliente values(289,'Elisa','Ubeda Sansón','Valencia, 4',default,'963547812','1962/07/10');
insert into cliente values(352,'Eva','San Martín','Villafrancia, 34',default,'962401589','1965/08/12');
insert into cliente values(365,'Gerardo','Hernández Luis','Salinas, 8',default,'963589621','1965/01/02');
insert into cliente values(390,'Carlos','Parts Ruiz','Ercilla, 8',default,'963589654','1967/05/03');
insert into cliente values(810,'Lourdes','Oliver Peris','Gran Vía, 34',default,'963587412','1964/06/25');
insert into cliente values(822,'Sergio','Larred Navas','Blasco Ibáñez, 65',default,'963589621','1967/12/25');
insert into cliente values(860,'Joaquín','Arboles Onsins','Gandía, 8',default,'963758963','1969/05/04');

/*coches*/
insert into cochesVendidos values('V2360OX','Opel','Corsa 1.2 Sport','Azul',12600,'Antena eléctrica',100);
insert into cochesVendidos values('V1401PB','Ford','Probe 2.0 Sport','Azul',12600,null,101);
insert into cochesVendidos values('V4578OB','Ford','Orion 1.8 Ghia','Negro',15600,'Aire acondicionado',105);
insert into cochesVendidos values('V7640OU','Citroen','Xantia 16V','Negro',14880,'Airbag',225);
insert into cochesVendidos values('V7632NC','Ford','Escort 1.6 Ghia','Rojo',15000,null,260);
insert into cochesVendidos values('V7632NX','Citroen','Zx Turbo-D','Rojo',16800,'Aire acondicionado, Airbag',289);
insert into cochesVendidos values('V8018LJ','Ford','Fiesta 1.4 CLX','Azul',11700,'Elevalunas eléctricos',352);
insert into cochesVendidos values('V2565NB','Renault','Clio 1.7 S','Blanco',12600,null,390);
insert into cochesVendidos values('V7642OU','Ford','Mondeo 1.8 GLX','Blanco',18600,null,810);
insert into cochesVendidos values('V1234LC','Audi','100 2.3','Verde','21060','Climatizador',822);
insert into cochesVendidos values('V9834LH','Peugeot','205 GTI','Rojo',14700,null,860);

/*revisiones*/
insert into revisiones values(1,true,false,false,'Revisar luces','V7632NX');
insert into revisiones values(2,true,true,false,'Cambiar limpias','V7632NX');
insert into revisiones values(3,false,true,true,'Arreglar alarma','V4578OB');
insert into revisiones values(4,false,true,true,'Ajustar tablero','V2360OX');
insert into revisiones values(5,true, true, true,'Cambiar limpias, Revisar luces','V2565NB');
insert into revisiones values(6, false, false, true,'Cambiar luz interior','V7640OU');
insert into revisiones values(7,true, true, false, null, 'V2565NB');
insert into revisiones values(8,false,false,false,null,'V8018LJ');
insert into revisiones values(9,true,false,true,'Regular encendido','V7632NC');
insert into revisiones values(10,false,true,false,'Reparar puerta delantera','V8018LJ');
insert into revisiones values(11,false,false,false,null,'V7632NC');
insert into revisiones values(12,true,true,true,null,'V1234LC');
insert into revisiones values(13,false,true,false,'Cambiar limpias','V9834LH');
insert into revisiones values(14,false,true,false,null,'V1401PB');
