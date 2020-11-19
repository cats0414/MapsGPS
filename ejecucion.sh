#!/bin/bash
cd MapsGPS
git pull origin main
cd 'Pagina web'
node server.js
echo 'Conectando'
