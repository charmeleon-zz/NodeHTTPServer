// http://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html#sec6.1
STATUS_PHRASE = {
  "100":  "Continue", "101":  "Switching Protocols",
  "200":  "OK", "201":  "Created", "202":  "Accepted", "203":  "Non-Authoritative Information",
    "204":  "No Content", "205":  "Reset Content", "206":  "Partial Content",
  "300":  "Multiple Choices", "301":  "Moved Permanently", "302":  "Found", "303":  "See Other",
    "304":  "Not Modified", "305":  "Use Proxy", "307":  "Temporary Redirect",
  "400":  "Bad Request", "401":  "Unauthorized", "402":  "Payment Required", "403":  "Forbidden",
    "404":  "Not Found", "405":  "Method Not Allowed", "406":  "Not Acceptable",
    "407":  "Proxy Authentication Required", "408":  "Request Time-out", "409":  "Conflict",
    "410":  "Gone", "411":  "Length Required", "412":  "Precondition Failed", "413":  "Request Entity Too Large",
    "414":  "Request-URI Too Large", "415":  "Unsupported Media Type", "416":  "Request range not satisfiable",
    "417":  "Expectation Failed",
  "500":  "Internal Server Error", "501":  "Not Implemented", "502":  "Bad Gateway", "503":  "Service Unavailable",
    "504":  "Gateway Time-out", "505":  "HTTP Version not supported"
}
// http://en.wikipedia.org/wiki/Internet_media_type 2012-11-28
getContentType = function(ext) {
  switch(ext.toLowerCase()){
    case "es":
      return "application/ecmascript";
    case "json":
      return "application/json";
    case "js":
      return "application/javascript";
    case "pdf":
      return "application/pdf";
    case "ps":
      return "application/postscript";
    case "xml":
      return "application/xml";
    case "zip":
      return "application/zip";
    case "gz":
      return "application/gzip";
    case "mp3": case "mpeg":
      return "audio/mpeg";
    case "gif":
      return "image/gif";
    case "jpg": case "jpeg": case "jpe":
      return "image/jpeg";
    case "jfif": case "jif": case "jfi":
      return "image/pjpeg";
    case "png":
      return "image/png";
    case "tiff": case "tif":
      return "image/tiff";
    case "css":
      return "text/css";
    case "csv":
      return "text/csv";
    case "html": case "htm":
      return "text/html";
    case "txt":
      return "text/plain";
    case "xml":
      return "text/xml";
    case "mpg": case "mpeg": case "mp1": case"mp2": case "mp3": case "m1v": 
      case "m1a": case "m2a": case "mpa": case "mpv":
      return "video/mpeg";
    case "mp4": case "m4a": case "m4p": case "m4b": case "m4r": case "m4v":
      return "video/mp4";
    case "flv": case "f4v": case "f4p": case "f4a": case "f4b":
      return "video/x-flv";
    default:
      return "application/octet-stream";
  }
}

