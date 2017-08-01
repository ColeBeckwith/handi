const mongoose = require('mongoose');

let ScriptSchema = new mongoose.Schema({
    name: String,
    logline: String,
    genre: String,
    subgenre: String,
    storageUrl: String,
    userId: String
});

mongoose.model('Script', ScriptSchema);
