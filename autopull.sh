#!/bin/bash
cd MapsGPS
echo 'Verificando cambios'
git pull origin main 
echo 'Up to date'
cd 'Pagina web'
node server.js
