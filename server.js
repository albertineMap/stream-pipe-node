
const express = require('express')
const app = express()
const port = 3000
let fs = require('fs')
let file = 'demo.mp4'
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/get_file', (req, res) => {
    fs.stat(file, (err, stat) => {
        let total = stat.size
        let read = fs.createReadStream(file)
        res.writeHead(200, {
            'Content-Length': total,
            'Content-Type': 'video/mp4',
            "Content-Disposition": 'attachment; filename="demo.mp4"',
            }); 
        read.pipe(res) 
    })
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})