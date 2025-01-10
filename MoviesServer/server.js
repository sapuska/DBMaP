import {pgPool} from './connection.js';
import express from 'express';
//import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

//const {Client} = pg;

const SQL = {
    INSERT_MOVIE: "INSERT INTO movies (movie_name, movie_year, genre_name) VALUES ($1, $2, $3)",
    GET_MOVIE: "SELECT * FROM movies"
}

try {
    const result = await pgPool.query(SQL.INSERT_MOVIE, ['Hop', 2011, 'comedy']);
    console.log(result.rows);
    
} catch (error) {
    console.log(error.message);
    
}

// Unused for now.
// app.use(express.urlencoded({extended: true}));


// Following codeblock is for connecting to the postgres database and inserts test values with an SQL command to users table.
//connect();

//async function connect() {

//    try {
//        await client.connect();
//        await client.query("INSERT INTO users VALUES ('testuser', 'test', 'password123', '2000')");
//        console.log('Database connected!');

//    } catch (error) {
//        console.log(error.message);
//    }
//}


// Defining a simple endpoint. In this case, it's root.
app.get('/', (req, res) => {

// What the console shows when root is accessed.
    console.log('Root accessed')

// Response for if this endpoint is called (e.g. from browser). Includes 200 (OK) status.
    res.status(200).json('Movie database root endpoint')
});


// Another simple endpoint.
app.get('/genre', (req, res) => {

    res.json('Genre page');
});


// TEST users for array endpoint.
const users = ['carrot', 'turnip', 'fennel'];


// Endpoint that checks for input in an array.
app.get('/user', (req, res) => {

    console.log(req.params['m_name']);

// Variable to store the username input.
    let username = req.query.username;

// When input is in the user array. Includes 200 (OK) status.
    if(users.some(u => u == username)){

        res.status(200).send('Target acquired.')
    }

// When input isn't in the user array. Includes 404 (not found) status.
    else{
        res.status(404).json({error: 'User does not exist.'})
    }
});


// Endpoint with an optional path.
app.get('/movie/:m_name?', (req, res) => {
    console.log(req.params['m_name']);

// Stores the name input.
    let m_name = req.params.m_name;

// Response for the name path.
    if(req.params.m_name){
        res.json('You typed in ' + m_name)
    }

    else{
    res.json('Type in a movie');
    }
});


// Simple endpoint.
app.get('/register', (req, res) => {

    res.json('Registeration page');
});


// Simple endpoint.
app.get('/review', (req, res) => {

    res.json('Movie reviews go here');
});


// Simple endpoint.
app.get('/favorite', (req, res) => {

    res.json('For viewing user favorites');
});


// Starts the server.
app.listen(3001, () => {
    console.log('The server is running :)');
});