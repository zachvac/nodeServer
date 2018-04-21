const mysql = require('mysql');
const url = require('url');
const http = require('http');
const fs = require('fs');
const port = 80;
//folderLookup.txt contains a JSON mapping of url folder names to file system paths.
const folderLookup = JSON.parse(fs.readFileSync("folderLookup.txt").toString());
writeText = function(res,code,contents){
  res.writeHead(code,{'content-Type':'text/html'});
  res.write(contents);
  res.end();
}//end of writeText
writeImage = function(res,code,contents){
  res.writeHead(code,{'content-Type':'image/jpeg'});
  res.write(contents);
  res.end();
}
http.createServer(function (req, res) {
  const path = url.parse(req.url,true).pathname;
  const folder = path.split("/")[1];
  let folderLocation = "./"+folder;
  if(folderLookup[folder]){folderLocation = folderLookup[folder];}
  if(path.split("/")[2]=="www"){
    const pathWithoutFolder = path.substr(1).substr(path.substr(1).indexOf("/"));
    fs.readFile(folderLocation+pathWithoutFolder, function(err, data) {
      if(err){
        writeText(res,404,"404 File Not Found");
      }else{
        if(path.substring(path.length-3,path.length).toLowerCase()=="jpg"){
          writeImage(res,200,data);
        }else{
          writeText(res,200,data);
        }
      }
    });
  }else if(path.split("/")[2]=="data"){
    try{
      const dat = require(folderLocation);
      writeText(res,200,dat.export(path.split("/")[3],url.parse(req.url,true).query))
    }catch(err){
      writeText(res,404,"404 File Not Found");
    }
    //hardcode in the clan war page
  }else if(path=="/"){
    fs.readFile("C:/Users/Zach/ez/zach/www/clashWars.html", function(err, data) {
      if(err){
        writeText(res,404,"404 File Not Found");
      }else{
        writeText(res,200,data);
      }
    });
}else{
  writeText(res,404,"Not really sure what you're trying to do here.");
  }
}).listen(port);

/*
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
