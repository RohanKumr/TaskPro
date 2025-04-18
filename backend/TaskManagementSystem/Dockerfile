FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the Maven-built jar from target/
COPY target/*.jar app.jar

# Expose the port (Render will override this with $PORT)
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
