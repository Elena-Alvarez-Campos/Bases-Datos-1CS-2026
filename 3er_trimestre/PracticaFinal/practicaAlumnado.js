//readline
const readline=require('node:readline/promises')
const {stdin:input, stdout:output}=require('node:process')
const {error}=require('node:console');
const rl=readline.createInterface({input,output});

let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "AlumnadoBBDD"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");  
});
function muestratodo() {
    let imprimir=""/*
    con.query("SELECT * FROM alumnos", function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        for(let cada_alumno of result){
            imprimir+=cada_alumno.DNI+"\n"
        }
        console.log(imprimir)
    });*/
    con.query('SELECT * FROM alumnos', (err, results) => {
        for(let cada_alumno of results){
            imprimir+=cada_alumno.DNI+"\n"
            
        }
        console.log(imprimir)
        if (err) {
            console.error('Error executing query: ' + err.stack);
        }
    });
    
}



//export default connect;


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
                    muestratodo()
                    break;
                case 2:
                    
                    break;
                case 3:
                    
                    break;
                case 4:
                    
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