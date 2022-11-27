const childProcess = require('child_process')
function pythonInstalled() {
  try {
    const path = childProcess.execSync('where python').toString()
    if (path) {
      return true
    }
  } catch (e) {
    return false
  }
}
module.exports = {
  pythonInstalled,
}
