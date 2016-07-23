import path from 'path';
import fs from 'fs';
import zlib from 'zlib';

import parseLess from './../parse/less';
import config from './../config';
import dir from './dir';

let mimes = config.mimes;

function fileMime( extName ) {

    return  mimes[ extName ] || "text/plain";
}

function getfileContent( req, res, filePath, extName , notExistCallback,  errCallback, sucCallback) {
    let contentType = fileMime( extName );

    let exist = fs.existsSync( filePath );
    if( !exist ) {
        if( typeof notExistCallback === "function" ) {
            notExistCallback( req, res );
        } else {
            res.writeHead( 404, { "Content-Type" :  contentType});
            res.write("Not Found");
            res.end();
        }

    } else {
        let stat = fs.statSync( filePath );

        if( stat.isDirectory() ) {
            dir( req, res );
        } else {

            let lastModified = stat.mtime.toUTCString();
            let ifModifiedSince = "If-Modified-Since".toLowerCase();
            res.setHeader("Last-Modified", lastModified);

            
            if (extName.match(config.Expires.fileMatch)) { 
                 let expires = new Date();
                 expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
                 res.setHeader("Expires", expires.toUTCString());   
                 res.setHeader("Cache-Control", "max-age=" + config.Expires.maxAge);
            }

            if( req.headers[ifModifiedSince]  && lastModified == req.headers[ifModifiedSince] ) {
                res.writeHead(304, "Not Modified");
                res.end();
            } else {

                let content = fs.readFileSync( filePath, "binary" );
                if( content ) {
                    if( typeof sucCallback === "function" ) {
                        sucCallback( req, res, content );
                        res.end();
                    } else {
                        res.writeHead(200, {'Content-Type': contentType});
                        res.write(content, "binary");
                        res.end();
                    }
                } else {
                 if( typeof errCallback === "function" ) {
                        errCallback(req, res);
                    } else {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end(err);
                    }
                }

                //  //async读取文件
                // fs.readFile( filePath, "binary", function(err, content ) { 
                //     if( err ) {
                //         if( typeof errCallback === "function" ) {
                //             errCallback(req, res);
                //         } else {
                //             res.writeHead(500, {'Content-Type': 'text/plain'});
                //             res.end(err);
                //         }
                //     } else {
                //         if( typeof sucCallback === "function" ) {
                //             sucCallback( req, res, content );
                //             res.end();
                //         } else {
                //             res.writeHead(200, {'Content-Type': contentType});
                //             res.write(content, "binary");
                //             res.end();
                //         }
                //     }
                // });


                // //流形式读取文件
                // let raw = fs.createReadStream( filePath );          
                // let acceptEncoding = req.headers['accept-encoding'] || "";
                // let matched = extName.match(config.Compress.match);
                // if (matched && acceptEncoding.match(/\bgzip\b/)) { 
                //     res.writeHead(200, "Ok", {'Content-Encoding': 'gzip'});
                //      console.log( raw.pipe(zlib.createGzip()).pipe() );
                //     raw.pipe(zlib.createGzip()).pipe(res);
                // }  else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                //     res.writeHead(200, "Ok", {'Content-Encoding': 'deflate'});
                //     raw.pipe(zlib.createDeflate()).pipe(res);
                // } else {
                //     res.writeHead(200, "Ok");
                //     raw.pipe(res);
                // }

            }
        }                   

 
    }
}

function fileContent( req, res, filePath, extName, fileBasePath, filename  ) {


    switch( extName ) {
        case "css" :
            //当css文件找不到时，自动查找less文件，并编译成css 格式
             getfileContent( req, res, filePath, extName , function( ){
                 let _filePath = filePath.substring( 0, filePath.length - 3 );
                 _filePath = _filePath + "less";
                 getfileContent( req, res, _filePath, "less", false, false, function(req, res,  content ){
                    parseLess( req, res,  fileBasePath, filename , content );
                 });
             });
            break;
        case "less" :
             getfileContent( req, res, filePath, "less", false, false, function(req, res,  content ){
                    parseLess( req, res,  fileBasePath, filename , content );
             });
            break;
        default :    
            getfileContent( req, res, filePath, extName );
            break;
    }
}

module.exports = fileContent;