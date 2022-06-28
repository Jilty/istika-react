#! bin/bash
sudo apt-get install certbot python3-certbot-nginx -y 2>&1 >/dev/null
# certbot run -n --nginx --agree-tos -d istika.tk,www.istika.tk  -m  jiltyissac2010@gmail.com  --redirect

# sudo apt-get install -y certbot python3-certbot-nginx
# read -p PROMPT jiltyissac2010@gmail.com
# sudo certbot --nginx -d istika.tk -d www.istika.tk
# read -p PROMPT 2
