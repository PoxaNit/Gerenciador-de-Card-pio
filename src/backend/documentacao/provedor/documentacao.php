<?php

 header("Content-Type: application/json");

 $html = shell_exec('for n in $(ls ../topicos/ordem/md/*.md); do php ../topicos/ordem/md/conversor/exec.php $n; done');

 echo json_encode(["html" => $html]);
