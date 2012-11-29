var net = require("net"), stream = require("stream"), fs = require("fs");
var path = require("path"), urllib = require("url");
var rootdir = path.dirname(); // root directory
var port = 25000;
require("./defs");
// Prevent from loading our configuration
blacklist = new Array("server.js", "defs.js");

net.createServer(function(listener){
  var reply = new Response();
  listener.on('connect', function(){
    console.log("Incoming connection from " + listener.remoteAddress);
  });
  listener.on('data', function(data){
    var headers = data.toString().split("\r\n");
    var request = headers[0].split(" ");
    var requestType = request[0], pageName = request[1], protocol = request[2];
    if ((requestType == "GET" || requestType == "POST") && !blacklist.contains(path.basename(pageName)))
    {
      if (endsWith("/", pageName))
      {
        pageName = pageName + "index.html";
      }
      pageName = rootdir + pageName;
      fs.exists(pageName, function(exists)
      {
        reply.header += getResponseStatus(exists?200:404);
        pageName = exists?pageName:path.join(rootdir, "404.html");
        fs.readFile(pageName, function(err, data)
        {
          reply.header += "Content-length: ";
          reply.header += data==undefined?0:data.length + "\r\n";
          reply.header += "Content-type: " + getContentType(pageName.split(".").pop()) + "\r\n";
          reply.header += "Connection: close\r\n";
          reply.content = data;
          reply.write(listener);
          listener.end();
          if (err){
            throw err;
          }
        });
      });
    } else
    {
      reply.header+= getResponseStatus(400);
      reply.write(listener);
    }
  });
}).listen(port, function(){
  console.log("node server running on port " + port);
});

Array.prototype.contains = function(value){
  for (var i = 0; i < this.length; i++){
    if (this[i] == value)
      return true;
  }
  return false;
}

Response = function(){
  this.content;
  this.header = "HTTP/1.1 ";
};

Response.prototype.write = function(l){
  l.write(this.header + "\r\n");
  l.write(this.content);
}

