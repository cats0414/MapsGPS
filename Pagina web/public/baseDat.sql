CREATE DATABASE Employees;
USE Employees;
CREATE TABLE usuarios(
    id int(11) NOT NULL, 
    latitud float(16) NOT NULL,
    longitud float(16) NOT NULL,
    tiempo VARCHAR(30) NOT NULL
);

CREATE TABLE links(
    id INT(11) NOT NULL,
    tittle VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES usuarios(id)


);
ALTER TABLE links
    ADD PRIMARY KEY (id);  /*Poner para ambas tablas
DESCRIBE usuarios;  