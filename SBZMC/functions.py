#!/usr/local/python/bin/python
import sys, os, os.path, markdown, codecs
sys.path.append('/home/h0/yoshihiro/.local/lib/python3.5/site-packages')
from mdx_gfm import GithubFlavoredMarkdownExtension

def maintree(dirname):
    file = []
    # with codecs.open("ignore.txt", 'r', "utf_8") as openf:
        # tmplist = [line.rstrip('\n') for line in openf if "-->" not in line]
    for i in os.listdir(dirname):
        try:
            if (i[0] == "." or i[0] == "_"):
                continue
            elif os.path.isdir(os.path.join(dirname, i.encode('utf-8', 'surrogateescape').decode('ISO-8859-1'))):
                file.insert(0,maintree(os.path.join(dirname,i.encode('utf-8', 'surrogateescape').decode('ISO-8859-1'))))
            else:
                file.append(i)  
        except:
            continue     
    file.insert(0,dirname.split('/')[-1])
    return file


def mdopen(path):
    f = open(path, 'r', encoding='utf-8'); mdtxt = f.read(); f.close()
    # md = markdown.Markdown(); openf = md.convert(mdtxt);
    md = markdown.Markdown(output_format='html5', extensions=[GithubFlavoredMarkdownExtension()]); openf = md.convert(mdtxt);
    return  [line.rstrip('\n') for line in openf.split("\n")]

