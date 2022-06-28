#! bin/bash

sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d istika.tk -d www.istika.tk
read -p PROMPT 2
