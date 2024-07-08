FROM paketobuildpacks/builder:base AS build

WORKDIR /app

COPY . /app

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/finsightapi-0.0.1-SNAPSHOT.jar"]