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
    con.query('SELECT * FROM alumnos', async(err, results) => {
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
        if (DNIdado.length!=9) {
            throw new Error("El DNI no es compatible, tiene que tener 9 caracteres");
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
            "Fecha de nacimiento: "+DateTime.fromISO(fechaDada).toFormat("dd/MM/yyyy")+"\n"+
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
        if(isNaN(respuesta)||respuesta<0){
            throw new Error("No es un valor compatible");
        }
        let opcion=parseInt(respuesta)-1
        let confirmacion= await rl.question("¿Seguro que quieres borrar al alumno "+(opcion+1)+"? (s/n): ")
            confirmacion=confirmacion.trim().toLowerCase()
            if(confirmacion=="n"){
                throw new Error("Se ha cancelado la operación");
            }else if(confirmacion!="s" && confirmacion!="n"){
                throw new Error("No es un valor compatible");
            
            }
        con.query('SELECT * FROM alumnos', (err, results) => {
            if(opcion>results.length){
                throw new Error("El alumno no existe");
            }
            
            let sql="DELETE FROM alumnos WHERE DNI = '"+results[opcion].DNI+"'"
            con.query(sql,function (err,result){
                console.log("Se ha eliminado al alumno "+(opcion+1))
            })
        });

    } catch (error) {
        console.error(error.message)
    } finally{
        MenuPrincipal()
    }
}

async function editarAlumno(){
    try {
        muestratodo()
        let respuesta=await rl.question("Elige un alumno para editar\n")
        if(isNaN(respuesta)||respuesta<0){
            throw new Error("No es un valor compatible");
        }
        let opcion=parseInt(respuesta)-1
        let confirmacion= await rl.question("¿Seguro que quieres modificar al alumno "+(opcion+1)+"? (s/n): ")
            confirmacion=confirmacion.trim().toLowerCase()
            if(confirmacion=="n"){
                throw new Error("Se ha cancelado la operación");
            }else if(confirmacion!="s" && confirmacion!="n"){
                throw new Error("No es un valor compatible");
            
            }
        let respuestaCampo=await rl.question("¿Que campo quieres cambiar?\n"+
            "1.Nombre\n"+"2.Primer apellido\n"+"3.Segundo apellido\n"+"4.Fecha de nacimiento\n"+"5.Especialidad\n"+"6.Curso\n"+"7.Si es pagado o no\n"+"8.DNI\n"
        )
        if(isNaN(respuestaCampo)){
            throw new Error("No es un valor compatible");
        }
        let opcionCampo=parseInt(respuestaCampo)
        let campo=""//el campo que se quiere modificar
        switch (opcionCampo) {
            case 1:
                campo="nombre"
                break;
            case 2:
                campo="apellido1"
                break;
            case 3:
                campo="apellido2"
                break;
            case 4:
                campo="f_nacimiento"
                break;
            case 5:
                campo="especialidad"
                break;
            case 6:
                campo="curso"
                break;
            case 7:
                campo="pagado"
                break;
            case 8:
                campo="DNI"
                break;
            default:
                throw new Error("No es un valor compatible");
                
                break;
        }
        let nuevoDato=await rl.question("¿Cual va a ser el nuevo dato?\n")
        con.query('SELECT * FROM alumnos', (err, results) => {
            if(opcion>results.length){
                throw new Error("El alumno no existe");
            }
            let sql="UPDATE alumnos SET "+campo+"="
            if(campo!="pagado" && campo!="curso"){//estos dos campos son los únicos que no son strings
                sql+="'"+nuevoDato+"' WHERE DNI = '"+results[opcion].DNI+"'"
            }else{
                sql+=nuevoDato+" WHERE DNI = '"+results[opcion].DNI+"'"
            }
            
            //sql+=+1+" WHERE DNI = '"+results[opcion].DNI+"'"
            con.query(sql,function(err,result){
                console.log("Se ha modificado el alumno "+(opcion+1))
            })

        });

    } catch (error) {
        console.error(error.message)
    } finally{
        MenuPrincipal()
    }
}
async function buscar(){
    let programa=true
    while (programa==true) {
        try {
        let respuesta=await rl.question("¿Que filtro quieres aplicar?\n"+
            "1.DNI\n"+
            "2.Especialidad\n"+
            "3.Curso\n"+
            "4.Salir\n"
        )
        if(isNaN(respuesta)||respuesta<=0||respuesta>=5){
            throw new Error("No es una opción comatible");
        }
        let opcion=parseInt(respuesta)
        switch (opcion) {
            case 1://DNI
                let DNIBuscar=await rl.question("Escribe el DNI del alumno que quieres buscar\n")
                if(DNIBuscar.length!=9){
                    throw new Error("No es un valor compatible");
                }
                con.query("SELECT * FROM alumnos WHERE DNI = '"+DNIBuscar+"'", function (err, result) {
                    if (err) throw err;
                    let imprimir="DNI: "+result[0].DNI+"\n"+
                        "Nombre: "+result[0].nombre+"\n"+
                        "Apellidos: "+result[0].apellido1+" "+result[0].apellido2+"\n"+
                        "Fecha de nacimiento: "+DateTime.fromISO(result[0].f_nacimiento).toFormat("dd/MM/yyyy")+"\n"+
                        "Especielidad: "+result[0].especialidad+"\n"+
                        "Curso: "+result[0].curso+"º"+"\n";
                    result[0].pagado==true ? imprimir+="Pagado: si" : imprimir+="Pagado: no"
                    imprimir+="\n"
                    console.log(imprimir)
                    
                });
                let continuar=await rl .question("Pulsa la tecla Enter para continuar\n")
                break;
            case 2://Especialidad
                let respuestaEsp=await rl.question("¿Por qué especialidad quieres filtrar?\n1.DAM\n2.DAW\n")
                if(isNaN(respuestaEsp)){throw new Error("No es un valor compatible")}
                let opcionESP=parseInt(respuestaEsp)
                switch (opcionESP) {
                    case 1://DAM
                        con.query("SELECT * FROM alumnos WHERE especialidad = 'DAM'", function (err, result) {
                        if (err) throw err;
                        let imprimir=""
                        for(let cada_alumno of result){
                            imprimir+="\nDNI: "+cada_alumno.DNI+"\n"+
                                "Nombre: "+cada_alumno.nombre+"\n"+
                                "Apellidos: "+cada_alumno.apellido1+" "+cada_alumno.apellido2+"\n"+
                                "Fecha de nacimiento: "+DateTime.fromISO(cada_alumno.f_nacimiento).toFormat("dd/MM/yyyy")+"\n"+
                                "Especielidad: "+cada_alumno.especialidad+"\n"+
                                "Curso: "+cada_alumno.curso+"º"+"\n";
                            cada_alumno.pagado==true ? imprimir+="Pagado: si" : imprimir+="Pagado: no"
                            imprimir+="\n"
                        }
                        
                        console.log(imprimir)
                        });
                        let continuar1=await rl .question("Pulsa la tecla Enter para continuar\n")
                        break;
                    case 2://DAW
                        con.query("SELECT * FROM alumnos WHERE especialidad = 'DAW'", function (err, result) {
                        if (err) throw err;
                        let imprimir=""
                        for(let cada_alumno of result){
                            imprimir+="\nDNI: "+cada_alumno.DNI+"\n"+
                                "Nombre: "+cada_alumno.nombre+"\n"+
                                "Apellidos: "+cada_alumno.apellido1+" "+cada_alumno.apellido2+"\n"+
                                "Fecha de nacimiento: "+DateTime.fromISO(cada_alumno.f_nacimiento).toFormat("dd/MM/yyyy")+"\n"+
                                "Especielidad: "+cada_alumno.especialidad+"\n"+
                                "Curso: "+cada_alumno.curso+"º"+"\n";
                            cada_alumno.pagado==true ? imprimir+="Pagado: si" : imprimir+="Pagado: no"
                            imprimir+="\n"
                        }
                        
                        console.log(imprimir)
                        });
                        let continuar2=await rl .question("Pulsa la tecla Enter para continuar\n")
                        break;
                    default:
                        throw new Error("No es un valor compatible")
                        break;
                }
                break;
            case 3://Curso
                let respuestaCurso=await rl.question("¿Por qué curso quieres filtrar?\n1.Primero\n2.Segundo\n")
                if(isNaN(respuestaCurso)){throw new Error("No es un valor compatible")}
                let opcionCurso=parseInt(respuestaCurso)
                switch (opcionCurso) {
                    case 1://Primero
                        con.query("SELECT * FROM alumnos WHERE curso = 1", function (err, result) {
                        if (err) throw err;
                        let imprimir=""
                        for(let cada_alumno of result){
                            imprimir+="\nDNI: "+cada_alumno.DNI+"\n"+
                                "Nombre: "+cada_alumno.nombre+"\n"+
                                "Apellidos: "+cada_alumno.apellido1+" "+cada_alumno.apellido2+"\n"+
                                "Fecha de nacimiento: "+DateTime.fromISO(cada_alumno.f_nacimiento).toFormat("dd/MM/yyyy")+"\n"+
                                "Especielidad: "+cada_alumno.especialidad+"\n"+
                                "Curso: "+cada_alumno.curso+"º"+"\n";
                            cada_alumno.pagado==true ? imprimir+="Pagado: si" : imprimir+="Pagado: no"
                            imprimir+="\n"
                        }
                        
                        console.log(imprimir)
                        });
                        let continuar1=await rl .question("Pulsa la tecla Enter para continuar\n")
                        break;
                    case 2://Segundo
                        con.query("SELECT * FROM alumnos WHERE curso = 2", function (err, result) {
                        if (err) throw err;
                        let imprimir=""
                        for(let cada_alumno of result){
                            imprimir+="\nDNI: "+cada_alumno.DNI+"\n"+
                                "Nombre: "+cada_alumno.nombre+"\n"+
                                "Apellidos: "+cada_alumno.apellido1+" "+cada_alumno.apellido2+"\n"+
                                "Fecha de nacimiento: "+DateTime.fromISO(cada_alumno.f_nacimiento).toFormat("dd/MM/yyyy")+"\n"+
                                "Especielidad: "+cada_alumno.especialidad+"\n"+
                                "Curso: "+cada_alumno.curso+"º"+"\n";
                            cada_alumno.pagado==true ? imprimir+="Pagado: si" : imprimir+="Pagado: no"
                            imprimir+="\n"
                        }
                        
                        console.log(imprimir)
                        });
                        let continuar2=await rl .question("Pulsa la tecla Enter para continuar\n")
                        break;
                    default:
                        throw new Error("No es un valor compatible")
                        break;
                }
                break;
            case 4:
                programa=false
                break;
            default:
                throw new Error("No es un número compatible");
                break;
        }

    } catch (error) {
        console.error(error.message)
    }
    }
    MenuPrincipal()
}

//Menú principal

async function MenuPrincipal() {
    let programa=true//se va a ejecutar mientras sea true, solo cambia de estado al salir
    while (programa==true) {
        
        try {
            
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
                    editarAlumno()
                    break;
                case 4:  
                    muestratodo() 
                    let confirmar=await rl.question("Pulsa Enter para continuar\n")                  
                    break;
                case 5:
                    buscar()
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
