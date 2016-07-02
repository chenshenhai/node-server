const http = require("http");
const fs = require("fs");

const setting = require("./setting"); 

const server = http.createServer(function( req, res ){ 
    console.log("server is start on prot "  + setting.port  )
    res.write("hello world")
    res.end()
});

server.listen( setting.port , function(){
    console.log( "The node server is starting at port " + setting.port )
});
