const path = require('path');
const fs = require('fs');
const ChildProcess = require('child_process')

const sevenZipPath = path.join(__dirname, '7z.exe');

/**
 * 压缩文件
 * @param {*} source 源文件/目录
 * @param {*} zipPath  zip文件
 */
function compressWith7z( source, zipPath) {
    if(!fs.existsSync(source)) {
        console.log(`目录不存在 ${source}`)
        return
    }
    let cmd =`${sevenZipPath}  a ${zipPath} ${source}`
    ChildProcess.execSync(cmd)
}



/**
 * 解压文件
 * @param {*} zipPath  zip文件
 * @param {*} destination  解压目录
 */
function extractWith7z(zipPath, destination) {
    if(fs.existsSync(destination)) {
        fs.rmSync(destination, { recursive: true })
    }
    if(fs.existsSync(zipPath) == false) {
        console.log(`文件不存在 ${zipPath}`)
        return
    }
    let cmd =`${sevenZipPath}  x ${zipPath} -o${destination}`
    let res = ChildProcess.execSync(cmd)
    console.log(res.toString())
}

