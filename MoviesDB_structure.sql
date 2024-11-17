CREATE TABLE users( 
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255),
    YOB INT
);

CREATE TABLE genres( 
    genre_id VARCHAR(255) NOT NULL PRIMARY KEY,
    genre_name VARCHAR(255)
);

CREATE TABLE movies( 
    movie_id VARCHAR(255) NOT NULL PRIMARY KEY,
    movie_name VARCHAR(255),
    movie_year INT,
    genre_id VARCHAR(255),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

CREATE TABLE reviews( 
    review_id VARCHAR(255) NOT NULL PRIMARY KEY,
    username VARCHAR(255),
    stars INT,
    review_text TEXT,
    movie_id VARCHAR(255),
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
);

CREATE TABLE favorites( 
    favorite_id VARCHAR(255) NOT NULL PRIMARY KEY,
    username VARCHAR(255),
    movie_id VARCHAR(255),
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
);