# For downloading sprites from the Showdown website

import requests
import os

url = "https://play.pokemonshowdown.com/sprites/ani/"

folder = "."

os.makedirs(folder, exist_ok=True)

file = open("./names.txt")
fails = open("./fails.txt", "w")
with open("./names.txt", "r") as f:
    lines = f.readlines()
    lines = [line.strip() for line in lines]

    for line in lines:
        fetchurl = url + line + ".gif"
        try:
            print(fetchurl)
            r = requests.get(fetchurl)        
            r.raise_for_status()
            with open(line + ".gif", "wb") as f:
                f.write(r.content)
        except:
            fails.write(fetchurl);
            fails.write("\n");
            print("Failed to fetch: ", fetchurl)


