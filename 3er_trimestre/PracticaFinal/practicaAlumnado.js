//readline
const readline=require('node:readline/promises')
const {stdin:input, stdout:output}=require('node:process')
const {error}=require('node:console');
const rl=readline.createInterface({input,output});
//luxon
const { DateTime, Interval } = require("luxon");
let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "AlumnadoBBDD"
});

con.connect(function(err) {
  if (err) throw err;
  //console.log("Connected!");  
});
function muestratodo() {
    let imprimir="Lista de alumnos:\n"
    con.query('SELECT * FROM alumnos', (err, results) => {
        for(let cada_alumno of results){
            imprimir+=cada_alumno.nombre+"\n"
        }
        console.log(imprimir)
        if (err) {
            console.error('Error executing query: ' + err.stack);
        }
    });
}
async function insertarAlumno(){
    try {
        //Pregunta DNI
        let DNIdado=await rl.question("Escribe el DNI del alumno:\n")
        if (DNIdado.length!=8) {
            throw new Error("El DNI no es compatible, tiene que tener 8 caracteres");
        }
        //Pregunta nombre
        let nombreDado=await rl.question("Escribe el nombre del alumno(máx: 10 caracteres):\n")
        nombreDado=nombreDado.trim()
        if(nombreDado.length>10 || nombreDado.length<=0){
            throw new Error("El nombre no puede estar en blanco o ser más largo de 10 caracteres")
        }
        //Pregunta apellido1
        let apellidoDado1=await rl.question("Escribe el primer apellido del alumno (máx: 10 caracteres):\n")
        apellidoDado1=apellidoDado1.trim()
        if(apellidoDado1.length>10 || apellidoDado1.length<=0){
            throw new Error("El apellido no puede estar en blanco o ser más largo de 10 caracteres")
        }
        //Pregunta apellido2
        let apellidoDado2=await rl.question("Escribe el segundo apellido del alumno (máx: 10 caracteres):\n")
        apellidoDado2=apellidoDado2.trim()
        if(apellidoDado2.length>10 || apellidoDado2.length<=0){
            throw new Error("El apellido no puede estar en blanco o ser más largo de 10 caracteres")
        }
        //Pregunta fecha nacimiento!!!!!
        /*
        let fechaDada=await rl.question("Escribe la fecha de nacimiento del alumno (día/mes/año):\n")
        fechaDada=fechaDada.trim()
        if(fechaDada.length>20 || fechaDada.length<=0){
            throw new Error("El apellido no puede estar en blanco o ser más largo de 10 caracteres")
        }*/
        let fechaDada=DateTime.fromObject({year: 2000, month: 5, day:25}).toISO()
        //Pregunta especialidad
        let especialidadDada= await rl.question("¿Que especialidad va a cursar?\n"+
            "1.DAM\n"+
            "2.DAW\n"
        )
        if(isNaN(especialidadDada)){
            throw new Error("No se ha escrito una opción compatible");
        }
        let opcionEspecialidad=parseInt(especialidadDada)
        switch (opcionEspecialidad) {
            case 1:
                especialidadDada="DAM"
                break;
            case 2:
                especialidadDada="DAW"
                break;
            default:
                throw new Error("No se ha escrito una opción compatible");
                break;
        }
        //Pregunta curso
        let cursoDadoString= await rl.question("¿Que especialidad va a cursar?\n"+
            "1.Primero 1º\n"+
            "2.Segundo 2º\n"
        )
        if(isNaN(cursoDadoString) || (cursoDadoString!=1 && cursoDadoString!=2)){
            throw new Error("No se ha escrito una opción compatible");
        }
        let cursoDado=parseInt(cursoDadoString)
        //Pregunta pago
        let pagoDadoString= await rl.question("¿Es un curso pagado? (s/n)\n")
        pagoDadoString.toLowerCase()
        let pagoDado=true
        switch (pagoDadoString) {
            case "s":
                pagoDado=true
                break;
            case "n":
                pagoDado=false
                break;
            default:
                throw new Error("No se ha escrito una opción compatible");
                break;
        }
        //Insertar alumno
        var query = con.query('INSERT INTO alumnos(DNI, nombre, apellido1, apellido2, f_nacimiento, especialidad, curso, pagado) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [DNIdado,nombreDado,apellidoDado1,apellidoDado2,fechaDada,especialidadDada,cursoDado,pagoDado], function(error, result){
        if(error){
            throw error;
        }else{
            console.log("Se ha añadido correctamente");
        }
    });
    } catch (error) {
        console.error(error.message)
    }
    finally{
        MenuPrincipal()
    }
    
}


//export default connect;


//Menú principal

async function MenuPrincipal() {
    let programa=true//se va a ejecutar mientras sea true, solo cambia de estado al salir
    while (programa==true) {
        
        try {/*
            setTimeout(() => console.log("Menú principal***********************\n"+
                "Elige una opción:\n"+
                "1.Insertar alumno\n"+
                "2.Borrar alumno\n"+
                "3.Editar alumno\n"+
                "4.Listar alumno\n"+
                "5.Buscar\n"+
                "6.Salir"), 10);
            let respuesta=await rl.question("")*/
            
            let respuesta=await rl.question("Menú principal***********************\n"+
                "Elige una opción:\n"+
                "1.Insertar alumno\n"+
                "2.Borrar alumno\n"+
                "3.Editar alumno\n"+
                "4.Listar alumno\n"+
                "5.Buscar\n"+
                "6.Salir\n"
            )
            
            if(isNaN(respuesta)){
                throw new Error("Opicón incorrecta, escribe un número");
            }
            let opcion=parseInt(respuesta)
            switch (opcion) {
                case 1:
                    insertarAlumno()
                    break;
                case 2:
                    
                    break;
                case 3:
                    
                    break;
                case 4:
                    muestratodo()
                    break;
                case 5:
                    
                    break;
                case 6:
                    programa=false;
                    break;
                default:
                    throw new Error("Opción incorrecta, escribe un número del 1-6");
                    break;
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    rl.close()
    con.end()
}
MenuPrincipal()