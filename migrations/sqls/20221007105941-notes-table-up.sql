/* Replace with your SQL commands */

CREATE TABLE notes(
 id SERIAL PRIMARY KEY,
 title VARCHAR(50) NOT NULL,
 details TEXT NOT NULL,
 category VARCHAR(50) NOT NULL
 );