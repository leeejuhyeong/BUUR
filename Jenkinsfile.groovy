pipeline {
	agent none
	options { skipDefaultCheckout(false) }
	stages {
		stage('git pull') { # pull 받아오는 상태
			agent any
			steps {
				checkout scm
			}
		}
	}
}