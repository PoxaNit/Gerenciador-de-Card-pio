<?php

 $curl = curl_init();

 curl_setopt($curl, CURLOPT_URL, "http://0.0.0.0:8000/retornar_dados.php");

 curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

 $resposta = curl_exec($curl);

 curl_close();

 echo $resposta;
