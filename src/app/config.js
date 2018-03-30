/*
 × 配置文件
 */

// 页面类型
let mimes = {
  'css': 'text/css',
  'less': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'wma': 'audio/x-ms-wma',
  'wmv': 'video/x-ms-wmv',
  'xml': 'text/xml'
};

// 缓存文件
let Expires = {
  fileMatch: /^(gif|png|jpg|js|css)$/ig,
  maxAge: 60 * 60 * 24 * 365
};

// 压缩文件
let Compress = {
  match: /css|js|html/ig
};

module.exports = {
  mimes: mimes,
  Expires: Expires,
  Compress: Compress
};
