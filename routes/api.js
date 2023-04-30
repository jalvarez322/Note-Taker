const noteapi = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('/Users/user/Documents/UCF/UCF-VIRT-FSF-FT-03-2023-U-LOLC/11-Express/02-Challenge/helper/fsUtilis.js');
const uuid = require('/Users/user/Documents/UCF/UCF-VIRT-FSF-FT-03-2023-U-LOLC/11-Express/02-Challenge/helper/uuid.js');


noteapi.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

noteapi.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });
  
 
  noteapi.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Note ${noteId} has been deleted 🗑️`);
      });
  });
  


noteapi.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`New note added successfully 🚀`);
  } else {
    res.error('Error in posting note');
  }
});

module.exports = noteapi;