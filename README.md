# SBZMC - 石橋ゼミマイソースコード公開プログラム
### Overview
+ 石橋ゼミサーバにある自分のソースコードを公開するプログラム。
+ Gitなどを毎度しなくてもソースコード/ファイルツリーを自動で見ることができる
+ リンクに飛んだり、ファイルをダウンロードすることも可能。
+ "http://gms.gdl.jp/~ユーザ名/sbzmc/" でSBZMCのトップページへ入れることができる。

### Description
+ ソースコード/ファイルツリーについて
    + メインパネル(ソースコード/README.md)
        + メインパネルには<b>ソースコードか.mdファイルの内容</b>が表示される。
        + ソースコード、.mdファイルは右上の"wrap", "scroll"ボタンで、横折り返し、横スクロールに切り替えることが可能。
        + .mdファイルはマークダウンで書かれたものをそのまま表示せず、HTMLに変換して表示される
    + リンクボタン, ダウンロードボタン
        + リンクボタンを押すと、そのソースコードのWebページに飛ぶことが可能。
        + 具体的には、public_htmlの下と、link.txtの記載されたファイルの所属するフォルダ内のファイルがリンクボタンがアクティブになる。
        + またダウンロードボタンを押すと、ポップアップが表示されて、OKでソースコードをダウンロードすることが可能。
        + ただしもちろん、置換された文字列などはそのまま置換されたままで表示される。
    + link.txt
        + あるフォルダの中に"link.txt"というファイルを置き、そのなかにURLを記載すると、そのファイルと同じ階層のファイルは全てLINKボタンからそのURLにジャンプすることが可能になる。
    + ignore.txt <b style="color:crimson;">(まだ未実装)</b>
        + SBZMCフォルダの中に"ignore.txt"というファイルを置くと、その中のファイル名をファイルツリーで辿れなくしたり、パスワードなどの文字列を伏字にすることができる。
        + <b>ホームディレクトリからの</b>ファイルパスを記載すると、そのファイルはファイルツリーに表示されなくなり、直接URLを叩いてもそのファイルを表示することができなくなる。
        + また、[ ファイルパス: "置換したい文字列" --> "置換する文字列" ] と記載することで、そのファイルの中の文字列を置換することが可能。
    + ほか仕様
        + SBZMCフォルダ、ignore.txt記載ファイル、隠しファイル、公開パーミッション"-r"などのファイルはツリーから辿れなくなっている。(URLも同様)<b style="color:crimson;">(まだ未実装)</b>
        + スマホナビゲーションメニューは、スクロールして閉じてもまた、上にスクロールリセットがかかるようにしている。
        + Twitter, OGPカードの自動設定。
        + フォルダ名にURLを渡すと、その下のREADME.mdを読みに行く。(リダイレクト)
        + 500以外のエラーはエラー内容がメインパネルに表示される。
        + ファイルのネストは10階層まで対応。
        + SBZMC/static/customForUserの中にbackground, profimg, INDEX.mdを入れると、スマホナビゲーションメニュー背景、プロフ画像、トップページが反映される。
+ binフォルダ/formattingコマンドについて
    + 石橋サーバでは、binフォルダをホームディレクトリの下に置くと、その中のshelll,bashファイルはファイル名入力でそのままコマンドとして使用することが可能。
        + ホームディレクトリ...CUIで石橋ゼミサーバにログインして一番初めに自分が位置している階層。/home/h0/ユーザ名/←ここ
    + formattingコマンドは次の4つをします。
        + フッター部分の著作権年(SBZMCをアップロードした年)の設定
        + パーミッションの調整
        + +rの入っていないファイルの表示
        + "password"と書かれたファイルの表示、警告
+ カスタマイズ(static/customForUser)
    + static/customForUser/color.cssに色系デザインをまとめているので適宜変更してもよい
    + static/customForUser/INDEX.mdというファイルを作ると、トップページでそれを読み込む。
    + static/customForUser/indeximg.画像拡張子という画像ファイルを置くとユーザー画像を変更可能
    + static/customForUser/background.画像拡張子という画像ファイルを置くとスマホナビゲーション背景画像を変更可能
    + ほか、main.jsの中で背景のラインの色を変えることも可能。ただしこちらは自己責任で。

### Demo
+ <a style="font-size:130%;" href="http://gms.gdl.jp/~yoshihiro/sbzmc/">  --http://gms.gdl.jp/~yoshihiro/sbzmc/</a>

### Usage
1. ここGithubからDownloadしてzipファイルを解凍する。
2. その解凍されたフォルダの中に入っている"SBZMC"フォルダ, "bin"フォルダを$scpコマンドかFTPを使って、石橋ゼミサーバの自分のホームディレクトリにアップロードする。
    + <b>ただし、自分のホームディレクトリの中にbinフォルダがすでにある場合、解凍されたbinフォルダの中の"formatting"ファイルを、すでにあるbinフォルダの中にアップロードする。</b>
    + "$cd ~" コマンドでホームディレクトリに移動でき、pwdで自分の位置を確認できます。
    + 結果的に <b>/home/h0/ユーザー名/SBZMC と /home/h0/ユーザー名/bin</b> となればOK!
3. formattingコマンドを入力し初期化する。(ただ"formatting"と入力してエンター。)formattingコマンドを打つと色々指示が出てくるので各々従うこと。
4. 石橋先生に/etc/httpd/conf.d/mod_wsgi.confのとこに設定を追加してもらう

```
ScriptAlias /~ユーザー名/sbzmc /home/h0/ユーザー名/SBZMC/connect.cgi
<Directory "/home/h0/ユーザー名/SBZMC">
        Options ExecCGI
        Order allow,deny
        Allow from all
        #SSLRequireSSL
</Directory>
```

### Support

| date | Change-Detail |
|:---:|:--------------:|
| 2016-01-06 | pulishing all file first. |
| | |
| | |

### Requirement
+ Frontends
    + HTML5
    + CSS3
    + Javascript
        + <a href="https://slideout.js.org/">slideout.js</a>
    + Design
        + <a href="http://genericons.com/">Genericon</a>
    + Fonts
        + <a href="https://www.behance.net/gallery/11696089/quasith-free-font">Quasith-Regular</a>
        + <a href="https://fonts.google.com/specimen/Source+Code+Pro">Source Code Pro(GoogleFonts)</a>
+ Backends
    + Python(3.5)
        + Flask(Python/Webアプリケーションフレームワーク)
        + Jinja2(Python/HTMLテンプレート)
    + ShellScript(bin/formatting)

### Author
+ Yoshihiro-F (<a href="https://github.com/Yoshihiro-F/">@Yoshihiro-F</a>)
    + His webpage -<a href="http://gms.gdl.jp/~yoshihiro">-http://gms.gdl.jp/~yoshihiro</a>

### LICENCE
##### Copyright (c) 2016 Yoshihiro Furudate
##### Released under the MIT license
##### http://opensource.org/licenses/mit-license.php
