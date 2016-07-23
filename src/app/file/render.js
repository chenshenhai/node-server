import fileInfo from './info';
import fileContent from './content';
import setting from './../../setting';
import dir from './dir';
import url from 'url';


export default class {
    constructor( req, res ) {
        this.req = req;
        this.res = res;
    }

    init() {
        let that = this;
        let fileInfoObj = fileInfo( that.req, that.res, setting.workspace );
        fileContent( that.req, 
            that.res,  
            fileInfoObj.filePath, 
            fileInfoObj.extName ,  
            fileInfoObj.basePath, 
            fileInfoObj.fileName );
    }
}