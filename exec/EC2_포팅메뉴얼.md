# Backend 포팅 메뉴얼

### 소개

Buur 빌드 메뉴얼

## NGINX

etc/nginx/sites-available/default

```bash
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        server_name j6b102.p.ssafy.io;

        return 301 https://$server_name$request_uri;

        index index.html index.htm;
}

server {
        listen 443 ssl;
        listen [::]:443 ssl;

        server_name j6b102.p.ssafy.io;

        ssl_certificate /etc/letsencrypt/live/j6b102.p.ssafy.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/j6b102.p.ssafy.io/privkey.pem;

        root /home/ubuntu/buur/front/build;
        index index.html;

        location / {
                try_files $uri $uri/ /index.html;
        }

        location /api-v1 {
                proxy_pass http://j6b102.p.ssafy.io:8080;
                proxy_redirect off;
                charset utf-8;

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-NginX-Proxy true;
        }

        location /api-v2 {
                proxy_pass http://j6b102.p.ssafy.io:8000;
                proxy_redirect off;
                charset utf-8;

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-NginX-Proxy true;

                proxy_buffer_size          128k;
                proxy_buffers              4 256k;
                proxy_busy_buffers_size    256k;
        }

				location /swagger-ui {
                proxy_pass http://j6b102.p.ssafy.io:8080;
                proxy_redirect off;
                charset utf-8;

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-NginX-Proxy true;
        }

        location /v2/api-docs {
                proxy_pass http://j6b102.p.ssafy.io:8080;
               proxy_redirect off;
                charset utf-8;

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-NginX-Proxy true;
        }

        location /swagger-resources {
                proxy_pass http://j6b102.p.ssafy.io:8080;
                proxy_redirect off;
                charset utf-8;

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-NginX-Proxy true;
        }
}
```

## Jenkins

### Plugin 및 버전

| Plugin                  | Version |
| ----------------------- | ------- |
| GitLab Plugin           | 1.5.29  |
| Generic Webhook Trigger | 1.83    |

pipline script SCM

```jsx
pipeline {
	agent none
	options { skipDefaultCheckout(false) }
	stages {
		stage('git pull') {
			agent any
			steps {
				checkout scm
			}
		}
		stage('Docker build') {
			agent any
			steps {
				sh 'docker build -t spring:latest /var/jenkins_home/workspace/gitlab-hook/spring_boot/buur'
			}
		}
		stage('Docker run') {
			agent any
			steps {
				sh 'docker ps -f name=spring -q \
		| xargs --no-run-if-empty docker container stop'

				sh 'docker container ls -a -f name=spring -q \
		| xargs -r docker container rm'

				sh 'docker images -f dangling=true && docker rmi $(docker images -f dangling=true -q)'

				sh 'docker run -itd -v /home/ubuntu/buur:/home/ubuntu/buur -p 8080:8080 --name spring spring'
			}
		}

	}
}
```
