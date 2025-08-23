FROM openjdk:17-jdk-slim

WORKDIR /app

COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn .mvn

RUN chmod +x ./mvnw

RUN ./mvnw dependency:go-offline -B

COPY src ./src

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

ENV MONGODB_URI="mongodb://localhost:27017/charchahub"
ENV CORS_ALLOWED_ORIGINS="http://localhost:3000"
ENV SERVER_PORT=8080

CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]
