FROM maven:3.8.6-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENV MONGODB_URI="mongodb://localhost:27017/charchahub"
ENV CORS_ALLOWED_ORIGINS="http://localhost:3000"
ENV SERVER_PORT=8080

CMD ["java", "-jar", "app.jar"]
