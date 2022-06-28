#!/bin/bash

sudo apt-get -y install nginx
sudo ufw allow 'Nginx Full'

sed -i /etc/nginx/sites-available/default 's/server_name _/server_name istika.tk www.istika.tk/'  /etc/nginx/sites-available/default

# sudo systemctl reload nginx
