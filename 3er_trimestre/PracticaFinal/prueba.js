let mysql = require('mysql');
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "AlumnadoBBDD"
});
let resultado
con.query('SELECT * FROM alumnos', (err, results) => {
    resultado=results
    console.log(resultado)
});
console.log(resultado)