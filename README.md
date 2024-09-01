# Project name: contacts-app

### Frontend

- Angular 18, Nodejs 20, TypeScript

### Backend

- Java 17, Micronaut, Gradle, Hibernate, OpenAPI v3

### Other software

- PostgreSQL 16, git, Docker, Postman

### Basic information

- User: user
- Password: pass
- App base URL: localhost / 127.0.0.1
- Frontend port: 4200
- Backend port: 5000
- Swagger URL: localhost:5000/swagger-ui

## Angular basic commands

### Install files
npm install -g @angular/cli

### Create new project with <project_name>

'ng new my-angular-project' OR 'ng new my-angular-project --no-standalone --routing --ssr=false'

### Create component with <component_name>

ng generate component component-name

### Add Angular material theme (Optional)

ng add @angular/material

### Install cookies service 

npm install ngx-cookie-service

### Start the application

ng serve

## Gradle basic commands

### Build project

./gradlew build

### Build run

./gradlew run

### Run test

./gradlew test

### Debug

./gradlew assembleDebug  --warning-mode=all

./gradlew assembleDebug  --stacktrace

## Startup your project

### First create executable jar from backend

cd ./backend

./gradlew shadowJar

### Then start the container from root directory

cd ..

docker-compose up --build
