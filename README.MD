## Programming 5 - Festival Viewer
A website where you can view artists and festivals. You can see who is performing at what festival.

### Elias Henni

## Build Information:

- Spring Boot 2.6.1
- Java 17
- SDK version 17

### Database

The application uses a PostgreSQL database on port 5434

#### Commands

From the project root, create the docker image. It can be created from the `Dockerfile`:

```shell
docker build -t "festivals_db_image:Dockerfile" .
```

Next, create a container. This gives the container the name `festivals_db_container`:

```shell
docker create --name festivals_db_container -p 5434:5432 festivals_db_image:Dockerfile
```

Start the container:

```shell
docker container start festivals_db_container
```

## Build/Run Instructions:
- Run Application: ``./gradlew bootRun``
