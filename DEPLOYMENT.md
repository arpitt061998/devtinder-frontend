

#DEPLOYMENT
- signup on AWS
- Launch instance
- chmod 400 <secret.pm>
- connected to the machine(terminal) using (ssh -i "devTinder-secret.pem" ubuntu@ec2-54-145-227-91.compute-1.amazonaws.com)
- install same node version installed in your local.
- install nginx on your aws machine(because it provides http server)
- sudo systemctl start nginx
- sudo systemctl enable nginx
- copy dist folder from your project to /var/www/html/ fir frontend applicationo
- Enable port :80 of your instance as default port will be 80 in nginx conf file.
# BACKEND
- whitelist your ec2 instance ip on mongo server
- installed pm2 globally
- pm2 start npm -- start to run your application in background.
- pm2 start "npx ts-node src/app.ts" --name devtinder-backend
- pm2 logs - use for checking logs
- pm2 stop <process_name> - used for stopping process
- Enable port :3000 on your aws machine
- edit nginx proxy pass on /etc/nginx/sites-available/default path.
- add below code on specified path
    server_name <yourdomain.com>;  # Replace with your actual domain
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
- this will redirect any  request with prefix [<yourdomain or ip>/api] to localhost:3000 where your backend is running

# DOMAIN
- now go on godaddy or any other domain hosting site to buy domain of your choice
- go to cloudflare enter your domain
- copy nameserver from cloudflare and replace godaddy provided nameserver with cloudflare nameserver.
- it may take around 15mins to register your updated nameserver.
- go to cloudflare configure your domain with ip provided by aws.
- go to ssl setting edit ssl setting to flexible.

# sending email via SES
- craete a IAM user
- Give access to amazonsesfullaccess
- AMAZON SES: create an indentuty
- verify email and domain
- verify email for sending mail to particular user(applicable for sandbox only not for production)
- install aws sdk v3 on your nodejs system
- setup ses client
- access cred must be created in under security credentialtab
- add the cred to env file
- write code for sesclient
- write code for sending email.

# payment gateway integration
