//处理目录路径
import path from 'path';
import fs from 'fs';
import url from 'url';

import setting from './../setting';
import fileInfo from './info';
import fileContent from './content';
import walk from './walk';



function dir( req, res ) {

    let pathResolve = setting.workspace;
    let pathname = url.parse(req.url).pathname;
    if( !pathResolve  ) {
        pathResolve = path.resolve().replace(/\\/g, "/") + "/asset";
    }
    pathResolve = pathResolve + pathname;

    let files = walk(  pathResolve ),
        html = "<ul>";
    if( pathname.substr( pathname.length -1, 1 )  !== "/" ) {
        pathname = pathname + "/";
    }

    for( let i=0, len=files.length; i<len; i++ ) {
        html += '<li><a href="'+ pathname + files[i] +'">'+ files[i] +'</a></li>' 
    }
    html += "</ul>";

    res.writeHead(200, {"Content-Type" : "text/html"});
    res.write( html );
    res.end();
}

export default dir;