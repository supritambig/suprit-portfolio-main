pipeline {
    agent {
        label "slave_node_java"
    }

    environment {
        DOCKERHUB_USERNAME = "suprit43"
        DOCKER_IMAGE = "webapp"
        DOCKERHUB_REPO = "dockerpr-webapp"
        VERSION = "${BUILD_ID}"
    }

    stages {

        stage("Check Docker Version") {
            steps {
                sh "docker --version"
            }
        }

        stage("Build Docker Image") {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage("Tag Docker Image") {
            steps {
                sh """
                docker tag ${DOCKER_IMAGE} ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:${VERSION}
                docker tag ${DOCKER_IMAGE} ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:latest
                """
            }
        }

        stage("Push Docker Image") {
            steps {
                sh """
                docker push ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:${VERSION}
                docker push ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:latest
                """
            }
        }

        stage("Show Docker Images") {
            steps {
                sh "docker images"
            }
        }

        stage('Run Ansible Playbook') {
            agent { label 'master' }
            steps {
                sh 'ansible-playbook -i inventory playbook.yml'
            }
        }

    }
}