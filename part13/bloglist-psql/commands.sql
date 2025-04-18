CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes INTEGER DEFAULT 0);

INSERT INTO blogs (author, url, title, likes) VALUES ('Dan Abramov', 'https://overreacted.io/', 'On let vs const', 10);

INSERT INTO blogs (author, url, title, likes) VALUES ('Martin Fowler', 'https://martinfowler.com/', 'Microservices', 15);

SELECT * FROM blogs;


