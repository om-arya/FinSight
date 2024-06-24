DROP TABLE IF EXISTS "users";

CREATE TABLE "users" (
    "username" bigint,
    "password" text,
    "name" text,
    "emailaddress" text,
    CONSTRAINT "users.pkey" PRIMARY KEY ("username")
);