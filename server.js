// import express module
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5500;

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static('public'));

// two routes; one for homepage, one for notes page, both routes send the corresponding HTML file
app.get('/', (req, res) => {
    res.sendFile(--dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

// express app listening on port
app.listen(PORT, () => {
    console.log(`App Listening at http://localhost:${PORT}`)
});