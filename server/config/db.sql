CREATE DATABASE twitterclone;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_At INTEGER NOT NULL DEFAULT extract(epoch from now() at time zone 'utc'),
    updated_At INTEGER NOT NULL DEFAULT extract(epoch from now() at time zone 'utc'),
    UNIQUE(email)
);

CREATE TABLE posts (
    post_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    content VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) REFERENCES users (email),
    user_name VARCHAR(255),
    created_At INTEGER NOT NULL DEFAULT extract(epoch from now() at time zone 'utc'),
    updated_At INTEGER NOT NULL DEFAULT extract(epoch from now() at time zone 'utc')
);

INSERT INTO users (first_name, last_name, email, password) VALUES ('Eddy', 'Yi', 'superywan@gmail.com', '123456');
INSERT INTO posts ( content, user_email) VALUES ('hello this is sample post', 'superywan@gmail.com');