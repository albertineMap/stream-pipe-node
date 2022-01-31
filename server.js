const mysqldump = require('mysqldump')
const express = require('express')
const app = express()
const port = 3000
let fs = require('fs')

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"nserver_test"
});
/*
//connection
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //database
  con.query("drop database if exists nserver_test", function (err, result) {
    if (err) throw err;
    console.log("Database nserver_test delete");
  });

  con.query("CREATE DATABASE nserver_test", function (err, result) {
    if (err) throw err;
    console.log("Database nserver_test created");
  });
  //table
  var sql = "CREATE TABLE nserver_test.customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  //insert
  var sql = "INSERT INTO nserver_test.customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  //select
  con.query("SELECT * FROM nserver_test.customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
*/
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/get_file', async (req, res) => {
    const result = await mysqldump({
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'nserver_test',
        },
    });
    let buffer = Buffer.from(result)
    let read = fs.createReadStream(buffer)
    res.writeHead(200, {
        'Content-Type': 'application/javascript',
        'Content-Encoding': 'gzip',
        "Content-Disposition": 'attachment; filename="nserverdb.gz"',
        }); 
    read.pipe(res) 
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})