# Backend 포팅 메뉴얼

### 소개

Buur 빌드 메뉴얼

## Spring Boot

### 기술 스택 및 버전

| Project     | Version |
| ----------- | ------- |
| Java        | 8       |
| Spring boot | 2.6.4   |
| Swagger     | 3.0.0   |

### 배포

Dockerfile

```jsx
FROM openjdk:8 AS builder
WORKDIR /buur
COPY . .
RUN chmod +x ./gradlew

RUN rm -rf src/test
RUN ./gradlew clean build
RUN ls build/libs

FROM adoptopenjdk:8-jdk
COPY --from=builder /buur/build/libs/*.jar ./

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./buur-0.0.1-SNAPSHOT.jar"]
```

## MySQL

### 기술 스택 및 버전

| Project | Version |
| ------- | ------- |
| MySQL   | 8.0.28  |

### 배포

MySQL 계정 & DB 생성

```bash
# MySQL 설치
sudo apt update
sudo apt install mysql-server

# Mysql 접속
sudo mysql -u root -p mysql

# 특정 사용자 생성
create user 'buur'@'%' identified by '<Mysql_password>';
# 특정 사용자에게 권한 부여 (%:모든 곳에서 접속 허용)
grant all privileges on *.* to buur@'%';
# 변경사항 저장
flush privileges;

# Database 계정 권한 보기
show grants for buur;

# Database 생성
create database if not exists 'buur' collate utf8mb4_general_ci;

# mysql 종료
exit
```

MySQL 설정

```bash
# 해당 경로로 이동
cd /etc/mysql/mysql.conf.d
# mysql.config 파일을 열어 IP주소를 변경
sudo vi mysqld.cnf

# bind-address 주소 변경 (127.0.0.1 -> 0.0.0.0)
bind-address = 0.0.0.0

# 저장 및 종료
:wq!

# MySQL 재시작
sudo service mysql restart
```

## Django

### 기술 스택 및 버전

ubuntu apt install list

| Python             | 3.9.5  |
| ------------------ | ------ |
| Django             | 4.0.3  |
| libmysqlclinet-dev | 8.0.28 |
| gcc                | 9.3.0  |
| python3-dev        | 3.8.2  |
| mysqlclient        | 2.1.0  |
| numpy              | 1.22.3 |
| pandas             | 1.4.1  |
| scipy              | 1.8.0  |
| scikit             | 1.0.2  |
| gunicorn           | 20.0.4 |
| nginx              | 1.18.0 |

ubuntu pip install list
| mysqlclient | 2.1.0 |
| --- | --- |
| numpy | 1.22.3 |
| pandas | 1.4.1 |
| scipy | 1.8.0 |
| scikit | 1.0.2 |

### 배포

- python3.9-venv 설치
  - sudo apt install python3.9-venv
- venv setting
  - sudo python -m venv venv
- pip3 install -r requirements.txt
- gunicorn 서비스 등록

```bash
  [Unit]
  Description=gunicorn daemon
  After=network.target

  [Service]
  User=ubuntu
  Group=www-data
  WorkingDirectory=/home/S06P22B102/django
  ExecStart=/usr/local/bin/gunicorn --workers 1 --bind 0.0.0.0:8000 buur.wsgi:application

  [Install]
  WantedBy=multi-user.target
```
