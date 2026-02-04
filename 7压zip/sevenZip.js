const path = require('path');
const fs = require('fs');
const ChildProcess = require('child_process')

const sevenZipPath = path.join(__dirname, '7z.exe');

/**
 * 压缩文件
 * @param {*} source 
 * @param {*} destination 
 */
function compressWith7z( source, destination) {
    let cmd =`${sevenZipPath}  a ${destination} ${source}`
    ChildProcess.execSync(cmd)
}



/**
 * 解压文件
 * @param {*} source 
 * @param {*} destination 
 */
function extractWith7z(source, destination) {
    if(fs.existsSync(destination)) {
        fs.rmSync(destination, { recursive: true })
    }
    let cmd =`${sevenZipPath}  x ${source} -o${destination}`
    let res = ChildProcess.execSync(cmd)
    console.log(res.toString())
}

