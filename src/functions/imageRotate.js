const jimp = require('jimp')
const { debug, info } = require('../logger')
const fs = require('fs')
async function rotateImages(degrees, filePath, fileName) {
  const path = filePath + "\\" + fileName
  debug(path + ' debug')
  const fileSize = fs.statSync(path)
  const fileBuffer = await fs.promises.readFile(path)
  const e = await jimp.read(fileBuffer)
  debug(`DEGREES: ${degrees} | FILE_PATH: ${filePath} | FILE_NAME: ${fileName}`)
  e.rotate(degrees).write(`${filePath}/${fileName}`)
  info('Success on writing ' + fileName)
  const finalfileBuffer = await fs.statSync(path)
  debug(`INITIAL FILE SIZE: ${fileSize.size}\n FINAL FILE SIZE: ${finalfileBuffer.size}`)
}
module.exports = rotateImages
