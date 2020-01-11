let  { TDLib }  = require('tdl-tdlib-ffi')
const path = require('path')
let obj ={}
obj.staticProperty =[]
obj.staticProperty['verify'] =false
obj.staticProperty['tdLib'] = {}
module.exports = async ()=>{
    if(obj.staticProperty['verify'] === true){
        return  obj.staticProperty['tdLib']
    }else{
        let tdLib = new TDLib(__dirname + '/lib/libtdjson.so')
        tdLib.setLogFilePath(path.resolve(__dirname, './logs/tdl.log'))
        // tdLib.setLogMaxFileSize('50000')
        // tdLib.setLogVerbosityLevel(5)
        // tdLib.setLogMaxFileSize('9007199254748991')
        obj.staticProperty['tdLib'] = tdLib
        obj.staticProperty['verify'] = true
        return tdLib
    }
}