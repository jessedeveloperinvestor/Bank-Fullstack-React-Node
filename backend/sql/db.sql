CREATE TABLE IF NOT EXISTS users (
login VARCHAR(40) NOT NULL PRIMARY KEY,
password VARCHAR(300) NOT NULL,
name VARCHAR(90) NOT NULL);

-- list al tables
\dt

select * from users;

-- ALTER TABLE products ADD CONSTRAINT products_admin_id_admin_id FOREIGN KEY (admin_id) REFERENCES admin(id);

-- DROP TABLE IF EXISTS users;