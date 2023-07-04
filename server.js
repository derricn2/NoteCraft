// import module
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 5500;

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static('public'));

// Read notes from the db.json file
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });  


// Save a new note to the db.json file
app.post('/api/notes', (req, res) => {
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
  
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      notes.push(newNote);
      fs.writeFile(
        path.join(__dirname, '/db/db.json'),
        JSON.stringify(notes),
        (err) => {
          if (err) throw err;
          res.json(newNote);
        }
      );
    });
  });
  

// two routes; one for homepage, one for notes page, both routes send the corresponding HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

// additional HTML route in case of typos
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// express app listening on port
app.listen(PORT, () => {
    console.log(`App Listening at http://localhost:${PORT}`)
});