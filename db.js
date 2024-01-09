const mysql = require("mysql");

const db_con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test-similan",
});

db_con.connect((err) => {
  if (err) {
    console.log("Error connect to MySQL fail = ", err);
    return;
  }

  console.log("MySQL Connected success!");
});


module.exports = db_con;
