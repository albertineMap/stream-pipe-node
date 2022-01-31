

export default function getFile() {
  // const tweets = db.queryNodeStream(
   // sql`SELECT COMPRESS ('data')`);
   const=mysqldump --all-databases
  const map = new Map(tweet => [tweet.id, tweet.likes]);
  const stringifier = stringify();
  stringifier.write(['Tweet ID', 'Likes']);
  tweets.pipe(map).pipe(stringifier);
  tweets.on('error', e => stringifier.emit('error', e);
  map.on('error', e => stringifier.emit('error', e);
  return stringifier;
}


// dump the result straight to a compressed file
mysqldump({
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nserver_test',
    },
    dumpToFile: './dump.sql.gz',
    compressFile: true,
});


let file ='./dump.sql.gz'
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