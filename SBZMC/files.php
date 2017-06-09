<?php
function getFileList($dir) {
    $files = glob(rtrim($dir, '/') . '/*');

    $list = array();
    foreach ($files as $file) {
	if (preg_match("/^\./", basename($file))){ continue; }
	if (preg_match("/^__/", basename($file))){ continue; }
	if (preg_match("/^Maildir/", basename($file))){ continue; }
        if (is_file($file)) {
            $list = array_merge($list, array(basename($file) => basename($file)));
        }
        if (is_dir($file)) {
            $list = array_merge($list, array(basename($file) => getFileList($file)));
        }
    }

    return $list;
}

print_r(json_encode(getFileList("../", true)));
