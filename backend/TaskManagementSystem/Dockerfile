# Stage 1: Build the Maven project
FROM maven:3.8.6-openjdk-17 AS build

# Set working directory for Maven build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .

# Download Maven dependencies
RUN mvn dependency:go-offline

# Copy the source code and build the project
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime container with the JAR file
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the JAR file from the build stage to the final image
COPY --from=build /app/target/*.jar app.jar

# Expose the port your app runs on (Render will override this)
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
