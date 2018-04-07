var mysql = require('mysql');
var url = require('url');
var http = require('http');
console.log("Running");
var con = mysql.createConnection({
  host: "localhost",
  user: "zachvac",
  password: "Ooi4got2"
});
console.log("mysql connection created");
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
http.createServer(function (req, res) {

  console.log("Connected");
    res.writeHead(200, {'Content-Type': 'text/html'});

    var query = url.parse(req.url, true).query.query;
    console.log("query = "+query);
    if(query){
      con.query(query,function(err,result){
        if (err) throw err;
        console.log("Query executed");
        res.write(JSON.stringify(result));
        res.write("hi");
        res.end();
      });
  }//end of if

}).listen(80);
