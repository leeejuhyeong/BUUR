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
				sh 'docker build -t backend:latest /var/jenkins_home/workspace/gitlab-hook/spring_boot/buur' 
			}
		}
	}
}