CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(30) NOT NULL,
	"email" varchar(20) NOT NULL,
	"password" varchar(20) NOT NULL
);
