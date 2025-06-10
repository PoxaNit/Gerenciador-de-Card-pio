#!/bin/bash


 function declarar_ngrok {

     arq="aarch64"

     case $arq in

       aarch64) comando_ngrok="$(pwd)/bin/ngrokARM64"

     esac

 }


 function ngrok {

     eval "$comando_ngrok http $1"

 }

 declarar_ngrok

 ngrok 8080
