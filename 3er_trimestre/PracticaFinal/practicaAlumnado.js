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
            imprimir+= (results.indexOf(cada_alumno)+1)+". "+cada_alumno.nombre+"\n"
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
        
        let anoDado=await rl.question("Escribe el año de nacimiento del alumno\n")
        if(isNaN(anoDado)||anoDado.trim().length!=4||anoDado>DateTime.now().year){//no pudo haber nacido e el futuro
             throw new Error("El año no es compatible")
        }
        let mesDado=await rl.question("Escribe el mes de nacimiento del alumno\n")
        if(isNaN(mesDado)||mesDado>12||mesDado<=0){
             throw new Error("El mes no es compatible")
        }
        let diaDado=await rl.question("Escribe el día de nacimiento del alumno\n")
        if(isNaN(diaDado)||diaDado>31||diaDado<=0){
             throw new Error("El día no es compatible")
        }
        let fechaDada=DateTime.fromObject({year: anoDado, month: mesDado, day:diaDado}).toISO()
        if((fechaDada.isValid)==false){
            throw new Error("La fecha no es compatible")
        }
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
        //Comprobación datos
        let pregutaConfirmacion=("Comprueba que los datos son correctos: \n"+
            "Nombre: "+nombreDado+"\n"+
            "Apellidos: "+apellidoDado1+" "+apellidoDado2+"\n"+
            "Fecha de nacimiento: "+DateTime.fromISO(fechaDada).toFormat("dd-MM-yyyy")+"\n"+
            "Especielidad: "+especialidadDada+"\n"+
            "Curso: "+cursoDado+"º"+"\n")
        pagoDado==true ? pregutaConfirmacion+="Pagado: si" : pregutaConfirmacion+="Pagado: no"
        pregutaConfirmacion+="\n¿Son los datos correctos? (s/n): "
        let confirmacion= await rl.question(pregutaConfirmacion)
        confirmacion=confirmacion.trim().toLowerCase()
        if(confirmacion=="n"){
            throw new Error("Datos erróneos, volviendo al menú de inicio");
        }else if(confirmacion!="s" && confirmacion!="n"){
            throw new Error("Valor incompatible");
            
        }
        //Insertar alumnos
        var query = con.query('INSERT INTO alumnos(DNI, nombre, apellido1, apellido2, f_nacimiento, especialidad, curso, pagado) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [DNIdado,nombreDado,apellidoDado1,apellidoDado2,fechaDada,especialidadDada,cursoDado,pagoDado], function(error, result){
    });
    } catch (error) {
        console.error(error.message)
    }
    finally{
        MenuPrincipal()
    }
    
}
async function borrarAlumno(){
    try {
        muestratodo()
        let respuesta=await rl.question("Elige un alumno para borrar de la lista\n")
        if(respuesta)
        let opcion=parseInt(respuesta)
        
    } catch (error) {
        
    } finally{
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
                    borrarAlumno()
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