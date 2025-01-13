import {pgPool} from "./connection.js";
import express from "express";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Endpoint for root.
app.get('/', (req, res) => {

    console.log("Root accessed")

    res.status(200).json("Movie database root endpoint.")
});

// Endpoint for adding genres to database.
app.post("/genre", async (req, res) => {

    const genre = req.body.genre;

    try {
        await pgPool.query(
            "INSERT INTO genres VALUES ($1)", [genre]);
        res.end();
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Endpoint for viewing all movies.
app.get("/movies", async (req, res) => {

    try {
        const result = await pgPool.query(
            "SELECT movie_name name, movie_year released, genre_name genre FROM movies");
        res.json(result.rows);
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Endpoint for adding a movie into the database.
app.post("/movies", async (req, res) => {

    const name = req.body.name;
    const year = req.body.year;
    const gname = req.body.genre;

    try {
        await pgPool.query(
            "INSERT INTO movies (movie_name, movie_year, genre_name) VALUES ($1, $2, $3)", [name, year, gname]);
        res.end();
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// Endpoint for registering new users.
app.post("/register", async (req, res) => {

    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const year =  req.body.year;

    try {
        await pgPool.query(
            "INSERT INTO users VALUES ($1, $2, $3, $4)", [username, name, password, year]);
        res.end();
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Endpoint for finding movies by id.
app.get("/movies/search/:id", async (req,res) => {

    let search = req.params.id;

    try {
        let result;

        if(!search){
            result = await pgPool.query(
                "SELECT movie_name, movie_year, genre_name FROM movies");
        }else{
            search = search.toLowerCase();
            search = "%"+search+"%";
            result = await pgPool.query(
                "SELECT movie_name name, movie_year released, genre_name genre FROM movies WHERE LOWER(movie_name) LIKE $1", [search])
        }

        res.json(result.rows);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// Endpoint for deleting movies.
app.delete("/movies/:id", async (req, res) => {

    const name = req.body.name;
    const year = req.body.year;
    const gname = req.body.genre;

    try {
        await pgPool.query(
            "DELETE FROM movies WHERE movie_name = $1 AND movie_year = $2 AND genre_name = $3", [name, year, gname]);
        res.end();
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// Endpoint for finding movies with a keyword.
app.get("/movies/search", async (req, res) => {

    let keyword = req.query.keyword;

    try {
        let result;

        if(!keyword){
            result = await pgPool.query(
                "SELECT movie_name, movie_year, genre_name FROM movies");
        }else{
            keyword = keyword.toLowerCase();
            keyword = "%"+keyword+"%";
            result = await pgPool.query(
                "SELECT movie_name name, movie_year released, genre_name genre FROM movies WHERE LOWER(movie_name) LIKE $1", [keyword])
        }

        res.json(result.rows);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// Endpoint for adding reviews.
app.post("/review", async (req, res) => {

    const username = req.body.username;
    const stars = req.body.stars;
    const text = req.body.text;
    const movie =  req.body.movie;

    try {
        await pgPool.query(
            "INSERT INTO reviews (username, stars, review_text, movie_id) VALUES ($1, $2, $3, $4)", [username, stars, text, movie]);
        res.end();
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Endpoint for adding favorite movies.
app.post("/favorite", async (req, res) => {

    const username = req.body.username;
    const movie =  req.body.movie;

    try {
        await pgPool.query(
            "INSERT INTO favorites (username, movie_id) VALUES ($1, $2)", [username, movie]);
        res.end();
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Endpoint for viewing a user's favorites.
app.get("/favorite", async (req, res) => {

    let keyword = req.query.keyword;

    try {
        let result;

        if(!keyword){
            result = await pgPool.query(
                "SELECT username FROM favorites");
        }else{
            keyword = keyword.toLowerCase();
            keyword = "%"+keyword+"%";
            result = await pgPool.query(
                "SELECT f.username, m.movie_name movie FROM favorites f INNER JOIN movies m ON f.movie_id = m.movie_id WHERE LOWER(username) LIKE $1", [keyword])
        }

        res.json(result.rows);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


// Starts the server.
app.listen(3001, () => {
    console.log("The server is running :)");
});