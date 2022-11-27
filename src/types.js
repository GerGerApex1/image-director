const types = {
  "Rotate Images": 'ROTATE_IMAGE',
  "Image Reducer": "REDUCE_IMAGE",
  "Single File": "SINGLE_FILE_DIALOG",
  "Multiple Files": "MULTISELECT_FILE_DIALOG",
  "Directory": "Directory_DIALOG",
}
const JPEG = "*.jpg;*.jpeg;*.jfif"
const PNG = "*.png"
const imageFileExtention = {
  JPEG,
  PNG,
  "All Images": `${JPEG};${PNG}`,
}
module.exports = (data) => {
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      const finalArray = []
      data.forEach((element) => {
        finalArray.push(types[element])
      });
      return finalArray
    }
  }
  return types[data]
}
module.exports.types = types
module.exports.imageFileExtention = imageFileExtention
