INSERT INTO favorites (username, movie_id) VALUES 
('anneli2', 4),
('lizzy', 8),
('anneli2', 2),
('boss', 5);

INSERT INTO genres VALUES 
('drama'), ('comedy'), ('scifi'), ('fantasy'), ('action'), ('thriller'), ('adventure');

INSERT INTO movies (movie_name, movie_year, genre_name) VALUES
('Inception', 2010, 'action'),
('The Terminator', 1984, 'action'),
('Tropic Thunder', 2008, 'comedy'),
('Borat', 2006, 'comedy'),
('Interstellar', 2014, 'drama'),
('Joker', 2019, 'drama'),
('Sonic the Hedgehog', 2020, 'adventure'),
('The Simpsons Movie', 2007, 'comedy');

INSERT INTO reviews (username, stars, review_text, movie_id) VALUES
('siili', 0, 'maidoton', 7),
('anneli2', 5, 'hyvä', 2),
('anneli2', 3, 'society', 6);

INSERT INTO users VALUES
('reimarii', 'Reima Riihimäki', 'qwerty123', 1986),
('lizzy', 'Lisa Simpson', 'abcdef', 1991),
('boss', 'Ben Bossy', 'salasana', 1981),
('siili', 'Pieni Siili', 'maito112', 2000),
('anneli2', 'Anneli Peränen', 'pötkö101', 2012);