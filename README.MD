# Festival Viewer
A website where you can view artists and festivals, and see who is performing at what festival.

### Created by Elias Henni

## Build Information:

- **Framework**: Spring Boot 2.6.1
- **Programming Language**: Java 17
- **SDK Version**: 17

## Prerequisites
Before you start, ensure you have the following installed:
- Docker
- npm (Node Package Manager)
- webpack

## Database Setup
The application uses a PostgreSQL database that runs on port 5434.

### Setting Up the Database with Docker

1. **Install Dependencies**: Run the following command in your terminal to install the necessary Node.js dependencies:

    ```shell
    npm install
    ```

2. **Create Docker Image**: Navigate to the project root directory and build a Docker image from the provided `Dockerfile`. This command tags the image as `festivals_db_image`:

    ```shell
    docker build -t festivals_db_image .
    ```

3. **Create Docker Container**: Create a new Docker container named `festivals_db_container` that maps port 5434 on your machine to port 5432 inside the container, which is the default port for PostgreSQL:

    ```shell
    docker create --name festivals_db_container -p 5434:5432 festivals_db_image
    ```

4. **Start the Container**: Start the Docker container with the following command:

    ```shell
    docker container start festivals_db_container
    ```

## Build and Run Instructions

After setting up the database, you can build and run the application with the following command:

- **Run Application**: Execute the command below in your terminal:

    ```shell
    ./gradlew bootRun
    ```

This command starts the Spring Boot application. Once the application is running, you should be able to access the Festival Viewer website on your local machine.
