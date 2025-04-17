# Use Java 17 base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the built jar into the container
COPY build/libs/*.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "app.jar"]
