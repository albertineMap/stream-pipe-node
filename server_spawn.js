var Mysqldump = require('mysqldump-stream');
const fs = require('fs')
const spawn = require('child_process').spawn;

const app = express()
const port = 3000
//let fs = require('fs')

var mysql = require('mysql');

const dumpFileName = `${Math.round(Date.now() / 1000)}.txt`
const writeStream = fs.createWriteStream(dumpFileName)



const dump = spawn('mysqldump', [
     '-u',
     'root',
     '-p',
     'test_db22',
 ], {shell:true});

// const dump = spawn('mysqldump', {shell: true});

dump
.stdout
.pipe(writeStream)
.on('finish', function () {
    console.log('Completed')
})
.on('error', function (err) {
    console.log(err)
})

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get('/get_file', async (req, res) => {

// })


// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })



