#!/bin/bash

echo "Starting PostgreSQL server..."
pg_ctl -D "/Users/omarya/Library/Application Support/Postgres/FinSightServer" start

sleep 2

echo "Starting Spring Boot application..."
cd ../finsightapi
./mvnw spring-boot:run &
BACKEND_PID=$!

sleep 5

echo "Starting React application..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!