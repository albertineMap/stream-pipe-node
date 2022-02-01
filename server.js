const mysqldump = require('mysqldump')
const express = require('express')
const app = express()
const port = 3000
let fs = require('fs')

//var stream = require('stream');
const { Readable } = require("stream");

const spawn = require('child_process').spawn

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"nserver_test"
});

//connection
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // //database
  // con.query("drop database if exists nserver_test", function (err, result) {
  //   if (err) throw err;
  //   console.log("Database nserver_test delete");
  // });
  // con.query("CREATE DATABASE nserver_test", function (err, result) {
  //   if (err) throw err;
  //   console.log("Database nserver_test created");
  // });
  // //table
  // var sql = "CREATE TABLE nserver_test.customers (name VARCHAR(255), address VARCHAR(255))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
  // //insert
  // var sql = "INSERT INTO nserver_test.customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  // });
  //select
  con.query("SELECT * FROM nserver_test.customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/get_file', async (req, res) => {
  var result = await mysqldump({
      connection: {
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'nserver_test',
      },
      //dumpToFile: './dump.sql.gz',
  });
  // console.log(result);
  //let read = fs.createReadStream(Object.values(result));

  const read = new Readable();
  let dumpFinal =  "";
  dumpFinal += result.dump.schema;
  dumpFinal += "\n\n";
  dumpFinal += result.dump.data;

  // console.log("\n\n" + dumpFinal);
  
  read.push(dumpFinal);
  read.push(null);
  
  res.writeHead(200, {
      'Content-Type': 'application/javascript',
      'Content-Encoding': 'gz',
      "Content-Disposition": 'attachment; filename="nserverdb.sql.gz"',
      }); 
      
  read.pipe(res) 
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})