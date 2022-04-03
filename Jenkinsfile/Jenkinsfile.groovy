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

				sh 'docker run -d -p 8080:8080 --name spring'
			}
		}
		
	}
}