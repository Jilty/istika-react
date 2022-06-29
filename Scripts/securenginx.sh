#! bin/bash
sudo apt-get install certbot python3-certbot-nginx -y 2>&1 >/dev/null
certbot run -n --nginx --agree-tos -d istika.tk,www.istika.tk  -m  jiltyissac2010@gmail.com  --redirect 2>&1 >/dev/null


