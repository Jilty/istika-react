#!/bin/bash

sudo apt-get -y install nginx
sudo ufw allow 'Nginx Full'

sed -e 's/server_name _/server_name istika.tk www.istika.tk/'  /etc/nginx/sites-available/default
sed -e 's/root \/var\/www\/html/root \/var\/www\/istika.tk\/html/' /etc/nginx/sites-available/default



# sudo systemctl reload nginx
