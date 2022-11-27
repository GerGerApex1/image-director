const inquirer = require("inquirer");
const types = require('./types')
const filePrompt = require('./filePrompt');
const { pythonInstalled } = require("./utils");
const { error } = require("./logger");
async function modesPrompt() {
  const question1 = await inquirer.prompt({
    name: "name",
    type: "checkbox",
    message: 'eut',
    choices: [
      "Rotate Images",
      "Image Reducer",
    ],
  })
  return types(question1.name)
}
async function directoryOrFile() {
  const question1 = await inquirer.prompt({
    name: "name",
    type: "list",
    message: 'directoryOrFile',
    choices: [
      "Single File",
      "Multiple Files",
      "Directory",
    ],
  })
  return types(question1.name)
}
async function anglesPrompt() {
  const question1 = await inquirer.prompt({
    name: "name",
    type: "list",
    message: 'Degrees',
    choices: [
      0,
      90,
      180,
      270,
    ],
  })
  return question1.name
}
module.exports = async () => {
  const modes = await modesPrompt()
  const dialogType = await directoryOrFile()
  let filePromptDialog = undefined
  if (dialogType) {
    console.log(`Awaiting ${dialogType === "Directory_DIALOG" ? "Directory Path" : "File(s) path"} from filePrompt()`)
    if (pythonInstalled()) {
      filePromptDialog = await filePrompt(
          types.imageFileExtention,
          process.cwd(),
        dialogType === "Directory_DIALOG" ? false : true)
    } else {
      error("Python isn't installed. Exiting Application")
      process.exit(1)
    }
  }
  let rotateAngles = undefined
  if (modes.includes('ROTATE_IMAGE')) {
    rotateAngles = await anglesPrompt()
  }
  return {
    modes,
    dialog_type: dialogType,
    rotateAngles,
    filePromptDialog,
  }
}
