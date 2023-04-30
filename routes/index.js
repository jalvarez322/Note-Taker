const express = require('express');
const noteshtmlRouter = require('./api');
const notesapiRouter = require('./html');

const app = express();

app.use('/notes', noteshtmlRouter);
app.use('/notes', notesapiRouter);
module.exports = app;