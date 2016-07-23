import less from 'less';

let parseLess = function(  req, res,  fileBasePath, filename , content ) {
    let parser = new(less.Parser)({
        paths: [ '.', fileBasePath ], // Specify search paths for @import directives
        filename: filename      // Specify a filename, for better error messages
    });

    parser.parse(content, function (e, tree) {
        // tree.toCSS({ compress: true }); // Minify CSS output
        let cssText = tree.toCSS();
        res.writeHead(200, {"Content-Type": "text/css"});
        res.write(cssText, "binary");
        res.end();
    });
}


export default parseLess;
