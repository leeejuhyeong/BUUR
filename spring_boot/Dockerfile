FROM openjdk:8 AS builder
WORKDIR /spring_boot
COPY . .
RUN chmod +x ./gradlew

RUN rm -rf buur/src/test
RUN ./gradlew :buur:clean build
RUN ls buur/build/libs

FROM adoptopenjdk:8-jdk
COPY --from=builder /spring_boot/buur/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./app.jar"]