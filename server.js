const mysql = require('mysql');
const url = require('url');
const http = require('http');
const fs = require('fs');

const pw = fs.readFileSync('pw.txt')

const con = mysql.createConnection({
  host: "localhost",
  user: "zachvac",
  password: pw
});
const favicon = fs.readFileSync('C:\\Users\\Zach\\ez\\favicon.jpg');
con.connect(function(err) {
  if (err) throw err;
});
http.createServer(function (req, res) {
  console.log("Connected");
  if(req.url == "/favicon.ico"){
    res.writeHead(200,{'Content-Type':'image/jpeg'})
    res.end(favicon,"binary");
  }else{
    res.writeHead(200, {'Content-Type': 'text/html'});
    var query = url.parse(req.url, true).query.query;
    res.write(JSON.stringify(req.headers)+"<br/>");
    res.write(req.url);
    res.end();
  }//end of else
  }).listen(80);



/*
if(query){
  con.query(query,function(err,result){
    if (err) throw err;
    res.write(JSON.stringify(result));
    res.end();
  });
}
*/
