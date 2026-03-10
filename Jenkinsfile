pipeline {
    agent {
        label "slave_node_java"
    }

    environment {
        DOCKERHUB_USERNAME = "suprit43"
        DOCKER_IMAGE = "webapp"
        DOCKERHUB_REPO = "dockerpr-webapp"
        VERSION = "${BUILD_ID}"
        CONTAINER_NAME = "app"
        CONTAINER_PORT = "8085"
        REQUEST_PORT = "80"
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

        stage("Show Docker Images") {
            steps {
                sh "docker images"
            }
        }

        stage("Remove Old Container") {
            steps {
                sh "docker rm -f ${CONTAINER_NAME} || true"
            }
        }

        stage("Run Docker Container") {
            steps {
                sh """
                docker run -d \
                --name ${CONTAINER_NAME} \
                -p ${CONTAINER_PORT}:${REQUEST_PORT} \
                ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:latest
                """
            }
        }

        stage("Remove Local Docker Image") {
            steps {
                sh "docker rmi -f ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:${VERSION} || true"
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