//Imports
const express = require('express');
const path = require('path');
const api = require('./routes/index');

const PORT = process.env.PORT || 3000;

//Create app and add middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//User api route to route to index.html 
app.use('/api', api);



//Route to got to the notes page
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Wildcard route to go to homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//Start listening on the port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);