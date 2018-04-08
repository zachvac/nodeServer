const mysql = require('mysql');
const url = require('url');
const http = require('http');
const fs = require('fs');
const port = 80;
const folderLookup = JSON.parse(fs.readFileSync("folderLookup.txt").toString());
http.createServer(function (req, res) {
  const path = url.parse(req.url,true).pathname;
  const folder = path.split("/")[1];
  let folderLocation = "./"+folder;
  if(folderLookup[folder]){folderLocation = folderLookup[folder];}
  if(path.split("/")[2]=="www"){
    console.log("www");
    const pathWithoutSlash = path.substr(1);
    const pathWithoutFolder = pathWithoutSlash.substr(pathWithoutSlash.indexOf("/"));
    fs.readFile(folderLocation+pathWithoutFolder, function(err, data) {
      if(err){
        res.writeHead(404,{'content-Type':'text/html'});
        res.write("404 File Not Found");
        res.end();
      }else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      }
    });
  }else if(path.split("/")[2]=="data"){
    res.writeHead(200, {'Content-Type': 'text/html'});
    try{
      const dat = require(folderLocation);
      res.write(dat.export(path.split("/")[3],url.parse(req.url,true).query));
      res.end();
    }catch(err){
      res.writeHead(404,{'content-Type':'text/html'});
      res.write("404 File Not Found");
      res.end();
    }
  }else{
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end("Not really sure what you're trying to do here.");
  }
}).listen(port);



/*
if(query){
con.query(query,function(err,result){
if (err) throw err;
res.write(JSON.stringify(result));
res.end();
});
}


con.connect(function(err) {
if (err) throw err;
});

const pw = fs.readFileSync('pw.txt')

const con = mysql.createConnection({
host: "localhost",
user: "zachvac",
password: pw
});
*/
