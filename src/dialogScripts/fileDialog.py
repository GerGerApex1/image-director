import argparse
import json
import re
from tkinter import filedialog
import os
parser = argparse.ArgumentParser(description="puta!")
parser.add_argument('-mulSelc', default=False,
                    action=argparse.BooleanOptionalAction)
parser.add_argument('-dirPath', default=os.path.join(os.path.join(os.environ['USERPROFILE']), 'Desktop') )
parser.add_argument('-filter')
args = parser.parse_args()
regex = r"([\\][\"])"
stringFilter = re.sub(regex, "\"", args.filter)
filterJson = json.loads(stringFilter)

finalFilter = [("All Files", ".*")]

if(args.filter):
    for key, value in filterJson.items():
        finalFilter.insert(0, (key, value))
def showFileDialog():
    if(args.mulSelc):
        dialogResult = filedialog.askopenfilenames(filetypes=finalFilter, initialdir=args.dirPath)
        return dialogResult
    else:
        dialogResult = filedialog.askopenfilename(filetypes=finalFilter, initialdir=args.dirPath)
        return dialogResult
path = showFileDialog()
status = "OK"
if(len(path) == 0):
    status = "EMPTY"
output = {
    "STATUS": status,
    "FILE_PATH": path
}
print(json.dumps(output))
