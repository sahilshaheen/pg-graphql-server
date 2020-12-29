-- CREATE TABLE "user" (
--     id SERIAL PRIMARY KEY,
--     username TEXT NOT NULL,
--     email TEXT NOT NULL
-- );

-- CREATE TABLE "post" (
--     id SERIAL PRIMARY KEY,
--     title TEXT NOT NULL,
--     content TEXT NOT NULL,
--     user_id INTEGER NOT NULL REFERENCES "user"(id)
-- );

-- should probably use GENERATED ALWAYS AS IDENTITY otherwise will have to specify column names (?)

-- INSERT INTO "user" (username, email) VALUES ('sahil', 'sahil@aawaaz.co');
-- INSERT INTO "user" (username, email) VALUES ('mathew', 'mathew@aawaaz.co');

-- SELECT * FROM users;

-- INSERT INTO "post" (title, content, user_id) VALUES ('my first post', 'this is my first post', 1);
-- INSERT INTO "post" (title, content, user_id) VALUES ('hello world', 'this is MY first post', 2);

-- SELECT * FROM posts
-- JOIN users
-- ON users.id = posts.user_id;

-- DELETE FROM "post";