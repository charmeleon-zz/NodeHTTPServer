var net = require("net");
var stream = require("stream");
var fs = require("fs");
var port = 25000;
// TODO: Make this dynamic
var curpath = "/home/erick/Documents/Hacker_School/javascript/httpserver";
httpserver = net.createServer(function(listener){
  // http://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html#sec6.1
  STATUS_PHRASE = {
    "100":  "Continue",
    "101":  "Switching Protocols",
    "200":  "OK",
    "201":  "Created",
    "202":  "Accepted",
    "203":  "Non-Authoritative Information",
    "204":  "No Content",
    "205":  "Reset Content",
    "206":  "Partial Content",
    "300":  "Multiple Choices",
    "301":  "Moved Permanently",
    "302":  "Found",
    "303":  "See Other",
    "304":  "Not Modified",
    "305":  "Use Proxy",
    "307":  "Temporary Redirect",
    "400":  "Bad Request",
    "401":  "Unauthorized",
    "402":  "Payment Required",
    "403":  "Forbidden",
    "404":  "Not Found",
    "405":  "Method Not Allowed",
    "406":  "Not Acceptable",
    "407":  "Proxy Authentication Required",
    "408":  "Request Time-out",
    "409":  "Conflict",
    "410":  "Gone",
    "411":  "Length Required",
    "412":  "Precondition Failed",
    "413":  "Request Entity Too Large",
    "414":  "Request-URI Too Large",
    "415":  "Unsupported Media Type",
    "416":  "Request range not satisfiable",
    "417":  "Expectation Failed",
    "500":  "Internal Server Error",
    "501":  "Not Implemented",
    "502":  "Bad Gateway",
    "503":  "Service Unavailable",
    "504":  "Gateway Time-out",
    "505":  "HTTP Version not supported"
  }
  listener.on('connect', function(){
    console.log("Incoming connection from " + listener.remoteAddress);
  });
  listener.on('data', function(data){
    var headers = data.toString().split("\r\n");
    var request = headers[0].split(" ");
    var obj = "";
    var requestType = request[0], pageName = request[1], protocol = request[2];
    var reply = new Response();
    if (requestType == "GET" || requestType == "POST")
    {
      if (endsWith("/", pageName))
      {
        pageName = pageName + "index.html";
      }
      pageName = curpath + pageName;
      if (!fs.exists(pageName)){
        pageName = 
      }
      fs.exists(pageName, function(exists)
      {
        reply.header += getResponseStatus(exists?200:404);
        pageName = exists?pageName:curpath + "404.html";
        reply.header += "Server: localhost:" + port + "\r\n";
        fs.readFile(pageName, "UTF-8", function(err, data)
        {
          console.log("Requested: " + pageName);
          reply.header += "Content-length: " + data==undefined?0:data.length*2;
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

httpserver.listen(25000, function(){
  console.log("node server running on port " + port);
});

function getResponseStatus(code){
  console.log("Request code: " + code);
  return " " + code.toString() + " " + STATUS_PHRASE[code] + "\r\n";
}

function endsWith(needle, haystack){
  return haystack.slice(haystack.length - needle.length, needle.length) == needle;
}

Response = function(){
  this.content = "";
  this.header = "HTTP/1.1 ";
};

Response.prototype.stringify = function(){
  console.log("Header: " + this.header);
  console.log("Content: " + this.content);
  return this.header + "\r\n\r\n" + this.content;
}

