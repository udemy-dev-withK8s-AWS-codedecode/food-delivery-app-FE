pipeline {
  agent any

tools {
    nodejs "Nodejs"
}

 environment {
    DOCKER_REGISTRY = "docker.io"
    DOCKERHUB_CREDENTIALS = credentials('DOCKER_HUB_CREDENTIAL')
    VERSION = "${env.BUILD_ID}"
  }

  stages {

 stage('Install Dependencies') {
      steps {

        sh 'npm ci'
      }
    }

    stage('Build Project') {
      steps {
        // Build the Angular project
        sh 'npm run build'
      }
    }


    stage('Docker Build and Push') {
      steps {
          sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
          sh 'docker build -t codedecode25/food-delivery-app-fe:${VERSION} .'
          sh 'docker push codedecode25/food-delivery-app-fe:${VERSION}'
      }
    }


     stage('Cleanup Workspace') {
      steps {
        deleteDir()
      }
    }

     stage('Update Image Tag in GitOps') {
      steps {
         checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'git-ssh', url: 'git@github.com:udemy-dev-withK8s-AWS-codedecode/deployment-folder.git']])
        script {
          // Set the new image tag with the Jenkins build number
       sh '''
          sed -i "s/image:.*/image: codedecode25\\/food-delivery-app-fe:${VERSION}/" aws/angular-manifest.yml
        '''

          sh 'git checkout master'
          sh 'git add .'
          sh 'git commit -m "Update image tag"'
        sshagent(['git-ssh'])
            {
                  sh('git push')
            }
        }
      }
    }
  }

}


