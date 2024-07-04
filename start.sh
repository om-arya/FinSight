#!/bin/bash

echo "Starting Docker container..."
cd finsightapi
docker-compose up &
CONTAINER_PID=$!

echo "Starting Spring Boot application..."
cd finsightapi
./mvnw spring-boot:run &
BACKEND_PID=$!

sleep 5

echo "Starting React application..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

WAIT $CONTAINER_PID
wait $BACKEND_PID
wait $FRONTEND_PID