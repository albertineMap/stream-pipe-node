const fs = require('fs')
const spawn = require('child_process').spawn;
const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql');




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/get_file', async (req, res) => {

res.writeHead(200, {
    'Content-Type': 'application/javascript',
    'Content-Encoding': 'gz',
    "Content-Disposition": 'attachment; filename="nserverdb.sql.gz"',
    }); 

const dump = spawn('mysqldump', [
     '-uuser_test',
     '-ppassword123',
     'mydatabase',
 ]);

dump
.stdout
.pipe(res)
.on('finish', function () {
    console.log('Completed')
})
.on('error', function (err) {
    console.log(err)
})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})