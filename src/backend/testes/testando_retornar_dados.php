<?php

 $comando = 'curl -X POST -H "Content-Type: application/json" -d \'{"autenticado":"jc.5047792@gmail.com"}\' http://0.0.0.0:8000/retornar_dados.php';

 $resposta = shell_exec($comando);

 $info_json = json_decode($resposta, true);

 header("Content-Type: application/json");

 echo json_encode($info_json["info"], true);
