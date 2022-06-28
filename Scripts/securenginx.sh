#! bin/bash

sudo apt-get install -y certbot python3-certbot-nginx
read -p PROMPT jiltyissac2010@gmail.com
sudo certbot --nginx -d istika.tk -d www.istika.tk
read -p PROMPT 2
