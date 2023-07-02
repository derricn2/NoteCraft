// import express module
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;



// express app listening on port
app.listen(PORT, () => {
    console.log(`App Listening at http://localhost:${PORT}`)
});