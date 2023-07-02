// import Express module, fs module, and create router
const express = require('express');
const fs = require('fs');
const router = express.Router();

// GET /api/notes: get all notes
router.get('/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read notes data' });
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});
