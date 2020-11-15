#!/bin/bash
cd MapsGPS
git pull origin master
cd 'Pagina web'
node server.js
echo 'Conectando'
