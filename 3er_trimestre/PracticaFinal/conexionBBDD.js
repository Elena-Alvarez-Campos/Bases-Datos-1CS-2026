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
  con.query("SELECT * FROM alumnos", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  con.end()
});