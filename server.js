var net = require("net"), stream = require("stream"), fs = require("fs");
var path = require("path"), curpath = path.dirname(), urllib = require("url");
var port = 25000;
require("./defs");
blacklist = new Array("server.js", "defs.js");

httpserver = net.createServer(function(listener){
  listener.on('connect', function(){
    console.log("Incoming connection from " + listener.remoteAddress);
  });
  listener.on('data', function(data){
    var headers = data.toString().split("\r\n");
    var request = headers[0].split(" ");
    var requestType = request[0], pageName = request[1], protocol = request[2];
    var reply = new Response();
    console.log("Request Headers: " + data);
    if ((requestType == "GET" || requestType == "POST") && !blacklist.contains(path.basename(pageName)))
    {
      if (endsWith("/", pageName))
      {
        pageName = pageName + "index.html";
      }
      pageName = curpath + pageName;
      fs.exists(pageName, function(exists)
      {
        reply.header += getResponseStatus(exists?200:404);
        pageName = exists?pageName:path.join(curpath, "404.html");
//        reply.header += "Server: localhost:" + port + "\r\n";
        // TODO: Is encoding OK being hard-coded or should it depend
        // on filetype?
        fs.readFile(pageName, "UTF-8", function(err, data)
        {
          reply.header += "Content-length: ";
          // TODO: Content-length depends on data type
          reply.header += data==undefined?0:data.length*2 + "\r\n";
          reply.header += "Content-type: " + getContentType(pageName.split(".").pop())
          reply.content = data;
          listener.write(reply.stringify());
          listener.end();
        });
      });
    } else
    {
      reply.header+= getResponseStatus(400);
      listener.write(reply.stringify());
      listener.end();
    }
  });
});

function getResponseStatus(code){
  return " " + code.toString() + " " + STATUS_PHRASE[code] + "\r\n";
}

function endsWith(needle, haystack){
  return haystack.slice(haystack.length - needle.length, needle.length) == needle;
}

Array.prototype.contains = function(value){
  for (var i = 0; i < this.length; i++){
    if (this[i] == value)
      return true;
  }
  return false;
}

Response = function(){
  this.content = "";
  this.header = "HTTP/1.1 ";
};

Response.prototype.stringify = function(){
  console.log("Reply Header: " + this.header);
  console.log("Content: " + this.content);
  return this.header + "\r\n\r\n" + this.content;
}

httpserver.listen(25000, function(){
  console.log("node server running on port " + port);
});

