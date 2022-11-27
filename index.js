const imageRotate = require('./src/functions/imageRotate')
const imageReducer = require('./src/functions/imageReducer')
const log = require('./src/logger')
const types = require('./src/types')
const os = require('os')
const fs = require('fs')
const path = require('path')
async function index() {
  const cliData = await require('./src/cli')()
  console.log(cliData)
  if (cliData.modes.includes("ROTATE_IMAGE")) {
    cliData.filePromptDialog.forEach(async (element) => {
      console.log(element)
      const filePath = element.split('/')
      const fileName = filePath.pop()
      log.info(`Now Rotating Image ${fileName}`)
      await imageRotate(cliData.rotateAngles, filePath.join('/'), fileName)
    });
  }
  if (cliData.modes.includes(types.types['Image Reducer'])) {
    const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), `image-director`))
    await fs.promises.mkdir(path.join(directory, 'beforeReduce'))
    await fs.promises.mkdir(path.join(directory, 'afterReduce'))
    cliData.filePromptDialog.forEach(async (element) => {
      const filePath = element.split('/')
      const fileName = filePath.pop()
      await fs.promises.copyFile(element, `${directory}/beforeReduce/${fileName}`)
      log.debug(`Successfully copied ${element} to ${directory}/beforeReduce/${element}`)
      console.log(element)
      await imageReducer(filePath.join('/'), fileName, directory)
    });
    await fs.rmSync(directory, { recursive: true, force: true })
  }
}
index()
