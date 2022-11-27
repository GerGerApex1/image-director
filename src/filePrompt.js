const { spawn } = require('child_process');
const { debug } = require('./logger')
function openFileDialog(types = {}, startingPath = process.cwd(), multiSelect = false) {
  return new Promise((resolve) => {
    const args = []
    // MultiSelect
    if (multiSelect) {
      args.push('-mulSelc')
    }
    // Initial Directory Paths
    args.push('-dirPath')
    args.push(startingPath)
    // Filetypes as filter
    args.push('-filter')
    args.push(`${parseJSONtoString(types)}`)
    function stdout(bufferData) {
      const jsonObj = JSON.parse(bufferData)
      if (jsonObj) {
        if (jsonObj.STATUS === "EMPTY") {
          resolve(null)
        } else {
          resolve(jsonObj.FILE_PATH)
        }
      }
      debug("RAW " + bufferData)
    };
    function stderr(e) {
      console.log(e.toString())
    }
    console.log(args)
    spawnPython("src/dialogScripts/fileDialog.py", args, stdout, stderr)
  })
}
function spawnPython(file, args, stdout, stderr) {
  args.unshift(file)
  const powershellProc = spawn('py', args)
  powershellProc.stdout.on('data', stdout)
  powershellProc.stderr.on('data', stderr)
}
function parseJSONtoString(Object) {
  return JSON.stringify(Object).replace(/["]/g, '\\"')
}
module.exports = openFileDialog
