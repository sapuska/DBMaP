import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const {Client} = pg;

// Unused for now.
app.use(express.urlencoded({extended: true}));


app.listen(3001, () => {
    console.log('The server is running :)');
});

// Connection credentials.
const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT
});


// Following codeblock is for connecting to the postgres database and inserts test values with an SQL command to users.
connect();

async function connect() {

    try {
        await client.connect();
        await client.query("INSERT INTO users VALUES ('testuser', 'test', 'password123', '2000')");
        console.log('Database connected!');

    } catch (error) {
        console.log(error.message);
    }
}


// Defining a simple endpoint. In this case, it's root.
app.get('/', (req, res) => {

// What the console shows when root is accessed.
    console.log('Root accessed')

// Response for if this endpoint is called (e.g. from browser). Includes 200 (OK) status.
    res.status(200).send.json('Movie database root endpoint')
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
        res.status(404).send.json({error: 'User does not exist.'})
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