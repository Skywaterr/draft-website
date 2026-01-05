# I need to edit all the png names so they don't have "-" in them

import os
import glob

files = glob.glob("*");

for i in range(len(files)):
    f = files[i]
    os.rename(f, f.replace("-", ""))

