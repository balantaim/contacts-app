# Dockerfile for b-end
FROM openjdk:17-jdk

WORKDIR /app

COPY build/libs/*.jar contacts-app-1.0-all.jar

EXPOSE 5000

CMD ["java", "-jar", "contacts-app-1.0-all.jar"]