CREATE TABLE helo_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100),
    profile_pic TEXT
);

CREATE TABLE helo_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    content text,
    img text,
    author_id INT REFERENCES helo_users(id),
    date_created timestamp
);