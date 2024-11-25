import express from 'express';

var app = express();


app.listen(3001, () => {
    console.log('The server is running :)');
});

// Defining an endpoint
app.get('/', (req, res) => {
    // We go here if this endpoint is called (e.g. from browser)
    console.log('It is working')
    res.send('Movie database root endpoint')
});

// Another endpoint
app.get('/genre', (req, res) => {
    res.send('Genre page');
});

app.get('/movie', (req, res) => {
    res.send('List of movies');
});

app.get('/register', (req, res) => {
    res.send('Registeration page');
});

app.get('/review', (req, res) => {
    res.send('Movie reviews go here');
});

app.get('/favorite', (req, res) => {
    res.send('For viewing user favorites');
});