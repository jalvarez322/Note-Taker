const note = require('express').Router();
const { json } = require('express');
const { readAndAppend, readFromFile, writeToFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');



note.get('/', (req, res) => {
    //Retrieve all db info
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

//Handle post requies
note.post('/', (req, res) => {
    //Extract title and text from the request's body
    const { title, text } = req.body;
    if (req.body) {
        //make new note with the request info and a unique id (uuid)
        const newNote = {
            id : uuid(),
            title,
            text
        };
        //Appened to json in db.json
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding Note');
    }
    
});

//Handle the delete request
note.delete('/:id', (req, res) => {
    const id = req.params.id;
    //Read data and then filter out the note with the id in the delete request 
    readFromFile('./db/db.json').then((data) => {
        const newData = JSON.parse(data);
        //If it doesn't match the id in body delete
        const results = newData.filter((note) => {
            return note.id !== id
        });
        //Overwrite the file with the new json object
        writeToFile('./db/db.json', results);
        res.json(`Successully deleted Note of ${id}`)
    })
});


module.exports = note;