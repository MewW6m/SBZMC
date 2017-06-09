#!/usr/local/python/bin/python
import sys, os, os.path, markdown, codecs, subprocess, json
sys.path.append('/home/h0/yoshihiro/.local/lib/python3.5/site-packages')
from mdx_gfm import GithubFlavoredMarkdownExtension

def maintree(dirname):
    file = []
    tmp = {}
    with codecs.open("ignore.txt", 'r', "utf_8") as openf:
        tmplist = [line.rstrip('\n') for line in openf if "-->" not in line]
    args = ['php', 'files.php']
    res = json.loads(subprocess.check_output(args).decode('utf-8'))
    del res["SBZMC"] # this program no view
    for i in tmplist:
        try:
            if(len(i.split("/")) == 1):
                del res[i.split("/")[0]]
            elif(len(i.split("/")) == 2):
                del res[i.split("/")[0]][i.split("/")[1]]
            elif(len(i.split("/")) == 3):
                del res[i.split("/")[0]][i.split("/")[1]][i.split("/")[2]]
            elif(len(i.split("/")) == 4):
                del res[i.split("/")[0]][i.split("/")[1]][i.split("/")[2]][i.split("/")[3]]
            elif(len(i.split("/")) == 5):
                del res[i.split("/")[0]][i.split("/")[1]][i.split("/")[2]][i.split("/")[3]][i.split("/")[4]]
            elif(len(i.split("/")) == 6):
                del res[i.split("/")[0]][i.split("/")[1]][i.split("/")[2]][i.split("/")[3]][i.split("/")[4]][i.split("/")[5]]
            elif(len(i.split("/")) == 7):
                del res[i.split("/")[0]][i.split("/")[1]][i.split("/")[2]][i.split("/")[3]][i.split("/")[4]][i.split("/")[5]][i.split("/")[6]]
            elif(len(i.split("/")) == 8):
                del res[i.split("/")[0]][i.split("/")[1]][i.split("/")[2]][i.split("/")[3]][i.split("/")[4]][i.split("/")[5]][i.split("/")[6]][i.split("/")[7]]
            elif(len(i.split("/")) == 9):
                del res[i.split("/")[0]][i.split("/")[1]][i.split("/")[2]][i.split("/")[3]][i.split("/")[4]][i.split("/")[5]][i.split("/")[6]][i.split("/")[7]][i.split("/")[8]]
            elif(len(i.split("/")) == 10):
                del res[i.split("/")[0]][i.split("/")[1]][i.split("/")[2]][i.split("/")[3]][i.split("/")[4]][i.split("/")[5]][i.split("/")[6]][i.split("/")[7]][i.split("/")[8]][i.split("/")[9]]
        except:
            continue
    return res


def mdopen(path):
    f = open(path, 'r', encoding='utf-8'); mdtxt = f.read(); f.close()
    md = markdown.Markdown(output_format='html5', extensions=[GithubFlavoredMarkdownExtension()]); openf = md.convert(mdtxt);
    return  [line.rstrip('\n') for line in openf.split("\n")]


