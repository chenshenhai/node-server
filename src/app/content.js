/*
 * 访问文件内容
 */

const fs = require('fs');
const config = require('./config');

let mimes = config.mimes;

function fileMime (extName) {
  return mimes[ extName ] || 'text/plain';
}

function getFileContent (req, res, filePath, extName) {
  let contentType = fileMime(extName);

  let stat = fs.statSync(filePath);
  let lastModified = stat.mtime.toUTCString();
  let ifModifiedSince = 'If-Modified-Since'.toLowerCase();
  res.setHeader('Last-Modified', lastModified);

  if (extName.match(config.Expires.fileMatch)) {
    let expires = new Date();
    expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
    res.setHeader('Expires', expires.toUTCString());
    res.setHeader('Cache-Control', 'max-age=' + config.Expires.maxAge);
  }

  if (req.headers[ifModifiedSince] && lastModified === req.headers[ifModifiedSince]) {
    res.writeHead(304, 'Not Modified');
    res.end();
  } else {
    let content = fs.readFileSync(filePath, 'binary');
    if (content) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(content, 'binary');
      res.end();
    } else {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end();
    }
  }
}

module.exports = getFileContent;
