const fs = require('fs')
const { info } = require('../logger')
const sharp = require('sharp')
function png(path) {
  return sharp(path).png({
    quality: 90,
    adaptiveFiltering: true,
    compressionLevel: 6,
  })
}
function jpeg(path) {
  return sharp(path).jpeg({
    compressionLevel: 6,
    adaptiveFiltering: true,
    quality: 90,
  })
}
function getFileSize(path) {
  return fs.statSync(path).size
}
async function imageReducer(filePath, fileName, tmpdir) {
  info(`Now Reducing File Size for ${fileName}`)
  const beforeReduceSize = getFileSize(`${tmpdir}\\beforeReduce\\${fileName}`)
  const fileExtention = fileName.split('.').pop()
  let image = png(`${tmpdir}\\beforeReduce\\${fileName}`)
  if (fileExtention.includes(['.jpg', 'jpeg', '.jfif'])) {
    image = jpeg(`${tmpdir}\\beforeReduce\\${fileName}`)
  }
  if (fileExtention.includes(['.png'])) {
    image = png(`${tmpdir}\\beforeReduce\\${fileName}`)
  }
  await image.toFile(`${tmpdir}\\afterReduce\\${fileName}`)
  const afterReduceSize = getFileSize(`${tmpdir}\\afterReduce\\${fileName}`)
  info(`-----------------------------------------`)
  info('Image successfully reduced')
  info('File Name: ' + fileName)
  info(`File Size before being reduced: ${beforeReduceSize}`)
  info(`File Size after being reduced: ${afterReduceSize}`)
  info(`-----------------------------------------`)
}
module.exports = imageReducer
