FROM openjdk:8 AS builder
COPY . .
RUN chmod +x ./gradlew

RUN rm -rf src/test
RUN ./gradlew clean build
RUN ls build/libs

FROM adoptopenjdk:8-jdk
COPY --from=builder /spring_boot/buur/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./app.jar"]