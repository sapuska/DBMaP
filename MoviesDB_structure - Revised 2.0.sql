CREATE TABLE users( 
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    YOB INT NOT NULL
);

CREATE TABLE genres( 
    genre_name VARCHAR(255) NOT NULL PRIMARY KEY
);

CREATE TABLE movies( 
    movie_id SERIAL NOT NULL PRIMARY KEY,
    movie_name VARCHAR(255) NOT NULL,
    movie_year INT NOT NULL,
    genre_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (genre_name) REFERENCES genres(genre_name)
);

CREATE TABLE reviews( 
    review_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    stars INT NOT NULL,
    review_text TEXT,
    movie_id SERIAL NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
);

CREATE TABLE favorites( 
    favorite_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    movie_id SERIAL NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
);