#!/usr/local/python/bin/python
"""
Copyright (c) 2016 Yoshihiro Furudate
Released under the MIT license
http://opensource.org/licenses/mit-license.php
"""
from flask import Flask, render_template, request, redirect
from jinja2 import Environment, FileSystemLoader, FileSystemBytecodeCache
from datetime import datetime
import os, os.path, codecs
import markdown #, requests
from functions import maintree, mdopen

app = Flask(__name__)

# define
userpath = os.path.dirname(os.getcwd()) # /home/h0/yoshihiro
name = os.path.basename(userpath)
homepath = "http://gms.gdl.jp/~" + name + "/sbzmc/"
customForUser = os.listdir(userpath + "/SBZMC/static/customForUser/")
pimatched = [tag for tag in ["profimg.jpg", "profimg.bmp", "profimg.jpeg", "profimg.gif", "profimg.png", "profimg.tiff"] if tag in customForUser]
bgmatched = [tag for tag in ["background.jpg", "background.bmp", "background.jpeg", "background.gif", "background.png", "background.tiff"] if tag in customForUser]
if len(pimatched) == 0:
    profimg = homepath + "static/default/profimg.png"
else:
    profimg = homepath + "static/customForUser/" + pimatched[0]  
if len(bgmatched) == 0:
    x = int(datetime.today().day/10)
    if x == 0: x =+ 1 
    background = x
else:
    background = homepath + "static/customForUser/" + bgmatched[0]
year = datetime.today().year
filelist = maintree("../")
linkactive = "nonactive" # default
downloadactive = "nonactive" # default

# route
@app.route('/')
def index():
    title = "SBZMC - " + name.upper()
    if "INDEX.md" in customForUser:
        filename = userpath + "/SBZMC/static/customForUser/INDEX.md"
        openfile = mdopen(userpath + "/SBZMC/static/customForUser/INDEX.md")
    else:
        filename = userpath + "/SBZMC/static/default/DEFAULT.md"
        openfile = mdopen(userpath + "/SBZMC/static/default/DEFAULT.md")
    return render_template('index.html', name=name, filelist=filelist, homepath=homepath, filename=filename, background=background, profimg=profimg, title=title, openfile=openfile, linkactive=linkactive, downloadactive=downloadactive, year=year)


@app.route('/<path:linkpath>')
def main(linkpath):
    title = name.upper() + "'s file: " + linkpath
    filepath = linkpath
    filename = os.path.basename(linkpath)
    if (filename[-3:] == ".md"):
        openfile = mdopen(userpath + '/' + linkpath)
    else:
        with codecs.open(userpath + '/' + linkpath, 'r', "utf_8") as openf:
            openfile = [line.rstrip('\n') for line in openf]
        global downloadactive; downloadactive = "active"
    if ("public_html" in linkpath):
        global linkactive; linkactive = "active"
        linkpath = "http://gms.gdl.jp/~" + name + "/" + linkpath.replace("public_html/", "", 1)
    elif ("link.txt" in os.listdir(userpath + '/' + os.path.split(linkpath)[0])):
        global linkactive; linkactive = "active"
        with open(userpath + "/" + os.path.split(linkpath)[0] + "/link.txt") as a:
                for i in range(1): linkpath = a.readlines()[0]
    else: linkpath = "";
    return render_template('index.html', name=name, title=title, filelist=filelist, homepath=homepath, linkpath=linkpath, filename=filename, filepath=filepath, background=background, profimg=profimg, openfile=openfile, linkactive=linkactive, downloadactive=downloadactive, year=year)

@app.errorhandler(Exception)
def otherError(e):
    try:
        if (str(e)[str(e).index("["):str(e).index("]")+1] == "[Errno 21]"):
            return redirect(request.url + "/README.md", code=302)
        else:
            e = str(e).replace(str(e)[str(e).index("["):str(e).index("]")+2], "")
            title = name.upper() + ": " + e; filename = e
    except:
        title = name.upper() + " : SomethingError"; filename = "SomethingError"
    openfile = ["別のファイルを探して見てください。", "", "Error: "+ str(e)]
    return render_template('index.html', name=name, title=title, filelist=filelist, homepath=homepath, filename=filename, background=background, profimg=profimg, openfile=openfile, linkactive=linkactive, downloadactive=downloadactive, year=year)

# run
if __name__ == '__main__':
    app.run()
    app.debug = True
