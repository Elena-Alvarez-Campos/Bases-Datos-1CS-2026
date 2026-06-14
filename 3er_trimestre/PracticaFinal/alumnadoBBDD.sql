
CREATE DATABASE AlumnadoBBDD;
USE AlumnadoBBDD;
CREATE TABLE alumnos(
	DNI char(9),
	nombre varchar(10),
    apellido1 varchar(10),
    apellido2 varchar(10),
    f_nacimiento date,
    especialidad char(3),
    curso int,
    pagado boolean,
    primary key(DNI)
);


insert into alumnos values('12457836A','Pepe','Rios','Campos','2000/05/25','DAM',1,true);
insert into alumnos values('96857410B','Ana','Cameselle','Álvarez','2001/04/21','DAW',2,false);

SELECT * from alumnos;